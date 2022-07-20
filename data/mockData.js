export const mockData = 
`Example transaction JSON:

{
    'chain_id': 'osmosis-1',
    'fee': {
        'gas': '250000',
        'amount': [
            {
                'denom': 'uosmo',
                'amount': '0'
            }
        ]
    },
    'msgs': [
        {
            'type': 'cosmos-sdk/MsgUndelegate',
            'value': {
                'delegator_address': 'osmo1dkf74alrfzarkac93a5tzrqsfd47juldfgdgxj',
                'validator_address': 'osmovaloper1083svrca4t350mphfvdfgdgwq9asrs60c6rv0j5',
                'amount': {
                    'denom': 'uosmo',
                    'amount': '100000'
                }
            }
        }
    ],
    'memo': ''
}
`