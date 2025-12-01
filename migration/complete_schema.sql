-- Vision4Kaga Complete Database Schema
-- Run this in your NEW Supabase SQL Editor to set up the database structure.

-- ==========================================
-- 1. TABLE DEFINITIONS
-- ==========================================

-- 1.1 Endorsements Table
CREATE TABLE IF NOT EXISTS endorsements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  location TEXT NOT NULL,
  content TEXT NOT NULL,
  email TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 1.2 Volunteers Table
CREATE TABLE IF NOT EXISTS volunteers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  state TEXT NOT NULL,
  lga TEXT NOT NULL,
  message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 1.3 Contacts Table
CREATE TABLE IF NOT EXISTS contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 1.4 Donations Table
CREATE TABLE IF NOT EXISTS donations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  ward_community TEXT NOT NULL,
  amount NUMERIC NOT NULL,
  is_recurring BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- 2. SECURITY (Row Level Security)
-- ==========================================

-- Enable RLS on all tables
ALTER TABLE endorsements ENABLE ROW LEVEL SECURITY;
ALTER TABLE volunteers ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;

-- ==========================================
-- 3. POLICIES
-- ==========================================

-- Drop existing policies to ensure clean slate
DROP POLICY IF EXISTS "Enable read access for all users" ON endorsements;
DROP POLICY IF EXISTS "Enable insert for all users" ON endorsements;
DROP POLICY IF EXISTS "Enable update for authenticated users" ON endorsements;

DROP POLICY IF EXISTS "Enable read access for all users" ON volunteers;
DROP POLICY IF EXISTS "Enable insert for all users" ON volunteers;
DROP POLICY IF EXISTS "Enable delete for authenticated users" ON volunteers;

DROP POLICY IF EXISTS "Enable read access for all users" ON contacts;
DROP POLICY IF EXISTS "Enable insert for all users" ON contacts;

DROP POLICY IF EXISTS "Enable read access for all users" ON donations;
DROP POLICY IF EXISTS "Enable insert for all users" ON donations;

-- 3.1 Endorsements Policies
-- Allow anyone to read endorsements
CREATE POLICY "Enable read access for all users" ON endorsements
    FOR SELECT
    USING (true);

-- Allow anyone to insert endorsements (public form)
CREATE POLICY "Enable insert for all users" ON endorsements
    FOR INSERT
    WITH CHECK (true);

-- Allow authenticated users (admins) to update endorsements
CREATE POLICY "Enable update for authenticated users" ON endorsements
    FOR UPDATE
    USING (auth.role() = 'authenticated')
    WITH CHECK (auth.role() = 'authenticated');

-- 3.2 Volunteers Policies
-- Allow anyone to read volunteers
CREATE POLICY "Enable read access for all users" ON volunteers
    FOR SELECT
    USING (true);

-- Allow anyone to insert volunteers (public form)
CREATE POLICY "Enable insert for all users" ON volunteers
    FOR INSERT
    WITH CHECK (true);

-- Allow authenticated users (admins) to delete volunteers
CREATE POLICY "Enable delete for authenticated users" ON volunteers
    FOR DELETE
    USING (auth.role() = 'authenticated');

-- 3.3 Contacts Policies
-- Allow anyone to read contacts
CREATE POLICY "Enable read access for all users" ON contacts
    FOR SELECT
    USING (true);

-- Allow anyone to insert contacts (public form)
CREATE POLICY "Enable insert for all users" ON contacts
    FOR INSERT
    WITH CHECK (true);

-- 3.4 Donations Policies
-- Allow anyone to read donations
CREATE POLICY "Enable read access for all users" ON donations
    FOR SELECT
    USING (true);

-- Allow anyone to insert donations (public form)
CREATE POLICY "Enable insert for all users" ON donations
    FOR INSERT
    WITH CHECK (true);

-- ==========================================
-- 4. INDEXES
-- ==========================================

CREATE INDEX IF NOT EXISTS idx_endorsements_status ON endorsements(status);
CREATE INDEX IF NOT EXISTS idx_endorsements_created_at ON endorsements(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_volunteers_created_at ON volunteers(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_donations_created_at ON donations(created_at DESC);

-- Success Confirmation
SELECT 'Database migration schema setup complete successfully.' AS message;
