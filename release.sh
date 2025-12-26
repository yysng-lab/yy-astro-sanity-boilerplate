#!/bin/bash
set -e

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
npm version patch

# 4. Publish package
echo "🚀 Publishing to npm..."
npm publish

# 5. Push commits + tags
echo "📌 Pushing to origin..."
git push --follow-tags

echo "✅ Release complete"