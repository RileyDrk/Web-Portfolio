#!/bin/bash

set -e

cd /home/riley-drake/Projects/Websites/Web-Portfolio

echo "Fetching latest changes..."
git fetch origin

echo "Resetting to origin/main..."
git reset --hard origin/main

echo "Installing dependencies..."
npm ci

echo "Building portfolio..."
npm run build

echo "Portfolio deployment complete."
