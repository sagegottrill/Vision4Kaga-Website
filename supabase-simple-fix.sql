-- SIMPLE FIX: Temporarily disable RLS to test if that's the issue
-- Run this in your Supabase SQL Editor

-- Disable RLS on all tables
ALTER TABLE endorsements DISABLE ROW LEVEL SECURITY;
ALTER TABLE volunteers DISABLE ROW LEVEL SECURITY;
ALTER TABLE contacts DISABLE ROW LEVEL SECURITY;
ALTER TABLE donations DISABLE ROW LEVEL SECURITY;

-- This will allow all operations (read, insert, update, delete) without restrictions
-- Use this for testing, then run the full policy script for production
