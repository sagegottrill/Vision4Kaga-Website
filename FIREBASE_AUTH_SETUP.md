# Firebase Authentication Setup Guide

## Overview

Your admin authentication is now powered by Firebase Authentication. This provides secure, production-ready authentication with features like password recovery, email verification, and more.

## 🚀 Quick Setup (10 minutes)

### Step 1: Create Firebase Project

1. Go to https://console.firebase.google.com
2. Click **"Add project"** or **"Create a project"**
3. Enter project name: **Vision4Kaga**
4. Disable Google Analytics (optional for now)
5. Click **"Create project"** and wait for it to finish

### Step 2: Enable Email/Password Authentication

1. In your Firebase project, click **"Authentication"** in the left sidebar
2. Click **"Get started"**
3. Click the **"Sign-in method"** tab
4. Click on **"Email/Password"**
5. Toggle **"Enable"** to ON
6. Click **"Save"**

### Step 3: Register Your Web App

1. In Firebase Console, click the **gear icon** ⚙️ next to "Project Overview"
2. Click **"Project settings"**
3. Scroll down to **"Your apps"** section
4. Click the **Web icon** (</>)
5. Register app:
   - App nickname: **Vision4Kaga Web**
   - ✅ Check "Also set up Firebase Hosting" (optional)
   - Click **"Register app"**

### Step 4: Get Firebase Configuration

You'll see a configuration object like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXxxx...",
  authDomain: "vision4kaga.firebaseapp.com",
  projectId: "vision4kaga",
  storageBucket: "vision4kaga.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:xxxxx"
};
```

### Step 5: Add to Environment Variables

1. In your project root, open or create `.env` file
2. Add your Firebase credentials:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=AIzaSyXxxx...
VITE_FIREBASE_AUTH_DOMAIN=vision4kaga.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=vision4kaga
VITE_FIREBASE_STORAGE_BUCKET=vision4kaga.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:xxxxx
```

⚠️ **Important**: Replace with YOUR actual values from Step 4!

### Step 6: Create Admin User

1. In Firebase Console, go to **Authentication** > **Users** tab
2. Click **"Add user"**
3. Enter:
   - **Email**: admin@vision4kaga.com (or your email)
   - **Password**: Create a strong password (minimum 6 characters)
4. Click **"Add user"**

✅ This is your admin account!

### Step 7: Restart Development Server

```bash
# Stop the server (Ctrl+C if running)
npm run dev
```

### Step 8: Test Login

1. Go to your website
2. Click the admin icon (⚙️) in the navbar
3. Enter your admin email and password
4. Click **"Sign In"**
5. You should be redirected to the admin dashboard!

## 🔐 Security Features

### Already Configured:
- ✅ Secure password authentication
- ✅ Automatic session management
- ✅ Protected admin routes
- ✅ Sign out functionality
- ✅ Authentication state persistence

### Firebase Handles:
- 🔒 Password hashing
- 🔒 Secure token generation
- 🔒 Rate limiting
- 🔒 Brute force protection
- 🔒 Session expiry

## 🎯 Features You Can Add

### 1. Password Reset (Recommended)

Update your AdminLogin.tsx to add a "Forgot Password" link:

```typescript
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/lib/firebase';

const handlePasswordReset = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert('Password reset email sent!');
  } catch (error) {
    alert('Error sending reset email');
  }
};
```

### 2. Email Verification

```typescript
import { sendEmailVerification } from 'firebase/auth';

// After user signs up
await sendEmailVerification(user);
```

### 3. Multi-Factor Authentication (2FA)

```typescript
// Enable in Firebase Console > Authentication > Settings > Multi-factor authentication
```

### 4. Multiple Admin Users

Just add more users in Firebase Console > Authentication > Users

### 5. Custom Claims (Role-Based Access)

```typescript
// Set admin custom claim (requires Firebase Admin SDK on backend)
await admin.auth().setCustomUserClaims(uid, { admin: true });
```

## 📱 Testing Different Scenarios

### Test Successful Login
1. Use correct email/password
2. Should redirect to dashboard
3. Should show your email in header

