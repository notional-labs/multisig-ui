export const chainObj = {
    "kava_2222-10": {
        chainId: "kava_2222-10",
        chainName: "kava",
        rpc: "https://rpc-kava-ia.notional.ventures/",
        rest: "https://api-kava-ia.notional.ventures/",
        bip44: {
            coinType: 118,
        },
        bech32Config: {
            bech32PrefixAccAddr: "kava",
            bech32PrefixAccPub: "kava" + "pub",
            bech32PrefixValAddr: "kava" + "valoper",
            bech32PrefixValPub: "kava" + "valoperpub",
            bech32PrefixConsAddr: "kava" + "valcons",
            bech32PrefixConsPub: "kava" + "valconspub",
        },
        currencies: [
            {
                coinDenom: "KAVA",
                coinMinimalDenom: "ukava",
                coinDecimals: 6,
                coinGeckoId: "kava",
            },
        ],
        feeCurrencies: [
            {
                coinDenom: "KAVA",
                coinMinimalDenom: "ukava",
                coinDecimals: 6,
                coinGeckoId: "kava",
            },
        ],
        stakeCurrency: {
            coinDenom: "KAVA",
            coinMinimalDenom: "ukava",
            coinDecimals: 6,
            coinGeckoId: "kava",
        },
        gasPriceStep: {
            low: 0.01,
            average: 0.025,
            high: 0.03,
        },
    },
    "omniflixhub-1": {
        chainId: "omniflixhub-1",
        chainName: "omniflixhub",
        rpc: "https://rpc-omniflixhub-ia.notional.ventures/",
        rest: "https://api-omniflixhub-ia.notional.ventures/",
        bip44: {
            coinType: 118,
        },
        bech32Config: {
            bech32PrefixAccAddr: "omniflix",
            bech32PrefixAccPub: "omniflix" + "pub",
            bech32PrefixValAddr: "omniflix" + "valoper",
            bech32PrefixValPub: "omniflix" + "valoperpub",
            bech32PrefixConsAddr: "omniflix" + "valcons",
            bech32PrefixConsPub: "omniflix" + "valconspub",
        },
        currencies: [
            {
                coinDenom: "FLIX",
                coinMinimalDenom: "uflix",
                coinDecimals: 6,
                coinGeckoId: "omniflix-network",
            },
        ],
        feeCurrencies: [
            {
                coinDenom: "FLIX",
                coinMinimalDenom: "uflix",
                coinDecimals: 6,
                coinGeckoId: "omniflix-network",
            },
        ],
        stakeCurrency: {
            coinDenom: "FLIX",
            coinMinimalDenom: "uflix",
            coinDecimals: 6,
            coinGeckoId: "omniflix-network",
        },
        gasPriceStep: {
            low: 0.01,
            average: 0.025,
            high: 0.03,
        },
    },
    "cheqd-mainnet-1": {
        chainId: "cheqd-mainnet-1",
        chainName: "cheqd",
        rpc: "https://rpc-cheqd-ia.notional.ventures/",
        rest: "https://api-cheqd-ia.notional.ventures/",
        bip44: {
            coinType: 118,
        },
        bech32Config: {
            bech32PrefixAccAddr: "cheqd",
            bech32PrefixAccPub: "cheqd" + "pub",
            bech32PrefixValAddr: "cheqd" + "valoper",
            bech32PrefixValPub: "cheqd" + "valoperpub",
            bech32PrefixConsAddr: "cheqd" + "valcons",
            bech32PrefixConsPub: "cheqd" + "valconspub",
        },
        currencies: [
            {
                coinDenom: "CHEQ",
                coinMinimalDenom: "ncheq",
                coinDecimals: 9,
                coinGeckoId: "cheqd-network",
            },
        ],
        feeCurrencies: [
            {
                coinDenom: "CHEQ",
                coinMinimalDenom: "ncheq",
                coinDecimals: 9,
                coinGeckoId: "cheqd-network",
            },
        ],
        stakeCurrency: {
            coinDenom: "CHEQ",
            coinMinimalDenom: "ncheq",
            coinDecimals: 9,
            coinGeckoId: "cheqd-network",
        },
        gasPriceStep: {
            low: 0.01,
            average: 0.025,
            high: 0.03,
        },
    },
    "bitcanna-1": {
        chainId: "bitcanna-1",
        chainName: "bitcanna",
        rpc: "https://rpc-bitcanna-ia.notional.ventures/",
        rest: "https://api-bitcanna-ia.notional.ventures/",
        bip44: {
            coinType: 118,
        },
        bech32Config: {
            bech32PrefixAccAddr: "bcna",
            bech32PrefixAccPub: "bcna" + "pub",
            bech32PrefixValAddr: "bcna" + "valoper",
            bech32PrefixValPub: "bcna" + "valoperpub",
            bech32PrefixConsAddr: "bcna" + "valcons",
            bech32PrefixConsPub: "bcna" + "valconspub",
        },
        currencies: [
            {
                coinDenom: "BCNA",
                coinMinimalDenom: "ubcna",
                coinDecimals: 6,
                coinGeckoId: "bitcanna",
            },
        ],
        feeCurrencies: [
            {
                coinDenom: "BCNA",
                coinMinimalDenom: "ubcna",
                coinDecimals: 6,
                coinGeckoId: "bitcanna",
            },
        ],
        stakeCurrency: {
            coinDenom: "BCNA",
            coinMinimalDenom: "ubcna",
            coinDecimals: 6,
            coinGeckoId: "bitcanna",
        },
        gasPriceStep: {
            low: 0.01,
            average: 0.025,
            high: 0.03,
        },
    }
}