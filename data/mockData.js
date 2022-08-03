export const mockData = 
`Example transaction JSON:

############ TYPE1 ############
{
    "chain_id": "osmosis-1",
    "fee": {
        "gas": "250000",
        "amount": [
            {
                "denom": "uosmo",
                "amount": "0"
            }
        ]
    },
    "msgs": [
        {
            "type": "cosmos-sdk/MsgUndelegate",
            "value": {
                "delegator_address": "osmo1dkf74alrfzarkac93a5tzrqsfd47juldfgdgxj",
                "validator_address": "osmovaloper1083svrca4t350mphfvdfgdgwq9asrs60c6rv0j5",
                "amount": {
                    "denom": "uosmo",
                    "amount": "100000"
                }
            }
        }
    ],
    "memo": ""
}

############ TYPE1 (Multi message) ############
{
    "chain_id": "osmosis-1",
    "fee": {
        "gas": "250000",
        "amount": [
            {
                "denom": "uosmo",
                "amount": "0"
            }
        ]
    },
    "msgs": [
        {
            "type": "cosmos-sdk/MsgUndelegate",
            "value": {
                "delegator_address": "osmo1dkf74alrfzarkac93a5tzrqsfd47juldfgdgxj",
                "validator_address": "osmovaloper1083svrca4t350mphfvdfgdgwq9asrs60c6rv0j5",
                "amount": {
                    "denom": "uosmo",
                    "amount": "100000"
                }
            }
        },
        {
            "type": "cosmos-sdk/MsgUndelegate",
            "value": {
                "delegator_address": "osmo1dkf74alrfzarkac93a5tzrqsfd47juldfgdgxj",
                "validator_address": "osmovaloper1083svrca4t350mphfvdfgdgwq9asrs60c6rv0j5",
                "amount": {
                    "denom": "uosmo",
                    "amount": "100000"
                }
            }
        }
    ],
    "memo": ""
}

############ TYPE2 ############
{
  "body": {
    "messages": [
      {
        "@type": "/cosmos.bank.v1beta1.MsgSend",
        "from_address": "cosmos1z2mf7s005tqg3z7je7htkq5wguuruncjj89c5v",
        "to_address": "cosmos1nn6ajerz2ql5akrua7p4sf2dm82uxwd3cw2ft8",
        "amount": [
          {
            "denom": "uosmo",
            "amount": "200000"
          }
        ]
      }
    ],
    "memo": "",
    "timeout_height": "0",
    "extension_options": [],
    "non_critical_extension_options": []
  },
  "auth_info": {
    "signer_infos": [],
    "fee": {
      "amount": [],
      "gas_limit": "200000",
      "payer": "",
      "granter": ""
    }
  },
  "signatures": []
}

############ TYPE2 (multi message) ############
{
  "body": {
    "messages": [
      {
        "@type": "/cosmos.bank.v1beta1.MsgSend",
        "from_address": "cosmos1z2mf7s005tqg3z7je7htkq5wguuruncjj89c5v",
        "to_address": "cosmos1nn6ajerz2ql5akrua7p4sf2dm82uxwd3cw2ft8",
        "amount": [
          {
            "denom": "uosmo",
            "amount": "200000"
          }
        ]
      },
      {
        "@type": "/cosmos.bank.v1beta1.MsgSend",
        "from_address": "cosmos1z2mf7s005tqg3z7je7htkq5wguuruncjj89c5v",
        "to_address": "cosmos1nn6ajerz2ql5akrua7p4sf2dm82uxwd3cw2ft8",
        "amount": [
          {
            "denom": "uosmo",
            "amount": "200000"
          }
        ]
      }
    ],
    "memo": "",
    "timeout_height": "0",
    "extension_options": [],
    "non_critical_extension_options": []
  },
  "auth_info": {
    "signer_infos": [],
    "fee": {
      "amount": [],
      "gas_limit": "200000",
      "payer": "",
      "granter": ""
    }
  },
  "signatures": []
}
`