### Test Failed Login
1. Use wrong password
2. Should show error message
3. Should not redirect

### Test Auto-Login
1. Login successfully
2. Close the tab
3. Open website again and navigate to admin
4. Should automatically go to dashboard (session persists!)

### Test Logout
1. Login to dashboard
2. Click "Logout"
3. Should redirect to login page
4. Try accessing /admin/dashboard directly
5. Should redirect back to login

## 🔧 Firebase Console Features

### Monitor Authentication
- **Authentication > Users**: See all registered users
- **Authentication > Sign-in providers**: Manage sign-in methods
- **Authentication > Settings**: Configure email templates, authorized domains

### Usage Statistics
- **Authentication > Usage**: See sign-in attempts, active users

### Email Templates
- **Authentication > Templates**: Customize password reset, email verification emails

## 🚨 Troubleshooting

### "Firebase config not found" error
- ✅ Check `.env` file exists in project root
- ✅ Verify all VITE_FIREBASE_* variables are set
- ✅ Restart development server

### "Invalid email or password" error
- ✅ Verify user exists in Firebase Console
- ✅ Check email spelling
- ✅ Password must be at least 6 characters
- ✅ Try creating a new admin user

### "Too many requests" error
- ✅ Firebase rate limiting kicked in
- ✅ Wait a few minutes
- ✅ Try from a different network/browser

### Can't access dashboard after login
- ✅ Check browser console for errors (F12)
- ✅ Clear browser cache and cookies
- ✅ Verify Supabase connection is working

### Authentication state not persisting
- ✅ Check browser allows cookies
- ✅ Check localStorage is enabled
- ✅ Try incognito mode to rule out extensions

## 🌐 Production Deployment

### Before Going Live:

1. **Add Authorized Domains**
   - Firebase Console > Authentication > Settings
   - Add your production domain
   - Add your staging domain (if any)

2. **Set Up Custom Email Templates**
   - Customize password reset emails
   - Add your branding
   - Update sender name

3. **Enable Email Verification**
   - Require email verification for new admins
   - Add verification check in admin routes

4. **Set Up Monitoring**
   - Enable Firebase Analytics
   - Set up alerts for authentication failures
   - Monitor unusual activity

5. **Backup Plan**
   - Export admin user list
   - Document recovery procedures
   - Test password reset flow

## 📊 Admin User Management

### Adding New Admin Users

**Option 1: Firebase Console (Recommended)**
1. Authentication > Users
2. Click "Add user"
3. Enter email and password
4. Share credentials securely

**Option 2: Invite System (Future Enhancement)**
- Send email invitation
- User creates their own password
- Email verification required

### Removing Admin Access
1. Firebase Console > Authentication > Users
2. Find user
3. Click menu (⋮) > Delete user

### Changing Admin Password
1. User clicks "Forgot Password" on login page
2. Receives password reset email
3. Creates new password

## 🔗 Integration with Existing System

Your Firebase authentication now works seamlessly with:
- ✅ Supabase database (for endorsements, volunteers, etc.)
- ✅ Admin dashboard (protected routes)
- ✅ Form submissions (still work for public)

## 📚 Additional Resources

- [Firebase Authentication Docs](https://firebase.google.com/docs/auth)
- [Firebase Security Rules](https://firebase.google.com/docs/rules)
- [Best Practices](https://firebase.google.com/docs/auth/admin/best-practices)

## 💡 Next Steps

1. ✅ Complete Firebase setup (follow steps above)
2. ✅ Test admin login
3. ⚠️ Add password reset functionality
4. ⚠️ Set up email verification
5. ⚠️ Configure production domains
6. ⚠️ Customize email templates
7. ⚠️ Add additional admin users

## ⚡ Quick Commands

```bash
# Install Firebase (already done)
npm install firebase

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎉 You're All Set!

Your admin authentication is now powered by Firebase - one of the most secure and scalable authentication systems available. Your admin page is protected, sessions are managed automatically, and you have access to powerful features like password recovery and email verification.

Happy campaigning! 🚀
