# 🚀 Vercel Setup Guide - Gavith Build

This guide will help you set up Vercel Blob for file storage and deploy your application to Vercel.

## 📋 Prerequisites

- ✅ Supabase database configured and working
- ✅ Next.js application ready
- ✅ Vercel account (free tier available)

## 🗂️ Step 1: Vercel Blob Setup

### 1.1 Install Vercel CLI
```bash
npm install -g vercel
```

### 1.2 Login to Vercel
```bash
vercel login
```

### 1.3 Create Vercel Blob Store
```bash
vercel blob create
```

### 1.4 Get Blob Token
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Navigate to **Storage** → **Blob**
3. Select your blob store
4. Copy the **Read/Write Token**
5. Update your `.env` file:
   ```bash
   BLOB_READ_WRITE_TOKEN="your_actual_token_here"
   ```

## 🌐 Step 2: Deploy to Vercel

### 2.1 Initialize Vercel Project
```bash
vercel
```

### 2.2 Configure Environment Variables
During deployment, Vercel will ask for environment variables. Set these:

- `DATABASE_URL`: Your Supabase connection string
- `NEXTAUTH_URL`: Your production URL (e.g., `https://your-app.vercel.app`)
- `NEXTAUTH_SECRET`: Your secure secret
- `BLOB_READ_WRITE_TOKEN`: Your Vercel Blob token

### 2.3 Deploy
```bash
vercel --prod
```

## 🔧 Step 3: Post-Deployment Configuration

### 3.1 Update NEXTAUTH_URL
After deployment, update your `.env` file with the production URL:
```bash
NEXTAUTH_URL="https://your-app.vercel.app"
```

### 3.2 Configure Custom Domain (Optional)
1. Go to Vercel Dashboard
2. Select your project
3. Go to **Settings** → **Domains**
4. Add your custom domain

## 📁 File Upload Features

Your application includes file upload functionality for:
- Vehicle documents
- Site images
- Material receipts
- Expense receipts

### API Endpoints Available:
- `POST /api/upload` - Upload files
- `GET /api/files/[id]` - Get file info
- `DELETE /api/files/[id]` - Delete files

## 🔒 Security Features

- File type validation
- File size limits
- Secure token-based access
- Automatic cleanup of unused files

## 🚀 Quick Commands

```bash
# Setup Vercel Blob
npm run setup:blob

# Deploy to Vercel
npm run deploy

# View deployment status
vercel ls

# Open deployment
vercel open
```

## 📞 Support

If you encounter issues:
1. Check Vercel logs: `vercel logs`
2. Verify environment variables
3. Test file upload functionality
4. Check database connectivity

## 🎯 Next Steps

After successful deployment:
1. Test all file upload features
2. Verify database connectivity
3. Test authentication flow
4. Set up monitoring and analytics
5. Configure backup strategies

---

**Note**: Remember to replace placeholder tokens with actual values from your Vercel dashboard.
