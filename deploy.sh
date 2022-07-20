#!/bin/bash

git stash
git pull
cp .env.local
npm install
npm run build
npm run start
