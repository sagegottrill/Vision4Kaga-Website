# Supabase Migration Guide

This guide will help you migrate your Vision4Kaga project to your new Supabase account.

## 1. Set Up Database Schema

1.  Log in to your **NEW** Supabase project: [https://supabase.com/dashboard](https://supabase.com/dashboard)
2.  Go to the **SQL Editor** (icon on the left sidebar).
3.  Click **"New query"**.
4.  Copy and paste the entire content of `complete_schema.sql` into the editor.
5.  Click **"Run"**.
    *   *Success Message:* You should see "Database migration schema setup complete successfully." in the results.

## 2. Migrate Data (Rows)

Since you are moving to a new project, you need to transfer the existing data.

1.  **Export from OLD Project:**
    *   Go to your **OLD** Supabase project dashboard.
    *   Go to **Table Editor**.
    *   For each table (`endorsements`, `volunteers`, `contacts`, `donations`):
        *   Click "Export" (usually a button near the top right or "CSV" download).
        *   Download as **CSV**.

2.  **Import to NEW Project:**
    *   Go to your **NEW** Supabase project dashboard.
    *   Go to **Table Editor**.
    *   Select the table (e.g., `endorsements`).
    *   Click **"Insert"** -> **"Import data from CSV"**.
    *   Upload the corresponding CSV file you downloaded.
    *   *Note:* Ensure the column mapping looks correct (it usually is automatic).

## 3. Storage (Photos/CVs)

*Note: I did not find explicit code for Storage buckets in the codebase, but if you have them manually created:*

1.  **Recreate Buckets:**
    *   In the **NEW** project, go to **Storage**.
    *   Create new buckets with the **exact same names** as your old project (e.g., `avatars`, `cvs`, `documents`).
    *   Make sure to set the "Public" status to match the old buckets.

2.  **Transfer Files:**
    *   You will need to manually download files from the old project and upload them to the new one, OR use a migration script if you have many files.

## 4. Update Application

Now point your local application to the new Supabase project.

1.  Open `.env` file in your project root.
2.  Update the following variables with your **NEW** credentials:

```env
VITE_SUPABASE_URL=https://tsegbvpuedpkkothnkas.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRzZWdidnB1ZWRwa2tvdGhua2FzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ2MTc1MjMsImV4cCI6MjA4MDE5MzUyM30.FdLYwonBfBW0lyjV0VSTjqpnUPfyL8HQZpIuIfrB14Y
```

3.  Restart your development server:
    *   `Ctrl + C` to stop.
    *   `npm run dev` to start.

## 5. Verify

1.  Go to your website.
2.  Try submitting a form (e.g., Volunteer or Contact).
3.  Check the **NEW** Supabase dashboard to see if the data appears.
