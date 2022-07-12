export const chainData = [
    {
        chain_id: 'osmosis-1',
        denom: 'uosmo',
        name: 'osmosis',
        prefix: 'osmo',
        color: 'linear-gradient(270.1deg, #5E12A0 0%, #390368 100%)',
        rpc: 'https://rpc.osmosis.zone/',
        api: 'https://osmosis-api.polkachu.com/',
        explorer: 'https://www.mintscan.io/osmosis/',
        logo: '/images/logo/osmosis.png'
    },
    {
        chain_id: 'juno-1',
        denom: 'ujuno',
        name: 'juno',
        prefix: 'juno',
        color: 'linear-gradient(270.1deg, #F0827D 0%, #C5585A 100%)',
        rpc: 'https://juno-rpc.polkachu.com/',
        api: 'https://lcd-juno.itastakers.com/',
        explorer: 'https://www.mintscan.io/juno/',
        logo: '/images/logo/juno.png'
    },
    {
        chain_id: 'cosmoshub-4',
        denom: 'uatom',
        name: 'atom',
        prefix: 'cosmos',
        color: 'linear-gradient(270.1deg, #000000 0%, #414141 74%)',
        rpc: 'https://rpc.cosmos.network/',
        api: 'https://api.cosmos.network/',
        explorer: 'https://www.mintscan.io/cosmos/',
        logo: '/images/logo/atom.png'
    },
]

export const prefixToId = {
    "osmo": 0,
    "juno": 1,
    "cosmos": 2
}


export const chainIdToId = {
    0: "osmosis-1",
    1: "juno-1",
    2: "cosmoshub-4"
}