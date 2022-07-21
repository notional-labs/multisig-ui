export const chainData = [
    {
        chain_id: "osmosis-1",
        denom: "uosmo",
        name: "osmosis",
        prefix: "osmo",
        color: "linear-gradient(270.1deg, #5E12A0 0%, #390368 100%)",
        rpc: "https://rpc-osmosis-ia.notional.ventures/",
        api: "https://osmosis-api.polkachu.com/",
        explorer: "https://www.mintscan.io/osmosis/",
        logo: "/images/logo/osmosis.png"
    },
    {
        chain_id: "juno-1",
        denom: "ujuno",
        name: "juno",
        prefix: "juno",
        color: "linear-gradient(270.1deg, #F0827D 0%, #C5585A 100%)",
        rpc: "https://juno-rpc.polkachu.com/",
        api: "https://lcd-juno.itastakers.com/",
        explorer: "https://www.mintscan.io/juno/",
        logo: "/images/logo/juno.png"
    },
    {
        chain_id: "cosmoshub-4",
        denom: "uatom",
        name: "atom",
        prefix: "cosmos",
        color: "linear-gradient(270.1deg, #000000 0%, #414141 74%)",
        rpc: "https://rpc.cosmos.network/",
        api: "https://api.cosmos.network/",
        explorer: "https://www.mintscan.io/cosmos/",
        logo: "/images/logo/atom.png"
    },
//         {
//         chain_id: "akashnet-2",
//         denom: "uakt",
//         name: "akash",
//         prefix: "akash",
//         color: "linear-gradient(270.1deg, #000000 0%, #414141 74%)",
//         rpc: "https://rpc-akash-ia.notional.ventures/",
//         api: "https://api-akash-ia.notional.ventures/",
//         explorer: "https://www.mintscan.io/akash/",
//         logo: "/images/logo/atom.png"
//     },
//         {
//         chain_id: "emoney-3",
//         denom: "ungm",
//         name: "emoney",
//         prefix: "emoney",
//         color: "linear-gradient(270.1deg, #000000 0%, #414141 74%)",
//         rpc: "https://rpc-emoney-ia.notional.ventures/",
//         api: "https://rpc-emoney-ia.notional.ventures/",
//         explorer: "https://www.mintscan.io/emoney/",
//         logo: "/images/logo/atom.png"
//     },
//         {
//         chain_id: "sifchain-1",
//         denom: "rowan",
//         name: "sifchain",
//         prefix: "sif",
//         color: "linear-gradient(270.1deg, #000000 0%, #414141 74%)",
//         rpc: "https://rpc-sifchain-ia.notional.ventures/",
//         api: "https://rpc-sifchain-ia.notional.ventures/",
//         explorer: "https://www.mintscan.io/sifchain/",
//         logo: "/images/logo/atom.png"
//     },
//         {
//         chain_id: "stargaze-1",
//         denom: "ustars",
//         name: "stargaze",
//         prefix: "stars",
//         color: "linear-gradient(270.1deg, #000000 0%, #414141 74%)",
//         rpc: "https://rpc-stargaze-ia.notional.ventures/",
//         api: "https://api-stargaze-ia.notional.ventures/",
//         explorer: "https://www.mintscan.io/stargaze/",
//         logo: "/images/logo/atom.png"
//     },
//         {
//         chain_id: "kava_2222-10",
//         denom: "ukava",
//         name: "kava",
//         prefix: "kava",
//         color: "linear-gradient(270.1deg, #000000 0%, #414141 74%)",
//         rpc: "https://rpc-kava-ia.notional.ventures/",
//         api: "https://api-kava-ia.notional.ventures/",
//         explorer: "https://www.mintscan.io/kava",
//         logo: "/images/logo/atom.png"
//     },
//         {
//         chain_id: "regen-1",
//         denom: "uregen",
//         name: "regen",
//         prefix: "regen",
//         color: "linear-gradient(270.1deg, #000000 0%, #414141 74%)",
//         rpc: "https://rpc-regen-ia.notional.ventures/",
//         api: "https://api-regen-ia.notional.ventures/",
//         explorer: "https://www.mintscan.io/regen/",
//         logo: "/images/logo/atom.png"
//     },
//         {
//         chain_id: "omniflixhub-1",
//         denom: "uflix",
//         name: "flix",
//         prefix: "omniflix",
//         color: "linear-gradient(270.1deg, #000000 0%, #414141 74%)",
//         rpc: "https://rpc-omniflixhub-ia.notional.ventures/",
//         api: "https://api-omniflixhub-ia.notional.ventures/",
//         explorer: "https://www.mintscan.io/cosmos/",
//         logo: "/images/logo/atom.png"
//     },
//         {
//         chain_id: "cheqd-mainnet-1",
//         denom: "ncheq",
//         name: "cheqd",
//         prefix: "cheqd",
//         color: "linear-gradient(270.1deg, #000000 0%, #414141 74%)",
//         rpc: "https://rpc-cheqd-ia.notional.ventures/",
//         api: "https://api-cheqd-ia.notional.ventures/",
//         explorer: "https://ping.pub/cheqd",
//         logo: "/images/logo/atom.png"
//     },
//         {
//         chain_id: "bitcanna-1",
//         denom: "ubcna",
//         name: "bitcanna",
//         prefix: "bcna",
//         color: "linear-gradient(270.1deg, #000000 0%, #414141 74%)",
//         rpc: "https://rpc-bitcanna-ia.notional.ventures/",
//         api: "https://api-bitcanna-ia.notional.ventures/",
//         explorer: "https://www.mintscan.io/bitcanna/",
//         logo: "/images/logo/atom.png"
//     },
]

export const prefixToId = {
    "osmo": 0,
    "juno": 1,
    "cosmos": 2,
    "akash": 3,
    "emoney": 4,
    "sif": 5,
    "stars": 6,
    "kava": 7,
    "regen": 8,
    "omniflix": 9,
    "cheqd": 10,
    "bcna": 11
}


export const chainIdToId = {
    0: "osmosis-1",
    1: "juno-1",
    2: "cosmoshub-4",
    3: "akashnet-2",
    4: "emoney-3",
    5: "sifchain-1",
    6: "stargaze-1",
    7: "kava_2222-10",
    8: "regen-1",
    9: "omniflixhub-1",
    10: "cheqd-mainnet-1",
    11: "bitcanna-1"
}
