# Vercel Environment Variables Setup

## Add these environment variables to your Vercel project settings

Go to: **Vercel Dashboard → Your Project → Settings → Environment Variables**

Add these variables exactly as shown:

---

## Firebase Variables

```
VITE_FIREBASE_API_KEY=AIzaSyDxUyJFsODLeIi_vCb4lgzicFZEaO8L3mc
```

```
VITE_FIREBASE_AUTH_DOMAIN=vision4kaga.firebaseapp.com
```

```
VITE_FIREBASE_PROJECT_ID=vision4kaga
```

```
VITE_FIREBASE_STORAGE_BUCKET=vision4kaga.firebasestorage.app
```

```
VITE_FIREBASE_MESSAGING_SENDER_ID=211730189611
```

```
VITE_FIREBASE_APP_ID=1:211730189611:web:d0b823a763fb2f4934896e
```

---

## Supabase Variables

```
VITE_SUPABASE_URL=https://crvbilvsvqmbjywvuple.supabase.co
```

```
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNydmJpbHZzdnFtYmp5d3Z1cGxlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI0MzA5MzgsImV4cCI6MjA3ODAwNjkzOH0.tRuHl5ZY8SDeyVVEk1mlsNvc_qF0-zlqWs2eVT6dZcg
```

---

## After Adding Variables

1. Click **Save** for each variable
2. Go to **Deployments** tab
3. Click the **•••** menu on the latest deployment
4. Click **Redeploy**
5. Your site will rebuild with the environment variables

---

## Quick Copy-Paste Format

If Vercel supports bulk import, use this format:

```
VITE_FIREBASE_API_KEY=AIzaSyDxUyJFsODLeIi_vCb4lgzicFZEaO8L3mc
VITE_FIREBASE_AUTH_DOMAIN=vision4kaga.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=vision4kaga
VITE_FIREBASE_STORAGE_BUCKET=vision4kaga.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=211730189611
VITE_FIREBASE_APP_ID=1:211730189611:web:d0b823a763fb2f4934896e
VITE_SUPABASE_URL=https://crvbilvsvqmbjywvuple.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNydmJpbHZzdnFtYmp5d3Z1cGxlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI0MzA5MzgsImV4cCI6MjA3ODAwNjkzOH0.tRuHl5ZY8SDeyVVEk1mlsNvc_qF0-zlqWs2eVT6dZcg
```

That's it! Your live site will now work with Firebase authentication and Supabase database. 🚀
