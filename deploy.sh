#!/bin/bash

set -euo pipefail

cd "$(dirname "${BASH_SOURCE[0]}")"

for dependency in git node npm; do
  if ! command -v "$dependency" > /dev/null 2>&1; then
    echo "Missing $dependency. Make sure it is available in the deployment user's non-interactive SSH session." >&2
    exit 1
  fi
done

echo "Using Node $(node --version) and npm $(npm --version)"

echo "Fetching latest changes..."
git fetch origin '+refs/heads/main:refs/remotes/origin/main'

echo "Resetting to origin/main..."
git reset --hard origin/main

echo "Installing dependencies..."
npm ci

echo "Checking portfolio..."
npm run lint
npm test

echo "Building portfolio..."
npm run build

echo "Portfolio deployment complete."
git log -1 --format='Deployed %h %s'
