#!/bin/bash
source ~/.bashrc
git stash
git pull
export PATH=/root/.nvm/versions/node/v18.9.0/bin:$PATH
if ! [ $? -eq 0 ]; then
    echo "git pull failed with errors."
    exit 1
fi

if [ -f "../env-multisig" ]; then
    echo "Multisig env file exists."
    cp ../env-multisig .env
fi
  
cp multisig.notional.ventures.service /etc/systemd/system/multisig.notional.ventures.service
systemctl daemon-reload
echo "Service file copied!"

npm install
npm run build
npm start

if [ $? -eq 0 ]; then
    systemctl restart multisig.notional.ventures.service
    systemctl is-active --quiet multisig.notional.ventures.service && echo "Multisg web server restarted successfully." || (echo "Multisig web server failed to restart." && exit 1)
else
    echo "npm run build failed with error. Stopped restarting the web server."
    exit 1
fi
