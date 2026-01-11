#!/bin/bash

# Smart Finance Manager - Deployment Commands
# Run these commands to deploy your application

echo "==================================="
echo "Smart Finance Manager Deployment"
echo "==================================="

# Color codes for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Step 1: Verify Requirements
echo -e "${BLUE}Step 1: Checking requirements...${NC}"
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Please install Node.js 18+"
    exit 1
fi
echo -e "${GREEN}✓ Node.js found: $(node -v)${NC}"

if ! command -v git &> /dev/null; then
    echo "❌ Git not found. Please install Git"
    exit 1
fi
echo -e "${GREEN}✓ Git found${NC}"

# Step 2: Install Dependencies
echo -e "${BLUE}Step 2: Installing dependencies...${NC}"
npm install
if [ $? -ne 0 ]; then
    echo -e "${YELLOW}Failed to install dependencies${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Dependencies installed${NC}"

# Step 3: Build Frontend
echo -e "${BLUE}Step 3: Building frontend...${NC}"
npm run build
if [ $? -ne 0 ]; then
    echo -e "${YELLOW}Frontend build failed${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Frontend built successfully${NC}"

# Step 4: Git Commit
echo -e "${BLUE}Step 4: Committing to Git...${NC}"
git add .
git commit -m "Deploy: Update for Groq integration and Vercel deployment"
git push origin main
if [ $? -ne 0 ]; then
    echo -e "${YELLOW}Git push failed. Push manually with: git push origin main${NC}"
fi
echo -e "${GREEN}✓ Changes pushed to GitHub${NC}"

# Step 5: Vercel Instructions
echo ""
echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}Step 5: Deploy to Vercel${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""
echo "1. Go to https://vercel.com"
echo "2. Click 'Add New' → 'Project'"
echo "3. Select your repository"
echo "4. Set Framework: Next.js"
echo "5. Click 'Deploy'"
echo ""

# Step 6: Environment Variables Instructions
echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}Step 6: Add Environment Variables${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""
echo "After deployment, add these in Vercel Settings → Environment Variables:"
echo ""
echo "Name: DATABASE_URL"
echo "Value: <your-neon-connection-string>"
echo ""
echo "Name: GROQ_API_KEY"
echo "Value: <your-groq-api-key>"
echo ""
echo "Name: JWT_SECRET"
echo "Value: $(openssl rand -base64 32)"
echo ""
echo "Name: NODE_ENV"
echo "Value: production"
echo ""
echo "Name: NEXT_PUBLIC_API_URL"
echo "Value: https://<your-project>.vercel.app"
echo ""

# Step 7: Final Instructions
echo -e "${BLUE}========================================${NC}"
echo -e "${GREEN}✓ Setup Complete!${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""
echo "Next steps:"
echo "1. Configure environment variables in Vercel"
echo "2. Click 'Redeploy' on latest deployment"
echo "3. Visit your application URL"
echo ""
echo "For help, see:"
echo "  - VERCEL_DEPLOYMENT.md"
echo "  - QUICK_START_VERCEL.md"
echo "  - SETUP_INSTRUCTIONS.md"
echo ""
