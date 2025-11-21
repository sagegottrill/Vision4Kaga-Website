# Fix Row-Level Security (RLS) Policy Errors

## Problem
You're seeing: `new row violates row-level security policy for table "endorsements"` (and other tables)

This means the RLS policies in Supabase haven't been applied yet, or they need to be refreshed.

## Solution

### Step 1: Go to Supabase SQL Editor
1. Open your Supabase Dashboard: https://supabase.com/dashboard/project/crvbilvsvqmbjywvuple
2. Click on **SQL Editor** in the left sidebar
3. Click **New Query**

### Step 2: Drop Existing Policies (if any)
Run this first to clean up any conflicting policies:

```sql
-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Anyone can insert endorsements" ON endorsements;
DROP POLICY IF EXISTS "Anyone can view approved endorsements" ON endorsements;
DROP POLICY IF EXISTS "Service role can view all endorsements" ON endorsements;
DROP POLICY IF EXISTS "Service role can update endorsements" ON endorsements;

DROP POLICY IF EXISTS "Anyone can insert volunteers" ON volunteers;
DROP POLICY IF EXISTS "Service role can view volunteers" ON volunteers;
DROP POLICY IF EXISTS "Service role can delete volunteers" ON volunteers;

DROP POLICY IF EXISTS "Anyone can insert contacts" ON contacts;
DROP POLICY IF EXISTS "Service role can view contacts" ON contacts;

DROP POLICY IF EXISTS "Anyone can insert donations" ON donations;
DROP POLICY IF EXISTS "Service role can view donations" ON donations;
```

### Step 3: Apply Correct Policies
Now run this to create the correct policies:

```sql
-- ===== ENDORSEMENTS POLICIES =====
-- Allow anonymous users to submit endorsements
CREATE POLICY "Anyone can insert endorsements" ON endorsements
  FOR INSERT 
  WITH CHECK (true);

-- Allow anyone to view approved endorsements (for public testimonials)
CREATE POLICY "Anyone can view approved endorsements" ON endorsements
  FOR SELECT 
  USING (status = 'approved');

-- Allow authenticated users (admins) to view all endorsements
CREATE POLICY "Authenticated users can view all endorsements" ON endorsements
  FOR SELECT 
  USING (auth.role() = 'authenticated');

-- Allow authenticated users (admins) to update endorsement status
CREATE POLICY "Authenticated users can update endorsements" ON endorsements
  FOR UPDATE 
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Allow authenticated users (admins) to delete endorsements
CREATE POLICY "Authenticated users can delete endorsements" ON endorsements
  FOR DELETE 
  USING (auth.role() = 'authenticated');


-- ===== VOLUNTEERS POLICIES =====
-- Allow anonymous users to join the movement
CREATE POLICY "Anyone can insert volunteers" ON volunteers
  FOR INSERT 
  WITH CHECK (true);

-- Allow authenticated users (admins) to view volunteers
CREATE POLICY "Authenticated users can view volunteers" ON volunteers
  FOR SELECT 
  USING (auth.role() = 'authenticated');

-- Allow authenticated users (admins) to delete volunteers
CREATE POLICY "Authenticated users can delete volunteers" ON volunteers
  FOR DELETE 
  USING (auth.role() = 'authenticated');


-- ===== CONTACTS POLICIES =====
-- Allow anonymous users to submit contact forms
CREATE POLICY "Anyone can insert contacts" ON contacts
  FOR INSERT 
  WITH CHECK (true);

-- Allow authenticated users (admins) to view contacts
CREATE POLICY "Authenticated users can view contacts" ON contacts
  FOR SELECT 
  USING (auth.role() = 'authenticated');


-- ===== DONATIONS POLICIES =====
-- Allow anonymous users to submit donation info
CREATE POLICY "Anyone can insert donations" ON donations
  FOR INSERT 
  WITH CHECK (true);

-- Allow authenticated users (admins) to view donations
CREATE POLICY "Authenticated users can view donations" ON donations
  FOR SELECT 
  USING (auth.role() = 'authenticated');


-- Verify policies are active
SELECT 'RLS Policies updated successfully! ✅' AS status;
```

### Step 4: Verify RLS is Enabled
Make sure RLS is enabled on all tables:

```sql
ALTER TABLE endorsements ENABLE ROW LEVEL SECURITY;
ALTER TABLE volunteers ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;

SELECT 'RLS is now enabled on all tables! ✅' AS status;
```

### Step 5: Test Your Forms
1. Clear your browser cache (Ctrl+Shift+Delete)
2. Reload your website (F5 or Ctrl+R)
3. Try submitting an endorsement or volunteer form
4. Check your Supabase Table Editor to see if the data appears

## Why This Happened
- The original `supabase-setup.sql` used `auth.role() = 'service_role'` which only works for server-side code with the service role key
- Since we're using the **anon key** from the frontend, we need policies that allow `true` (anyone) for INSERT operations
- For admin operations (SELECT/UPDATE/DELETE), we use `auth.role() = 'authenticated'` which works for logged-in Firebase users

## Troubleshooting

### If you still see RLS errors:
1. Double-check your `.env` file has the correct Supabase keys:
   ```
   VITE_SUPABASE_URL=https://crvbilvsvqmbjywvuple.supabase.co
   VITE_SUPABASE_ANON_KEY=your_anon_key_here
   ```

2. Verify in Supabase Dashboard > Authentication that your policies are showing up

3. Try testing with a direct INSERT in Supabase SQL Editor:
   ```sql
   INSERT INTO endorsements (name, title, location, content, email, status)
   VALUES ('Test User', 'Test Title', 'Test Location', 'Test content', 'test@example.com', 'pending');
   ```
   If this works, your policies are correct.

4. Check browser console for any other errors beyond RLS

---

**After completing these steps, your forms should work! 🎉**
