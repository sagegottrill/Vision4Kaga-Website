-- Fix RLS policies for all tables
-- Run this in your Supabase SQL Editor

-- Enable RLS on all tables (if not already enabled)
ALTER TABLE endorsements ENABLE ROW LEVEL SECURITY;
ALTER TABLE volunteers ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any (to avoid conflicts)
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

-- ENDORSEMENTS TABLE POLICIES
-- Allow anyone to read endorsements
CREATE POLICY "Enable read access for all users" ON endorsements
    FOR SELECT
    USING (true);

-- Allow anyone to insert endorsements (for public form submissions)
CREATE POLICY "Enable insert for all users" ON endorsements
    FOR INSERT
    WITH CHECK (true);

-- Allow authenticated users to update endorsements (for admin approval/rejection)
CREATE POLICY "Enable update for authenticated users" ON endorsements
    FOR UPDATE
    USING (auth.role() = 'authenticated')
    WITH CHECK (auth.role() = 'authenticated');

-- VOLUNTEERS TABLE POLICIES
-- Allow anyone to read volunteers
CREATE POLICY "Enable read access for all users" ON volunteers
    FOR SELECT
    USING (true);

-- Allow anyone to insert volunteers (for public form submissions)
CREATE POLICY "Enable insert for all users" ON volunteers
    FOR INSERT
    WITH CHECK (true);

-- Allow authenticated users to delete volunteers
CREATE POLICY "Enable delete for authenticated users" ON volunteers
    FOR DELETE
    USING (auth.role() = 'authenticated');

-- CONTACTS TABLE POLICIES
-- Allow anyone to read contacts
CREATE POLICY "Enable read access for all users" ON contacts
    FOR SELECT
    USING (true);

-- Allow anyone to insert contacts (for public form submissions)
CREATE POLICY "Enable insert for all users" ON contacts
    FOR INSERT
    WITH CHECK (true);

-- DONATIONS TABLE POLICIES
-- Allow anyone to read donations
CREATE POLICY "Enable read access for all users" ON donations
    FOR SELECT
    USING (true);

-- Allow anyone to insert donations (for public form submissions)
CREATE POLICY "Enable insert for all users" ON donations
    FOR INSERT
    WITH CHECK (true);

-- Verify policies were created
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies
WHERE tablename IN ('endorsements', 'volunteers', 'contacts', 'donations')
ORDER BY tablename, policyname;
