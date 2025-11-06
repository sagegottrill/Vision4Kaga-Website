-- Vision4Kaga Database Setup
-- Run this in your Supabase SQL Editor: https://crvbilvsvqmbjywvuple.supabase.co

-- 1. Endorsements Table
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

-- 2. Volunteers Table
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

-- 3. Contacts Table
CREATE TABLE IF NOT EXISTS contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Donations Table
CREATE TABLE IF NOT EXISTS donations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  ward_community TEXT NOT NULL,
  amount NUMERIC NOT NULL,
  is_recurring BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE endorsements ENABLE ROW LEVEL SECURITY;
ALTER TABLE volunteers ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;

-- RLS Policies for Endorsements
CREATE POLICY "Anyone can insert endorsements" ON endorsements
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can view approved endorsements" ON endorsements
  FOR SELECT USING (status = 'approved');

CREATE POLICY "Service role can view all endorsements" ON endorsements
  FOR SELECT USING (auth.role() = 'service_role');

CREATE POLICY "Service role can update endorsements" ON endorsements
  FOR UPDATE USING (auth.role() = 'service_role');

-- RLS Policies for Volunteers
CREATE POLICY "Anyone can insert volunteers" ON volunteers
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Service role can view volunteers" ON volunteers
  FOR SELECT USING (auth.role() = 'service_role');

-- RLS Policies for Contacts
CREATE POLICY "Anyone can insert contacts" ON contacts
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Service role can view contacts" ON contacts
  FOR SELECT USING (auth.role() = 'service_role');

-- RLS Policies for Donations
CREATE POLICY "Anyone can insert donations" ON donations
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Service role can view donations" ON donations
  FOR SELECT USING (auth.role() = 'service_role');

-- Create indexes for better performance
CREATE INDEX idx_endorsements_status ON endorsements(status);
CREATE INDEX idx_endorsements_created_at ON endorsements(created_at DESC);
CREATE INDEX idx_volunteers_created_at ON volunteers(created_at DESC);
CREATE INDEX idx_contacts_created_at ON contacts(created_at DESC);
CREATE INDEX idx_donations_created_at ON donations(created_at DESC);

-- Success message
SELECT 'Database setup complete! All tables and policies created successfully.' AS message;
