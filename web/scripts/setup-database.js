#!/usr/bin/env node

/**
 * Simple Database Setup Script for SymptomSync
 * 
 * This script reads the migration file and provides instructions for setting up
 * your Supabase database automatically.
 * 
 * Usage:
 *   node scripts/setup-database.js
 */

const fs = require('fs');
const path = require('path');

function setupDatabase() {
  console.log('🚀 SymptomSync Database Setup Helper\n');
  
  const migrationFile = path.join(__dirname, '../../database/migrations/20250506044951_remote_schema.sql');
  
  if (!fs.existsSync(migrationFile)) {
    console.error('❌ Migration file not found:', migrationFile);
    console.error('Make sure you\'re running this from the web/ directory');
    process.exit(1);
  }
  
  console.log('📋 Automated Database Setup Instructions:\n');
  
  console.log('🔧 Method 1: Copy & Paste (Recommended)');
  console.log('   1. Go to your Supabase Dashboard');
  console.log('   2. Navigate to SQL Editor');
  console.log('   3. Copy the content from:');
  console.log(`      ${migrationFile}`);
  console.log('   4. Paste and run the SQL');
  console.log('   5. Done! Your database is fully set up\n');
  
  console.log('🔧 Method 2: Manual File Upload');
  console.log('   1. Go to Supabase Dashboard > SQL Editor');
  console.log('   2. Click "New Query"');
  console.log('   3. Click the upload button and select:');
  console.log(`      ${migrationFile}`);
  console.log('   4. Run the uploaded SQL\n');
  
  console.log('📄 Migration file contains:');
  console.log('   ✅ All required tables');
  console.log('   ✅ Database functions and triggers');
  console.log('   ✅ Row Level Security policies');
  console.log('   ✅ Realtime subscriptions');
  console.log('   ✅ Required PostgreSQL extensions\n');
  
  console.log('🔧 Additional Setup (after running migration):');
  console.log('   1. Enable pg_cron extension (if not already enabled)');
  console.log('   2. Set up cron job: SELECT cron.schedule(\'reminder-check\', \'* * * * *\', \'CALL send_due_reminders();\');');
  console.log('   3. Create storage buckets: "avatars" and "documents"');
  console.log('   4. Configure authentication settings\n');
  
  console.log('🎯 Quick Copy Command:');
  console.log(`   cat "${migrationFile}" | pbcopy  # macOS`);
  console.log(`   cat "${migrationFile}" | xclip -selection clipboard  # Linux`);
  console.log(`   Get-Content "${migrationFile}" | Set-Clipboard  # Windows PowerShell\n`);
  
  // Show file size and first few lines
  try {
    const content = fs.readFileSync(migrationFile, 'utf8');
    const lines = content.split('\n');
    console.log(`📊 Migration file stats:`);
    console.log(`   - Size: ${(content.length / 1024).toFixed(1)} KB`);
    console.log(`   - Lines: ${lines.length}`);
    console.log(`   - Tables: ${(content.match(/CREATE TABLE/g) || []).length}`);
    console.log(`   - Functions: ${(content.match(/CREATE OR REPLACE FUNCTION/g) || []).length}`);
    console.log(`   - Triggers: ${(content.match(/CREATE.*TRIGGER/g) || []).length}\n`);
    
    console.log('📝 First few lines of migration:');
    console.log('   ' + lines.slice(0, 10).join('\n   '));
    console.log('   ...\n');
    
  } catch (err) {
    console.error('❌ Could not read migration file:', err.message);
  }
  
  console.log('🚀 After setup, your SymptomSync database will be ready!');
}

setupDatabase();

