#!/bin/bash

osmosisd keys add test <<-INPUTS
    password
    password
INPUTS

JSON=$(echo "password" | osmosisd tx gamm join-pool --pool-id=1 --max-amounts-in=100stake --share-amount-out=100 --from $(echo "password" | osmosisd keys show test -a) --generate-only --chain-id test)

echo $JSON