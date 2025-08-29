#!/bin/bash

# Gavith Build - Vercel Deployment Script
# This script helps you deploy your application to Vercel

set -e

echo "🚀 Gavith Build - Vercel Deployment"
echo "==================================="

# Check if .env file exists
if [ ! -f .env ]; then
    echo "❌ .env file not found. Please run 'npm run setup' first."
    exit 1
fi

echo "📋 Pre-Deployment Checklist:"
echo "============================"
echo ""

# Check if all required services are configured
echo "🔍 Checking service configurations..."

# Check Supabase
if grep -q "DATABASE_URL.*supabase" .env; then
    echo "✅ Supabase database configured"
else
    echo "⚠️  Supabase database not configured"
fi

# Check NextAuth
if grep -q "NEXTAUTH_SECRET.*replace-me" .env; then
    echo "⚠️  NEXTAUTH_SECRET needs to be generated"
else
    echo "✅ NextAuth configured"
fi

# Check Stripe
if grep -q "STRIPE_SECRET_KEY.*sk_test" .env; then
    echo "⚠️  Using Stripe test keys (switch to live for production)"
elif grep -q "STRIPE_SECRET_KEY.*sk_live" .env; then
    echo "✅ Stripe live keys configured"
else
    echo "⚠️  Stripe not configured"
fi

# Check Vercel Blob
if grep -q "BLOB_READ_WRITE_TOKEN.*vercel_blob_rw_" .env; then
    echo "✅ Vercel Blob configured"
else
    echo "⚠️  Vercel Blob not configured"
fi

echo ""

# Check if Vercel CLI is installed
if command -v vercel &> /dev/null; then
    echo "✅ Vercel CLI is installed"
else
    echo "⚠️  Vercel CLI not installed"
    echo "   Install with: npm i -g vercel"
    echo "   Or visit: https://vercel.com/docs/cli"
    echo ""
    read -p "Would you like to continue with manual deployment? (y/n): " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

echo ""
echo "📦 Building Application"
echo "======================"
echo ""

# Build the application
echo "🔨 Building application..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful"
else
    echo "❌ Build failed"
    exit 1
fi

echo ""
echo "🧪 Testing Application"
echo "====================="
echo ""

# Run tests if available
if npm run test &> /dev/null; then
    echo "✅ Tests passed"
else
    echo "⚠️  Tests failed or not configured"
fi

echo ""
echo "🚀 Deployment Options"
echo "===================="
echo ""
echo "1. 🎯 Deploy to Vercel (Recommended)"
echo "2. 📋 Manual deployment checklist"
echo "3. 🔧 Configure production environment"
echo "4. ❌ Exit"
echo ""

read -p "Choose an option (1-4): " -n 1 -r
echo ""

case $REPLY in
    1)
        echo ""
        echo "🚀 Deploying to Vercel..."
        echo ""
        
        if command -v vercel &> /dev/null; then
            # Check if already logged in
            if vercel whoami &> /dev/null; then
                echo "✅ Already logged in to Vercel"
            else
                echo "�� Please log in to Vercel..."
                vercel login
            fi
            
            # Deploy to Vercel
            echo "🚀 Starting deployment..."
            vercel --prod
            
            echo ""
            echo "🎉 Deployment completed!"
            echo ""
            echo "📋 Next steps:"
            echo "   1. Configure environment variables in Vercel Dashboard"
            echo "   2. Set up custom domain (if needed)"
            echo "   3. Configure production services (Stripe, Supabase)"
            echo "   4. Test all functionality"
            echo "   5. Monitor application performance"
        else
            echo "❌ Vercel CLI not available"
            echo "   Please deploy manually through Vercel Dashboard"
        fi
        ;;
    2)
        echo ""
        echo "📋 Manual Deployment Checklist:"
        echo "==============================="
        echo ""
        echo "✅ Repository Setup:"
        echo "   - [ ] Git repository initialized"
        echo "   - [ ] Code pushed to GitHub/GitLab"
        echo "   - [ ] .env file in .gitignore"
        echo ""
        echo "✅ Vercel Setup:"
        echo "   - [ ] Vercel account created"
        echo "   - [ ] Project imported from repository"
        echo "   - [ ] Environment variables configured"
        echo ""
        echo "✅ Production Services:"
        echo "   - [ ] Supabase production database"
        echo "   - [ ] Stripe live mode configured"
        echo "   - [ ] Vercel Blob storage setup"
        echo "   - [ ] Webhooks configured"
        echo ""
        echo "✅ Deployment:"
        echo "   - [ ] Build successful"
        echo "   - [ ] All tests passing"
        echo "   - [ ] Environment variables set"
        echo "   - [ ] Custom domain configured"
        echo ""
        echo "✅ Post-Deployment:"
        echo "   - [ ] All functionality tested"
        echo "   - [ ] Monitoring configured"
        echo "   - [ ] Error tracking set up"
        echo "   - [ ] Performance optimized"
        echo ""
        ;;
    3)
        echo ""
        echo "🔧 Production Environment Configuration"
        echo "======================================"
        echo ""
        echo "📝 Environment Variables to Configure:"
        echo ""
        echo "# Database"
        echo "DATABASE_URL=\"postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres\""
        echo ""
        echo "# NextAuth"
        echo "NEXTAUTH_URL=\"https://your-domain.vercel.app\""
        echo "NEXTAUTH_SECRET=\"$(openssl rand -base64 32)\""
        echo ""
        echo "# Stripe (Production)"
        echo "STRIPE_SECRET_KEY=\"sk_live_your_live_secret_key\""
        echo "STRIPE_WEBHOOK_SECRET=\"whsec_your_webhook_secret\""
        echo "PRICE_STANDARD_SEAT_INR=\"price_your_price_id\""
        echo ""
        echo "# Vercel Blob"
        echo "BLOB_READ_WRITE_TOKEN=\"vercel_blob_rw_your_token\""
        echo ""
        echo "📋 Production Checklist:"
        echo "   - [ ] Switch Stripe to live mode"
        echo "   - [ ] Update webhook URLs to production domain"
        echo "   - [ ] Configure production database"
        echo "   - [ ] Set up monitoring and analytics"
        echo "   - [ ] Configure custom domain"
        echo "   - [ ] Set up SSL certificate"
        echo ""
        ;;
    4)
        echo "👋 Goodbye!"
        exit 0
        ;;
    *)
        echo "❌ Invalid option"
        exit 1
        ;;
esac

echo ""
echo "📚 For detailed instructions, see VERCEL_DEPLOYMENT.md"
echo ""
