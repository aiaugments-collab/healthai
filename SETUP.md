# SymptomSync - Quick Setup Guide

This guide will help you set up SymptomSync with external Supabase and deploy to Vercel in minutes.

## 🚀 Quick Start (5 Minutes)

### 1. **Set Up Supabase Project**

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Wait for the project to be ready (2-3 minutes)
3. Note down your **Project URL** and **anon public key**

### 2. **Automated Database Setup**

**Option A: One-Click Setup (Recommended)**
```bash
cd web
npm run db:setup
```
This will show you exactly what to copy-paste into Supabase.

**Option B: Manual Copy-Paste**
1. Go to your Supabase Dashboard → SQL Editor
2. Copy the entire content from: `database/migrations/20250506044951_remote_schema.sql`
3. Paste and run in SQL Editor
4. Done! ✅

### 3. **Configure Environment**

Create `web/.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_GOOGLE_AI_API_KEY=your_google_ai_api_key
```

**Get Google AI API Key:**
- Go to [Google AI Studio](https://aistudio.google.com)
- Create API key for Gemini

### 4. **Final Supabase Configuration**

In your Supabase Dashboard:

**Authentication:**
- Go to Authentication → Settings
- Enable Email/Password authentication
- Disable email confirmation (for testing)

**Storage:**
- Go to Storage
- Create bucket: `avatars` (public)
- Create bucket: `documents` (public)

**Cron Jobs (for reminders):**
- Go to SQL Editor
- Run: `SELECT cron.schedule('reminder-check', '* * * * *', 'CALL send_due_reminders();');`

### 5. **Run Locally**

```bash
cd web
npm install --legacy-peer-deps
npm run dev
```

Visit: `http://localhost:3000`

### 6. **Deploy to Vercel**

**Via Vercel Dashboard (Recommended):**
1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Set **Root Directory** to: `web`
4. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_GOOGLE_AI_API_KEY`
5. Deploy!

**Via CLI:**
```bash
cd web
npx vercel --prod
```

### 7. **Update Supabase for Production**

In Supabase Dashboard → Authentication → Settings:
- Set **Site URL** to your Vercel domain
- Add Vercel domain to **Redirect URLs**

## 🎯 What You Get

After setup, you'll have:
- ✅ Full health management dashboard
- ✅ Medication reminders with QR scanning
- ✅ Appointment tracking with calendar
- ✅ Health logs with data visualization
- ✅ AI-powered chatbot
- ✅ Real-time notifications
- ✅ Document management
- ✅ Dark/Light mode
- ✅ Mobile-responsive design

## 🔧 Database Schema Overview

The automated setup creates:
- **6 main tables**: user_profiles, medication_reminders, appointment_reminders, health_logs, files, user_notifications
- **4 functions**: handle_new_user(), notify_due_reminders(), send_due_reminders(), etc.
- **3 triggers**: Auto user profile creation, reminder scheduling, notifications
- **RLS policies**: Secure user data isolation
- **Realtime subscriptions**: Live updates across devices

## 🆘 Troubleshooting

**Database setup fails?**
- Make sure you're using the service role key (not anon key)
- Check Supabase project is fully initialized
- Try running SQL manually in Supabase SQL Editor

**App won't start?**
- Check all environment variables are set
- Run `npm install --legacy-peer-deps`
- Make sure you're in the `web/` directory

**Reminders not working?**
- Enable pg_cron extension in Supabase
- Set up the cron job as shown above
- Check user_notifications table for entries

**Vercel deployment fails?**
- Set root directory to `web`
- Add all environment variables
- Check build logs for specific errors

## 📚 Additional Resources

- **Live Demo**: [symptomsync.vercel.app](https://symptomsync.vercel.app)
- **GitHub Repo**: [SymptomSync-Health-App](https://github.com/hoangsonww/SymptomSync-Health-App)
- **Figma Design**: [Prototype](https://www.figma.com/design/YwoQ1OgAPYOfFOwlbf3aP0/COMP-426-Final-Project-Prototype)

## 🎉 You're Done!

Your SymptomSync health management app is now ready. Start by creating an account and exploring all the features!

---

**Need help?** Open an issue on [GitHub](https://github.com/hoangsonww/SymptomSync-Health-App/issues) or check the [documentation](https://github.com/hoangsonww/SymptomSync-Health-App#readme).

