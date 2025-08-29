#!/bin/bash

# Gavith Build - Supabase Setup Script
# This script helps you set up your Supabase database quickly

set -e

echo "🏗️  Gavith Build - Supabase Database Setup"
echo "=========================================="

# Check if .env file exists
if [ ! -f .env ]; then
    echo "📝 Creating .env file from .env.example..."
    cp .env.example .env
    echo "✅ .env file created"
else
    echo "✅ .env file already exists"
fi

# Check if DATABASE_URL is set
if grep -q "DATABASE_URL.*supabase" .env; then
    echo "✅ Supabase DATABASE_URL is configured"
else
    echo "⚠️  Please update your .env file with your Supabase DATABASE_URL"
    echo "   Format: postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres"
    echo ""
    echo "📋 Steps to get your connection string:"
    echo "   1. Go to https://supabase.com"
    echo "   2. Create a new project"
    echo "   3. Go to Settings → Database"
    echo "   4. Copy the connection string"
    echo "   5. Update .env file"
    echo ""
    read -p "Press Enter when you've updated the DATABASE_URL..."
fi

# Check if NEXTAUTH_SECRET is set
if grep -q "NEXTAUTH_SECRET.*replace-me" .env; then
    echo "🔐 Generating NEXTAUTH_SECRET..."
    SECRET=$(openssl rand -base64 32)
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        sed -i '' "s/NEXTAUTH_SECRET=.*/NEXTAUTH_SECRET=\"$SECRET\"/" .env
    else
        # Linux
        sed -i "s/NEXTAUTH_SECRET=.*/NEXTAUTH_SECRET=\"$SECRET\"/" .env
    fi
    echo "✅ NEXTAUTH_SECRET generated and updated"
else
    echo "✅ NEXTAUTH_SECRET is already configured"
fi

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo "✅ Dependencies installed"
else
    echo "✅ Dependencies already installed"
fi

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npm run db:generate
echo "✅ Prisma client generated"

# Check if we should push schema
echo ""
read -p "🚀 Ready to push schema to Supabase? (y/n): " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "📊 Pushing schema to database..."
    npm run db:push
    echo "✅ Schema pushed to database"
    
    # Check if we should seed data
    echo ""
    read -p "🌱 Seed database with demo data? (y/n): " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "🌱 Seeding database..."
        npm run db:seed
        echo "✅ Database seeded with demo data"
    fi
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "📋 Next steps:"
echo "   1. Start development server: npm run dev"
echo "   2. Test login with: demo@gavithbuild.com / password123"
echo "   3. Configure Stripe for billing"
echo "   4. Set up Vercel Blob for file storage"
echo "   5. Deploy to Vercel"
echo ""
echo "📚 For detailed instructions, see SUPABASE_SETUP.md"
echo ""
