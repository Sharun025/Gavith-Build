#!/bin/bash

# Gavith Build - Stripe Setup Script
# This script helps you configure Stripe billing integration

set -e

echo "💳 Gavith Build - Stripe Billing Setup"
echo "======================================"

# Check if .env file exists
if [ ! -f .env ]; then
    echo "❌ .env file not found. Please run 'npm run setup' first."
    exit 1
fi

echo "📋 Stripe Setup Checklist:"
echo "=========================="
echo ""
echo "1. ✅ Create Stripe Account"
echo "   - Go to https://stripe.com"
echo "   - Sign up and complete account setup"
echo ""
echo "2. 🔑 Get API Keys"
echo "   - Go to Developers → API keys"
echo "   - Copy Publishable and Secret keys"
echo ""
echo "3. 🏷️  Create Product & Price"
echo "   - Go to Products → Add product"
echo "   - Name: 'Gavith Build - Standard Seat'"
echo "   - Price: ₹500.00 (INR) per month"
echo "   - Note the Price ID (starts with 'price_')"
echo ""
echo "4. 🔗 Configure Webhooks"
echo "   - Go to Developers → Webhooks"
echo "   - Add endpoint: http://localhost:3000/api/billing/webhook"
echo "   - Select events: customer.subscription.*, invoice.payment_*"
echo "   - Copy the webhook secret (starts with 'whsec_')"
echo ""

# Check current Stripe configuration
echo "🔍 Checking current Stripe configuration..."
echo ""

if grep -q "STRIPE_SECRET_KEY.*sk_test" .env; then
    echo "✅ STRIPE_SECRET_KEY is configured (test mode)"
elif grep -q "STRIPE_SECRET_KEY.*sk_live" .env; then
    echo "✅ STRIPE_SECRET_KEY is configured (live mode)"
else
    echo "⚠️  STRIPE_SECRET_KEY not configured"
fi

if grep -q "STRIPE_WEBHOOK_SECRET.*whsec_" .env; then
    echo "✅ STRIPE_WEBHOOK_SECRET is configured"
else
    echo "⚠️  STRIPE_WEBHOOK_SECRET not configured"
fi

if grep -q "PRICE_STANDARD_SEAT_INR.*price_" .env; then
    echo "✅ PRICE_STANDARD_SEAT_INR is configured"
else
    echo "⚠️  PRICE_STANDARD_SEAT_INR not configured"
fi

echo ""

# Offer to update environment variables
read -p "Would you like to update your Stripe configuration? (y/n): " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo ""
    echo "📝 Updating Stripe configuration..."
    echo ""
    
    # Get Stripe Secret Key
    read -p "Enter your Stripe Secret Key (sk_test_... or sk_live_...): " STRIPE_SECRET_KEY
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        sed -i '' "s/STRIPE_SECRET_KEY=.*/STRIPE_SECRET_KEY=\"$STRIPE_SECRET_KEY\"/" .env
    else
        # Linux
        sed -i "s/STRIPE_SECRET_KEY=.*/STRIPE_SECRET_KEY=\"$STRIPE_SECRET_KEY\"/" .env
    fi
    echo "✅ STRIPE_SECRET_KEY updated"
    
    # Get Webhook Secret
    read -p "Enter your Stripe Webhook Secret (whsec_...): " STRIPE_WEBHOOK_SECRET
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        sed -i '' "s/STRIPE_WEBHOOK_SECRET=.*/STRIPE_WEBHOOK_SECRET=\"$STRIPE_WEBHOOK_SECRET\"/" .env
    else
        # Linux
        sed -i "s/STRIPE_WEBHOOK_SECRET=.*/STRIPE_WEBHOOK_SECRET=\"$STRIPE_WEBHOOK_SECRET\"/" .env
    fi
    echo "✅ STRIPE_WEBHOOK_SECRET updated"
    
    # Get Price ID
    read -p "Enter your Stripe Price ID (price_...): " PRICE_ID
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        sed -i '' "s/PRICE_STANDARD_SEAT_INR=.*/PRICE_STANDARD_SEAT_INR=\"$PRICE_ID\"/" .env
    else
        # Linux
        sed -i "s/PRICE_STANDARD_SEAT_INR=.*/PRICE_STANDARD_SEAT_INR=\"$PRICE_ID\"/" .env
    fi
    echo "✅ PRICE_STANDARD_SEAT_INR updated"
    
    echo ""
    echo "🎉 Stripe configuration updated!"
fi

echo ""
echo "🧪 Testing Stripe Integration"
echo "============================="
echo ""

# Check if Stripe CLI is installed
if command -v stripe &> /dev/null; then
    echo "✅ Stripe CLI is installed"
    
    read -p "Would you like to test webhooks locally? (y/n): " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo ""
        echo "🚀 Starting webhook testing..."
        echo "1. Start your development server: npm run dev"
        echo "2. In another terminal, run: stripe listen --forward-to localhost:3000/api/billing/webhook"
        echo "3. Test webhook events: stripe trigger customer.subscription.created"
        echo ""
    fi
else
    echo "⚠️  Stripe CLI not installed"
    echo "   Install with: brew install stripe/stripe-cli/stripe (macOS)"
    echo "   Or download from: https://stripe.com/docs/stripe-cli"
fi

echo ""
echo "📋 Next Steps:"
echo "=============="
echo ""
echo "1. 🚀 Start development server: npm run dev"
echo "2. 🧪 Test billing flow in your application"
echo "3. 💳 Use test cards for payment testing:"
echo "   - Success: 4242 4242 4242 4242"
echo "   - Decline: 4000 0000 0000 0002"
echo "4. 📊 Monitor webhook events in Stripe Dashboard"
echo "5. 🚀 Deploy to production when ready"
echo ""
echo "📚 For detailed instructions, see STRIPE_SETUP.md"
echo ""
