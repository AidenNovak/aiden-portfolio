#!/bin/bash

# Build script that temporarily excludes admin routes during static export

echo "🔧 Preparing for static export..."

# Save admin directories outside of project
if [ -d "app/admin" ]; then
  mv app/admin ../admin_temp_backup
  echo "✅ Temporarily moved admin pages"
fi

if [ -d "app/admin-api" ]; then
  mv app/admin-api ../admin-api_temp_backup
  echo "✅ Temporarily moved admin API routes"
fi

if [ -d "middleware.ts" ]; then
  mv middleware.ts ../middleware_temp_backup.ts
  echo "✅ Temporarily moved middleware"
fi

# Clean build cache
echo "🧹 Cleaning build cache..."
rm -rf .next

# Run the build
echo "🏗️  Building static site..."
npm run build:raw
BUILD_STATUS=$?

# Restore admin directories
if [ -d "../admin_temp_backup" ]; then
  mv ../admin_temp_backup app/admin
  echo "✅ Restored admin pages"
fi

if [ -d "../admin-api_temp_backup" ]; then
  mv ../admin-api_temp_backup app/admin-api
  echo "✅ Restored admin API routes"
fi

if [ -f "../middleware_temp_backup.ts" ]; then
  mv ../middleware_temp_backup.ts middleware.ts
  echo "✅ Restored middleware"
fi

if [ $BUILD_STATUS -eq 0 ]; then
  echo "✨ Build complete!"
else
  echo "❌ Build failed!"
  exit 1
fi
