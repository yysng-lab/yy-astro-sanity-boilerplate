#!/usr/bin/env bash
set -e

echo "🔧 Releasing new boilerplate version..."

git status

echo "📦 Bumping patch version..."
npm version patch

echo "🚀 Pushing to GitHub..."
git push
git push --tags

echo "📤 Publishing to npm..."
npm publish --access public

echo "✅ Release complete."
