# 🚀 Quick Start - Vercel Blob & Deployment

## 📋 Prerequisites
- ✅ Supabase database configured
- ✅ Next.js application ready
- ✅ Vercel account (free tier available)

## 🗂️ Step 1: Setup Vercel Blob

### Automated Setup
```bash
npm run setup:blob
```

### Manual Setup
1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Create Blob Store**:
   ```bash
   vercel blob create
   ```

4. **Get Blob Token**:
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Navigate to **Storage** → **Blob**
   - Select your blob store
   - Copy the **Read/Write Token**

5. **Update .env file**:
   ```bash
   BLOB_READ_WRITE_TOKEN="your_actual_token_here"
   ```

## 🌐 Step 2: Deploy to Vercel

### Automated Deployment
```bash
npm run deploy
```

### Manual Deployment
1. **Build the application**:
   ```bash
   npm run build
   ```

2. **Deploy to Vercel**:
   ```bash
   vercel --prod
   ```

3. **Configure environment variables** when prompted:
   - `DATABASE_URL`: Your Supabase connection string
   - `NEXTAUTH_URL`: Your production URL
   - `NEXTAUTH_SECRET`: Your secure secret
   - `BLOB_READ_WRITE_TOKEN`: Your Vercel Blob token

## 🔧 Environment Variables

Your `.env` file should look like this:
```bash
DATABASE_URL="postgresql://postgres.usbnhpjrtraocyasmbzq:ShaSco025!@aws-1-ap-south-1.pooler.supabase.co:5432/postgres"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="q/H5GIg1zC74ZaxnuEwh6JzVcHA81ErFlMvDBKLCSHs="
BLOB_READ_WRITE_TOKEN="vercel_blob_rw_your_actual_token"
```

## 📁 File Upload Features

Your application supports file uploads for:
- Vehicle documents
- Site images
- Material receipts
- Expense receipts

## 🚀 Quick Commands

```bash
# Setup Vercel Blob
npm run setup:blob

# Deploy to Vercel
npm run deploy

# View deployments
vercel ls

# View logs
vercel logs

# Open deployment
vercel open
```

## 🎯 Next Steps

After successful deployment:
1. Test file upload functionality
2. Verify database connectivity
3. Test authentication flow
4. Set up custom domain (optional)
5. Configure monitoring

## 📞 Support

If you encounter issues:
1. Check Vercel logs: `vercel logs`
2. Verify environment variables
3. Test file upload functionality
4. Check database connectivity

---

**Note**: Replace placeholder tokens with actual values from your Vercel dashboard.
