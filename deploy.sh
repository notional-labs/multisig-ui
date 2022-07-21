#!/bin/bash

git stash
git pull
if [ -f "../env-multisig" ]; then
    echo "Multisig env file exists."
    cp ../env-multisig .env.local
fi
npm install
npm run build
if [ $? -eq 0 ]; then
    systemctl restart multisig.service
    systemctl is-active --quiet multisig.service && echo "Multisg web server restarted successfully." || echo "Multisig web server failed to restart."
else
    echo "npm run build failed with error. Stopped restarting the web server."
    exit 1
fi
