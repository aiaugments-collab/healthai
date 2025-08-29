#!/usr/bin/env node

/**
 * Database Seeding Script for SymptomSync
 * 
 * This script automatically sets up your Supabase database with all required
 * tables, functions, triggers, and policies.
 * 
 * Usage:
 *   node scripts/seed-database.js
 * 
 * Requirements:
 *   - NEXT_PUBLIC_SUPABASE_URL in .env.local
 *   - SUPABASE_SERVICE_ROLE_KEY in .env.local (get from Supabase Dashboard > Settings > API)
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

// Supabase client with service role key (needed for admin operations)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error('❌ Missing required environment variables:');
  console.error('   - NEXT_PUBLIC_SUPABASE_URL');
  console.error('   - SUPABASE_SERVICE_ROLE_KEY');
  console.error('\nGet the service role key from: Supabase Dashboard > Settings > API');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function runSQLFile(filePath) {
  try {
    console.log(`📄 Running ${path.basename(filePath)}...`);
    const sql = fs.readFileSync(filePath, 'utf8');
    
    const { error } = await supabase.rpc('exec_sql', { sql_query: sql });
    
    if (error) {
      console.error(`❌ Error in ${path.basename(filePath)}:`, error.message);
      return false;
    }
    
    console.log(`✅ ${path.basename(filePath)} completed successfully`);
    return true;
  } catch (err) {
    console.error(`❌ Failed to read ${filePath}:`, err.message);
    return false;
  }
}

async function seedDatabase() {
  console.log('🚀 Starting SymptomSync database seeding...\n');
  
  // Path to the complete migration file
  const migrationFile = path.join(__dirname, '../../database/migrations/20250506044951_remote_schema.sql');
  
  if (!fs.existsSync(migrationFile)) {
    console.error('❌ Migration file not found:', migrationFile);
    console.error('Make sure you\'re running this from the web/ directory');
    process.exit(1);
  }
  
  // Run the complete migration
  const success = await runSQLFile(migrationFile);
  
  if (success) {
    console.log('\n🎉 Database seeding completed successfully!');
    console.log('\n📋 What was created:');
    console.log('   ✅ All tables (user_profiles, medication_reminders, etc.)');
    console.log('   ✅ Database functions and triggers');
    console.log('   ✅ Row Level Security policies');
    console.log('   ✅ Realtime subscriptions');
    console.log('   ✅ Required extensions (pg_cron, uuid-ossp, etc.)');
    console.log('\n🔧 Next steps:');
    console.log('   1. Set up cron jobs in Supabase Dashboard');
    console.log('   2. Create storage buckets: "avatars" and "documents"');
    console.log('   3. Configure authentication settings');
    console.log('\n🚀 Your SymptomSync database is ready!');
  } else {
    console.log('\n❌ Database seeding failed. Check the errors above.');
    process.exit(1);
  }
}

// Alternative function to create exec_sql function if it doesn't exist
async function createExecSqlFunction() {
  const createFunctionSQL = `
    CREATE OR REPLACE FUNCTION exec_sql(sql_query text)
    RETURNS void
    LANGUAGE plpgsql
    SECURITY DEFINER
    AS $$
    BEGIN
      EXECUTE sql_query;
    END;
    $$;
  `;
  
  const { error } = await supabase.rpc('exec', { sql: createFunctionSQL });
  if (error) {
    console.log('Note: Could not create exec_sql function. Using direct SQL execution.');
  }
}

// Run the seeding
seedDatabase().catch(console.error);

