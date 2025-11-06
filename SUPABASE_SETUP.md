# Supabase Database Setup Guide

## Step 1: Create a Supabase Project

1. Go to https://supabase.com
2. Sign up or log in
3. Click "New Project"
4. Fill in project details:
   - Name: Vision4Kaga
   - Database Password: (create a strong password)
   - Region: Choose closest to Nigeria
5. Wait for project to be created

## Step 2: Get Your Credentials

1. Go to Project Settings > API
2. Copy the following:
   - Project URL (looks like: https://xxxxx.supabase.co)
   - anon/public key (starts with: eyJhbGc...)

## Step 3: Set Up Environment Variables

1. Create a `.env` file in the project root
2. Add your credentials:
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

## Step 4: Create Database Tables

Go to SQL Editor in Supabase and run these commands:

### 1. Endorsements Table
```sql
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

-- Add index for faster queries
CREATE INDEX idx_endorsements_status ON endorsements(status);
CREATE INDEX idx_endorsements_created_at ON endorsements(created_at DESC);

-- Enable Row Level Security
ALTER TABLE endorsements ENABLE ROW LEVEL SECURITY;

-- Allow public to insert endorsements
CREATE POLICY "Anyone can submit endorsements"
  ON endorsements FOR INSERT
  TO public
  WITH CHECK (true);

-- Allow public to read approved endorsements
CREATE POLICY "Anyone can view approved endorsements"
  ON endorsements FOR SELECT
  TO public
  USING (status = 'approved');
```

### 2. Volunteers Table
```sql
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

-- Add index
CREATE INDEX idx_volunteers_created_at ON volunteers(created_at DESC);

-- Enable Row Level Security
ALTER TABLE volunteers ENABLE ROW LEVEL SECURITY;

-- Allow public to insert
CREATE POLICY "Anyone can volunteer"
  ON volunteers FOR INSERT
  TO public
  WITH CHECK (true);
```

### 3. Contacts Table
```sql
CREATE TABLE contacts (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add index
CREATE INDEX idx_contacts_created_at ON contacts(created_at DESC);

-- Enable Row Level Security
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Allow public to insert
CREATE POLICY "Anyone can send contact message"
  ON contacts FOR INSERT
  TO public
  WITH CHECK (true);
```

### 4. Donations Table
```sql
CREATE TABLE donations (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  ward_community TEXT NOT NULL,
  amount NUMERIC(10, 2) NOT NULL,
  is_recurring BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add index
CREATE INDEX idx_donations_created_at ON donations(created_at DESC);

-- Enable Row Level Security
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;

-- Allow public to insert
CREATE POLICY "Anyone can donate"
  ON donations FOR INSERT
  TO public
  WITH CHECK (true);
```

### 5. Admin Users Table (for authentication)
```sql
CREATE TABLE admin_users (
  id BIGSERIAL PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add index
CREATE INDEX idx_admin_users_username ON admin_users(username);

-- Enable Row Level Security
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Only allow service role to access admin users
CREATE POLICY "Service role only"
  ON admin_users FOR ALL
  TO service_role
  USING (true);
```

## Step 5: Create Admin User

Run this to create your first admin user (change the password):

```sql
-- Install pgcrypto extension if not already enabled
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Insert admin user (password: Vision4Kaga2025)
INSERT INTO admin_users (username, email, password_hash)
VALUES (
  'admin',
  'admin@vision4kaga.com',
  crypt('Vision4Kaga2025', gen_salt('bf'))
);
```

## Step 6: Create Admin RLS Policies for Dashboard

```sql
-- Allow authenticated users to read all endorsements
CREATE POLICY "Authenticated users can view all endorsements"
  ON endorsements FOR SELECT
  TO authenticated
  USING (true);

-- Allow authenticated users to update endorsement status
CREATE POLICY "Authenticated users can update endorsement status"
  ON endorsements FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Similar policies for other tables
CREATE POLICY "Authenticated users can view all volunteers"
  ON volunteers FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can view all contacts"
  ON contacts FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can view all donations"
  ON donations FOR SELECT
  TO authenticated
  USING (true);
```

## Step 7: Test Your Setup

1. Restart your development server
2. Try submitting a form
3. Check the Supabase Dashboard > Table Editor to see the data

## Security Notes

- The anon key is safe to use in client-side code
- Row Level Security (RLS) protects your data
- Admin operations require authentication
- Never commit your `.env` file to Git (it's in .gitignore)

## Troubleshooting

### "Failed to fetch" errors
- Check your VITE_SUPABASE_URL is correct
- Ensure your Supabase project is running

### "Row level security" errors
- Make sure RLS policies are set up correctly
- Check the SQL commands ran without errors

### Authentication issues
- Verify admin user was created
- Check username and password are correct

## Next Steps

After setting up Supabase:
1. Test all forms on the website
2. Check data appears in Supabase dashboard
3. Test admin login and approval workflow
4. Set up email notifications (optional)
5. Configure backup schedule in Supabase
