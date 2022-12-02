import { environment } from "../config/environment.config";
export const chainData = [
    {
        chain_id: "osmosis-1",
        denom: "uosmo",
        displayDenom: "osmo",
        base_denom: {
            "denom": "uosmo",
            "exponent": 6
        },
        name: "osmosis",
        prefix: "osmo",
        color: "linear-gradient(270.1deg, #5E12A0 0%, #390368 100%)",
        rpc: "https://rpc-osmosis-ia.cosmosia.notional.ventures/",
        api: "https://osmosis-api.polkachu.com/",
        explorer: "https://www.mintscan.io/osmosis/",
        txExplorer: "https://www.mintscan.io/osmosis/txs/",
        valExplorer: "https://www.mintscan.io/osmosis/validators/",
        govExplorer: "https://www.mintscan.io/osmosis/proposals/",
        logo: "/images/logo/osmosis.png",
        hyperLink: "https://osmosis.zone/"
    },
    {
        chain_id: "juno-1",
        denom: "ujuno",
        displayDenom: "juno",
        base_denom: {
            "denom": "ujuno",
            "exponent": 6
        },
        name: "juno",
        prefix: "juno",
        color: "linear-gradient(270.1deg, #F0827D 0%, #C5585A 100%)",
        rpc: "https://rpc-juno-ia.cosmosia.notional.ventures/",
        api: "https://api-juno-ia.cosmosia.notional.ventures/",
        explorer: "https://www.mintscan.io/juno/",
        txExplorer: "https://www.mintscan.io/juno/txs/",
        valExplorer: "https://www.mintscan.io/juno/validators/",
        govExplorer: "https://www.mintscan.io/juno/proposals/",
        logo: "/images/logo/juno.png",
        hyperLink: "https://www.junonetwork.io/"
    },
    {
        chain_id: "cosmoshub-4",
        denom: "uatom",
        displayDenom: "atom",
        base_denom: {
            "denom": "uatom",
            "exponent": 6
        },
        name: "atom",
        prefix: "cosmos",
        color: "linear-gradient(270.1deg, #000000 0%, #414141 74%)",
        rpc: "https://rpc-cosmoshub-ia.cosmosia.notional.ventures/",
        api: "https://api-cosmoshub-ia.cosmosia.notional.ventures/",
        explorer: "https://www.mintscan.io/cosmos/",
        txExplorer: "https://www.mintscan.io/cosmos/txs/",
        valExplorer: "https://www.mintscan.io/cosmos/validators/",
        govExplorer: "https://www.mintscan.io/cosmos/proposals/",
        logo: "/images/logo/atom.png",
        hyperLink: "https://cosmos.network/"
    },
    {
        chain_id: "akashnet-2",
        denom: "uakt",
        displayDenom: "akt",
        base_denom: {
            "denom": "uakt",
            "exponent": 6
        },
        name: "akash",
        prefix: "akash",
        color: "linear-gradient(to right, #cb262a, #ed3324 49%)",
        rpc: "https://rpc-akash-ia.cosmosia.notional.ventures/",
        api: "https://api-akash-ia.cosmosia.notional.ventures/",
        explorer: "https://www.mintscan.io/akash/",
        txExplorer: "https://www.mintscan.io/akash/txs/",
        valExplorer: "https://www.mintscan.io/akash/validators/",
        govExplorer: "https://www.mintscan.io/akash/proposals/",
        logo: "/images/logo/akt.png",
        hyperLink: "https://akash.network/"
    },
    {
        chain_id: "emoney-3",
        denom: "ungm",
        displayDenom: "ngm",
        base_denom: {
            "denom": "ungm",
            "exponent": 6
        },
        name: "emoney",
        prefix: "emoney",
        color: "linear-gradient(to right, #00282d, #035059 81%)",
        rpc: "https://rpc-emoney-ia.cosmosia.notional.ventures/",
        api: "https://api-emoney-ia.cosmosia.notional.ventures/",
        explorer: "https://www.mintscan.io/emoney/",
        txExplorer: "https://www.mintscan.io/emoney/txs/",
        valExplorer: "https://www.mintscan.io/emoney/validators/",
        govExplorer: "https://www.mintscan.io/emoney/proposals/",
        logo: "/images/logo/ngm.png",
        hyperLink: "https://emoney.com/"
    },
    {
        chain_id: "evmos_9001-2",
        denom: "aevmos",
        displayDenom: "evmos",
        base_denom: {
            "denom": "aevmos",
            "exponent": 18
        },
        name: "evmos",
        prefix: "evmos",
        color: "linear-gradient(to right, #171717, #414141 81%)",
        rpc: "https://rpc-evmos-ia.cosmosia.notional.ventures/",
        api: "https://api-evmos-ia.cosmosia.notional.ventures/",
        explorer: "https://www.mintscan.io/evmos/",
        txExplorer: "https://www.mintscan.io/evmos/txs/",
        valExplorer: "https://www.mintscan.io/evmos/validators/",
        govExplorer: "https://www.mintscan.io/evmos/proposals/",
        logo: "/images/logo/evmos.png",
        hyperLink: "https://evmos.org/"
    },
    {
        chain_id: "sifchain-1",
        denom: "rowan",
        displayDenom: "rowan",
        base_denom: {
            "denom": "rowan",
            "exponent": 18
        },
        name: "sifchain",
        prefix: "sif",
        color: "linear-gradient(to right, #a28116, #caa83b 81%)",
        rpc: "https://rpc-sifchain-ia.cosmosia.notional.ventures/",
        api: "https://api-sifchain-ia.cosmosia.notional.ventures/",
        explorer: "https://www.mintscan.io/sifchain/",
        txExplorer: "https://www.mintscan.io/sifchain/txs/",
        valExplorer: "https://www.mintscan.io/sifchain/validators/",
        govExplorer: "https://www.mintscan.io/sifchain/proposals/",
        logo: "/images/logo/rowan.png",
        hyperLink: "https://www.sifchain.finance/"
    },
    {
        chain_id: "stargaze-1",
        denom: "ustars",
        displayDenom: "stars",
        base_denom: {
            "denom": "ustars",
            "exponent": 6
        },
        name: "stargaze",
        prefix: "stars",
        color: "linear-gradient(to right, #0b0340, #3d3584 81%)",
        rpc: "https://rpc-stargaze-ia.cosmosia.notional.ventures/",
        api: "https://api-stargaze-ia.cosmosia.notional.ventures/",
        explorer: "https://www.mintscan.io/stargaze/",
        txExplorer: "https://www.mintscan.io/stargaze/txs/",
        valExplorer: "https://www.mintscan.io/stargaze/validators/",
        govExplorer: "https://www.mintscan.io/stargaze/proposals/",
        logo: "/images/logo/stars.png",
        hyperLink: "https://www.stargaze.zone/"
    },
    {
        chain_id: "kava_2222-10",
        denom: "ukava",
        displayDenom: "kava",
        base_denom: {
            "denom": "ukava",
            "exponent": 6
        },
        name: "kava",
        prefix: "kava",
        color: "linear-gradient(to right, #ff564f, #ff7772 81%)",
        rpc: "https://rpc-kava-ia.cosmosia.notional.ventures/",
        api: "https://api-kava-ia.cosmosia.notional.ventures/",
        explorer: "https://www.mintscan.io/kava",
        txExplorer: "https://www.mintscan.io/kava/txs/",
        valExplorer: "https://www.mintscan.io/kava/validators/",
        govExplorer: "https://www.mintscan.io/kava/proposals/",
        logo: "/images/logo/kava.png",
        hyperLink: "https://www.kava.io/"
    },
    {
        chain_id: "regen-1",
        denom: "uregen",
        displayDenom: "regen",
        base_denom: {
            "denom": "uregen",
            "exponent": 6
        },
        name: "regen",
        prefix: "regen",
        color: "linear-gradient(to right, #167038, #43ad6b 81%)",
        rpc: "https://rpc-regen-ia.cosmosia.notional.ventures/",
        api: "https://api-regen-ia.cosmosia.notional.ventures/",
        explorer: "https://www.mintscan.io/regen/",
        txExplorer: "https://www.mintscan.io/regen/txs/",
        valExplorer: "https://www.mintscan.io/regen/validators/",
        govExplorer: "https://www.mintscan.io/regen/proposals/",
        logo: "/images/logo/regen.png",
        hyperLink: "https://www.regen.network/"
    },
    {
        chain_id: "omniflixhub-1",
        denom: "uflix",
        displayDenom: "flix",
        base_denom: {
            "denom": "uflix",
            "exponent": 6
        },
        name: "omniflix",
        prefix: "omniflix",
        color: "linear-gradient(to right, #0d0843, #060322 81%)",
        rpc: "https://rpc-omniflixhub-ia.cosmosia.notional.ventures/",
        api: "https://api-omniflixhub-ia.cosmosia.notional.ventures/",
        explorer: "https://www.mintscan.io/omniflix/",
        txExplorer: "https://www.mintscan.io/omniflix/txs/",
        valExplorer: "https://www.mintscan.io/omniflix/validators/",
        govExplorer: "https://www.mintscan.io/omniflix/proposals/",
        logo: "/images/logo/flix.png",
        hyperLink: "https://omniflix.network/"
    },
    {
        chain_id: "cheqd-mainnet-1",
        denom: "ncheq",
        displayDenom: "cheq",
        base_denom: {
            "denom": "ncheq",
            "exponent": 9
        },
        name: "cheqd",
        prefix: "cheqd",
        color: "linear-gradient(270.1deg, #422f27 0%, #855b49 74%)",
        rpc: "https://rpc-cheqd-ia.cosmosia.notional.ventures/",
        api: "https://api-cheqd-ia.cosmosia.notional.ventures/",
        explorer: "https://ping.pub/cheqd",
        txExplorer: "https://ping.pub/cheqd/tx/",
        valExplorer: "https://ping.pub/cheqd/staking/",
        govExplorer: "https://ping.pub/cheqd/osmosis/gov/",
        logo: "/images/logo/cheq.png",
        hyperLink: "https://cheqd.io/"
    },
    {
        chain_id: "bitcanna-1",
        denom: "ubcna",
        displayDenom: "bcna",
        base_denom: {
            "denom": "ubcna",
            "exponent": 6
        },
        name: "bitcanna",
        prefix: "bcna",
        color: "linear-gradient(to right, #08b788, #32d6aa 81%)",
        rpc: "https://rpc-bitcanna-ia.cosmosia.notional.ventures/",
        api: "https://api-bitcanna-ia.cosmosia.notional.ventures/",
        explorer: "https://www.mintscan.io/bitcanna/",
        txExplorer: "https://www.mintscan.io/bitcanna/txs/",
        valExplorer: "https://www.mintscan.io/bitcanna/validators/",
        govExplorer: "https://www.mintscan.io/bitcanna/proposals/",
        logo: "/images/logo/bcna.png",
        hyperLink: "https://www.bitcanna.io/"
    },
    {
        chain_id: "gravity-bridge-3",
        denom: "ugraviton",
        displayDenom: "graviton",
        base_denom: {
            "denom": "ugraviton",
            "exponent": 6
        },
        name: "gravitybridge",
        prefix: "gravity",
        color: "linear-gradient(to right, #181ed9, #181ed9 81%)",
        rpc: "https://rpc-gravitybridge-ia.cosmosia.notional.ventures/",
        api: "https://api-gravitybridge-ia.cosmosia.notional.ventures/",
        explorer: "https://www.mintscan.io/gravity-bridge/",
        txExplorer: "https://www.mintscan.io/gravity-bridge/txs/",
        valExplorer: "https://www.mintscan.io/gravity-bridge/validators/",
        govExplorer: "https://www.mintscan.io/gravity-bridge/proposals/",
        logo: "/images/logo/grav.png",
        hyperLink: "https://www.gravitybridge.net/"
    },
    {
        chain_id: environment.chainid,
        denom: environment.denom,
        displayDenom: environment.displayDenom,
        base_denom: {
            denom: environment.baseDenom,
            exponent: environment.baseExponent
        },
        name: environment.name,
        prefix: environment.prefix,
        color: environment.color,
        rpc: environment.rpc,
        api: environment.rest,
        explorer: environment.explorer,
        txExplorer: environment.txExplorer,
        valExplorer: environment.valExplorer,
        govExplorer: environment.govExplorer,
        logo: environment.logo,
        hyperLink: environment.hyperLink,
        supportedDenom: environment.supportedDenom, 
        supportedDenomDisplay: environment.supportedDenomDisplay, 
    },
]

export const prefixToId = {
    "osmo": 0,
    "juno": 1,
    "cosmos": 2,
    "akash": 3,
    "emoney": 4,
    "evmos": 5,
    "sif": 6,
    "stars": 7,
    "kava": 8,
    "regen": 9,
    "omniflix": 10,
    "cheqd": 11,
    "bcna": 12,
    "gravity": 13,
    "pylo": 14
}


export const idToChainId = {
    0: "osmosis-1",
    1: "juno-1",
    2: "cosmoshub-4",
    3: "akashnet-2",
    4: "emoney-3",
    5: "evmos_9001-2",
    6: "sifchain-1",
    7: "stargaze-1",
    8: "kava_2222-10",
    9: "regen-1",
    10: "omniflixhub-1",
    11: "cheqd-mainnet-1",
    12: "bitcanna-1",
    13: "gravity-bridge-3",
    14: environment.chainid
}


export const specialDenom = {
    "rowan": 18,
    "boot": 0
}
