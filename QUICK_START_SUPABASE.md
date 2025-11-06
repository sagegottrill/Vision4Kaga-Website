# Quick Start Guide - Supabase Backend Integration

## ✅ What's Been Done

All forms on your website are now connected to Supabase backend:
- ✅ Endorsement Form
- ✅ Volunteer Form  
- ✅ Contact Form
- ✅ Donation Form
- ✅ Admin Dashboard (reads/updates from Supabase)
- ✅ Testimonials Section (displays approved endorsements)

## 🚀 Setup Instructions

### Step 1: Create Supabase Account & Project

1. Go to https://supabase.com
2. Sign up for a free account
3. Click "New Project"
4. Fill in:
   - **Name**: Vision4Kaga
   - **Database Password**: Choose a strong password (save it!)
   - **Region**: Select closest to Nigeria (e.g., "West EU" or "Southeast Asia")
5. Click "Create new project" and wait ~2 minutes

### Step 2: Get Your Credentials

1. In your Supabase project, go to **Settings** > **API**
2. Copy these two values:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon/public key** (long string starting with `eyJhbGc...`)

### Step 3: Add Environment Variables

1. In your project root, create a file named `.env`
2. Add your credentials:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

⚠️ Replace with your actual values from Step 2!

### Step 4: Create Database Tables

1. In Supabase, go to **SQL Editor**
2. Copy and paste this SQL (creates all tables at once):

```sql
-- Create endorsements table
CREATE TABLE endorsements (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  location TEXT NOT NULL,
  content TEXT NOT NULL,
  email TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create volunteers table
CREATE TABLE volunteers (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  state TEXT NOT NULL,
  lga TEXT NOT NULL,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create contacts table
CREATE TABLE contacts (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create donations table
CREATE TABLE donations (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  ward_community TEXT NOT NULL,
  amount NUMERIC(10, 2) NOT NULL,
  is_recurring BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for better performance
CREATE INDEX idx_endorsements_status ON endorsements(status);
CREATE INDEX idx_endorsements_created_at ON endorsements(created_at DESC);
CREATE INDEX idx_volunteers_created_at ON volunteers(created_at DESC);
CREATE INDEX idx_contacts_created_at ON contacts(created_at DESC);
CREATE INDEX idx_donations_created_at ON donations(created_at DESC);

-- Enable Row Level Security
ALTER TABLE endorsements ENABLE ROW LEVEL SECURITY;
ALTER TABLE volunteers ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;

-- Public can submit data
CREATE POLICY "Anyone can submit endorsements" ON endorsements FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Anyone can volunteer" ON volunteers FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Anyone can send contact message" ON contacts FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Anyone can donate" ON donations FOR INSERT TO public WITH CHECK (true);

-- Public can view approved endorsements
CREATE POLICY "Anyone can view approved endorsements" ON endorsements FOR SELECT TO public USING (status = 'approved');

-- Authenticated users (admin) can view and update everything
CREATE POLICY "Authenticated users can view all endorsements" ON endorsements FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can update endorsements" ON endorsements FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated users can view volunteers" ON volunteers FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can view contacts" ON contacts FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can view donations" ON donations FOR SELECT TO authenticated USING (true);
```

3. Click **Run** to execute

### Step 5: Restart Development Server

```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
```

## 🧪 Testing

### Test Form Submissions

1. Go to your website homepage
2. Fill out each form:
   - Endorsement form
   - Volunteer form
   - Contact form
   - Donation form
3. Submit and check for success messages

### Verify in Supabase

1. Go to **Table Editor** in Supabase
2. Check each table for your submissions:
   - `endorsements` - should have status "pending"
   - `volunteers` - should have your name
   - `contacts` - should have your message
   - `donations` - should have your amount

### Test Admin Dashboard

1. Click admin icon in navbar (⚙️)
2. Login with: **admin** / **Vision4Kaga2025**
3. You should see your test endorsement in "Pending"
4. Click "Approve"
5. Go back to homepage
6. Scroll to Testimonials - your endorsement should appear in the carousel!

## 📊 View Your Data

### In Supabase Dashboard

- **Table Editor**: See all data in tables
- **SQL Editor**: Run custom queries
- **Database** > **Replication**: Set up backups
- **API Docs**: Auto-generated API documentation

### Common Queries

```sql
-- View all pending endorsements
SELECT * FROM endorsements WHERE status = 'pending' ORDER BY created_at DESC;

-- View all volunteers
SELECT * FROM volunteers ORDER BY created_at DESC;

-- Count donations by type
SELECT is_recurring, COUNT(*), SUM(amount) FROM donations GROUP BY is_recurring;

-- Recent contacts
SELECT * FROM contacts ORDER BY created_at DESC LIMIT 10;
```

## 🔒 Security Notes

✅ **Already Configured:**
- Row Level Security (RLS) enabled
- Public can only INSERT (submit forms)
- Public can only see APPROVED endorsements
- Admin must authenticate to view/update

⚠️ **For Production:**
- Change default admin password immediately
- Set up Supabase email auth for admin login
- Enable 2FA on your Supabase account
- Set up automated backups
- Add CAPTCHA to forms to prevent spam

## 🆘 Troubleshooting

### "Failed to fetch" errors
- ✅ Check `.env` file has correct VITE_SUPABASE_URL
- ✅ Verify Supabase project is running (not paused)
- ✅ Restart development server after adding `.env`

### Forms not submitting
- ✅ Check browser console for errors (F12)
- ✅ Verify tables were created (check Table Editor)
- ✅ Ensure RLS policies are set up

### Can't see data in admin dashboard
- ✅ Make sure you're logged in as admin
- ✅ Check tables have data in Supabase Table Editor
- ✅ Verify RLS policies allow authenticated access

### Data not showing on website
- ✅ Check endorsement status is "approved"
- ✅ Refresh the page
- ✅ Check browser console for errors

## 📈 Next Steps

1. **Email Notifications**
   - Set up Supabase Edge Functions
   - Send email when forms are submitted
   - Notify admin of new endorsements

2. **Admin Improvements**
   - Use Supabase Auth for login
   - Add role-based permissions
   - Create admin user management

3. **Analytics**
   - Track form submission rates
   - View volunteer statistics
   - Monitor donation totals

4. **Backups**
   - Set up automated daily backups
   - Export data regularly
   - Document restore procedures

## 📚 Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [Supabase Client Library](https://supabase.com/docs/reference/javascript/introduction)

## 🎉 You're All Set!

Your website now has a fully functional backend powered by Supabase. All form submissions are stored securely in the cloud, and you can manage everything through the admin dashboard.

For detailed SQL setup, see `SUPABASE_SETUP.md`
