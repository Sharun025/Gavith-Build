#!/bin/bash

# Gavith Build - Vercel Blob Setup Script
# This script helps you configure Vercel Blob storage integration

set -e

echo "📁 Gavith Build - Vercel Blob Storage Setup"
echo "==========================================="

# Check if .env file exists
if [ ! -f .env ]; then
    echo "❌ .env file not found. Please run 'npm run setup' first."
    exit 1
fi

echo "📋 Vercel Blob Setup Checklist:"
echo "==============================="
echo ""
echo "1. ✅ Create Vercel Account"
echo "   - Go to https://vercel.com"
echo "   - Sign up and complete account setup"
echo ""
echo "2. 🚀 Deploy Project to Vercel"
echo "   - Import your GitHub/GitLab repository"
echo "   - Configure as Next.js project"
echo "   - Deploy to get project URL"
echo ""
echo "3. 📦 Create Blob Store"
echo "   - Go to Storage tab in Vercel Dashboard"
echo "   - Create new Blob store"
echo "   - Name: 'gavith-build-files'"
echo "   - Choose region closest to users"
echo ""
echo "4. 🔑 Generate Blob Token"
echo "   - Go to Blob store Settings → Tokens"
echo "   - Create new token with Read/Write permissions"
echo "   - Copy the token (starts with 'vercel_blob_rw_')"
echo ""

# Check current Vercel Blob configuration
echo "🔍 Checking current Vercel Blob configuration..."
echo ""

if grep -q "BLOB_READ_WRITE_TOKEN.*vercel_blob_rw_" .env; then
    echo "✅ BLOB_READ_WRITE_TOKEN is configured"
else
    echo "⚠️  BLOB_READ_WRITE_TOKEN not configured"
fi

if grep -q "BLOB_STORE_URL.*blob.vercel-storage.com" .env; then
    echo "✅ BLOB_STORE_URL is configured"
else
    echo "⚠️  BLOB_STORE_URL not configured (optional)"
fi

echo ""

# Offer to update environment variables
read -p "Would you like to update your Vercel Blob configuration? (y/n): " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo ""
    echo "📝 Updating Vercel Blob configuration..."
    echo ""
    
    # Get Blob Token
    read -p "Enter your Vercel Blob Token (vercel_blob_rw_...): " BLOB_TOKEN
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        sed -i '' "s/BLOB_READ_WRITE_TOKEN=.*/BLOB_READ_WRITE_TOKEN=\"$BLOB_TOKEN\"/" .env
    else
        # Linux
        sed -i "s/BLOB_READ_WRITE_TOKEN=.*/BLOB_READ_WRITE_TOKEN=\"$BLOB_TOKEN\"/" .env
    fi
    echo "✅ BLOB_READ_WRITE_TOKEN updated"
    
    # Get Store URL (optional)
    read -p "Enter your Blob Store URL (optional, press Enter to skip): " BLOB_URL
    if [ ! -z "$BLOB_URL" ]; then
        if [[ "$OSTYPE" == "darwin"* ]]; then
            # macOS
            sed -i '' "s/BLOB_STORE_URL=.*/BLOB_STORE_URL=\"$BLOB_URL\"/" .env
        else
            # Linux
            sed -i "s/BLOB_STORE_URL=.*/BLOB_STORE_URL=\"$BLOB_URL\"/" .env
        fi
        echo "✅ BLOB_STORE_URL updated"
    fi
    
    echo ""
    echo "🎉 Vercel Blob configuration updated!"
fi

echo ""
echo "🧪 Testing Vercel Blob Integration"
echo "=================================="
echo ""

# Check if @vercel/blob is installed
if grep -q "@vercel/blob" package.json; then
    echo "✅ @vercel/blob package is installed"
else
    echo "⚠️  @vercel/blob package not found"
    echo "   Installing @vercel/blob..."
    npm install @vercel/blob
    echo "✅ @vercel/blob installed"
fi

echo ""
echo "📋 Testing Steps:"
echo "================="
echo ""
echo "1. 🚀 Start development server: npm run dev"
echo "2. 📤 Test file upload in your application"
echo "3. 📊 Check Vercel Dashboard → Storage → Blob"
echo "4. 🔍 Verify files appear in your blob store"
echo ""

# Check if we should test the connection
read -p "Would you like to test the blob connection? (y/n): " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo ""
    echo "🔗 Testing blob connection..."
    
    # Check if token is set
    if grep -q "BLOB_READ_WRITE_TOKEN.*vercel_blob_rw_" .env; then
        echo "✅ Token is configured"
        
        # Test connection using curl
        echo "🌐 Testing API connection..."
        TOKEN=$(grep "BLOB_READ_WRITE_TOKEN" .env | cut -d'"' -f2)
        
        if command -v curl &> /dev/null; then
            RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" \
                -H "Authorization: Bearer $TOKEN" \
                https://blob.vercel-storage.com/v1/stores)
            
            if [ "$RESPONSE" = "200" ]; then
                echo "✅ Blob API connection successful"
            else
                echo "⚠️  Blob API connection failed (HTTP $RESPONSE)"
                echo "   Check your token and network connection"
            fi
        else
            echo "⚠️  curl not available, skipping API test"
        fi
    else
        echo "❌ Token not configured, skipping test"
    fi
fi

echo ""
echo "📋 Next Steps:"
echo "=============="
echo ""
echo "1. 🚀 Start development server: npm run dev"
echo "2. 📤 Test file upload functionality"
echo "3. 📊 Monitor storage usage in Vercel Dashboard"
echo "4. 🔒 Implement file validation and security"
echo "5. 🚀 Deploy to production when ready"
echo ""
echo "📚 For detailed instructions, see VERCEL_BLOB_SETUP.md"
echo ""
