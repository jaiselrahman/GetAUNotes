#!/bin/sh -l
set -e

echo "Token $FIREBASE_TOKEN";

if [ -z "$FIREBASE_TOKEN" ]
then
  echo "You must provide Firebase token"
  exit 1
fi

echo "Installing firebase-tools"
npm install -g firebase-tools

# Firebase hosting
echo "Firebase hosting"
cd public

echo "Installing npm dependencies"
npm install

echo "Build production version"
npm run build --modern

# Firebase hosting
echo "Firebase functions"
cd ../functions

echo "Installing npm dependencies"
npm install

echo "Deploying to Firebase hosting"
firebase deploy --only hosting,functions

echo "Deployment succesful!"
