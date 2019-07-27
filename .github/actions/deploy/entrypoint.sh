#!/bin/sh -l
set -e

if [ -z "$FIREBASE_TOKEN" ]
then
  echo "You must provide Firebase token"
  exit 1
fi

echo "Installing firebase-tools"
npm install -g firebase-tools

echo "Firebase hosting"
cd public

echo "Installing npm dependencies"
npm install

echo "Build production version"
npm run build --modern

echo "Deploying to Firebase hosting"
firebase deploy --only hosting

echo "Deployment succesful!"
