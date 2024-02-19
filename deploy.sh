#!/bin/bash
git stash save --keep-index --include-untracked
git pull
export PATH=/root/.nvm/versions/node/v18.9.0/bin:$PATH

if ! [ $? -eq 0 ]; then
    echo "git pull failed with errors."
    exit 1
fi

npm install
npm run build

if [ $? -eq 0 ]; then
    pm2 restart ecosystem.config.js --env prod
else
    echo "npm run build failed with error. Stopped restarting the web server."
    exit 1
fi
