#!/bin/bash
set -e

echo "🔐 Verifying clean working tree..."
if ! git diff --quiet || ! git diff --cached --quiet; then
  echo "❌ Working tree not clean. Commit or stash first."
  exit 1
fi

# 1. Auto-stage everything
git add .

# 2. Auto-commit if there are changes
if ! git diff --cached --quiet; then
  COMMIT_MSG="release: $(date '+%Y-%m-%d %H:%M')"
  echo "📝 Committing changes: $COMMIT_MSG"
  git commit -m "$COMMIT_MSG"
else
  echo "ℹ️ No file changes to commit"
fi

# 3. Bump version
echo "📦 Bumping patch version..."
NEW_VERSION=$(npm version patch)

# 4. Publish package
echo "🚀 Publishing $NEW_VERSION to npm..."
npm publish

# 5. Push commits + tags
echo "📌 Pushing to origin..."
git push --follow-tags

echo "✅ Boilerplate released: $NEW_VERSION"