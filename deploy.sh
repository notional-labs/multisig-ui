#!/bin/bash
source ~/.bashrc
git stash
git pull
if ! [ $? -eq 0 ]; then
    echo "git pull failed with errors."
    exit 1
fi

if [ -f "../env-multisig" ]; then
    echo "Multisig env file exists."
    cp ../env-multisig .env
fi

if [ -f "/etc/systemd/system/multisig.notional.ventures.service" ]; then
    echo "Found service file!"
else    
    cp multisig.notional.ventures.service /etc/systemd/system/multisig.notional.ventures.service
    echo "Service file copied!"
fi

npm install
npm run build

if [ $? -eq 0 ]; then
    systemctl restart multisig.notional.ventures.service
    systemctl is-active --quiet multisig.notional.ventures.service && echo "Multisg web server restarted successfully." || (echo "Multisig web server failed to restart." && exit 1)
else
    echo "npm run build failed with error. Stopped restarting the web server."
    exit 1
fi
