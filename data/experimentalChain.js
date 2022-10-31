export const chainObj = {
    "chain": {
        chainId: process.env.NEXT_PUBLIC_CHAIN_ID,
        chainName: process.env.NEXT_PUBLIC_NAME ,
        rpc: process.env.NEXT_PUBLIC_RPC,
        rest: process.env.NEXT_PUBLIC_API,
        bip44: {
            coinType: process.env.NEXT_PUBLIC_BIP44_COINTYPE,
        },
        bech32Config: {
            bech32PrefixAccAddr: process.env.NEXT_PUBLIC_BECH32_PREFIX_ACC_ADDR,
            bech32PrefixAccPub: process.env.NEXT_PUBLIC_BECH32_PREFIX_ACC_PUB,
            bech32PrefixValAddr: process.env.NEXT_PUBLIC_BECH32_PREFIX_VAL_ADDR,
            bech32PrefixValPub: process.env.NEXT_PUBLIC_BECH32_PREFIX_VAL_PUB,
            bech32PrefixConsAddr:process.env.NEXT_PUBLIC_BECH32_PREFIX_CONS_ADDR,
            bech32PrefixConsPub: process.env.NEXT_PUBLIC_BECH32_PREFIX_CONS_PUB,
        },
        currencies: [
            {
                coinDenom: process.env.NEXT_PUBLIC_COIN_DENOM,
                coinMinimalDenom: process.env.NEXT_PUBLIC_COIN_MINIMAL_DENOM,
                coinDecimals: process.env.NEXT_PUBLIC_COIN_DECIMALS,
                coinGeckoId: process.env.NEXT_PUBLIC_COIN_GECKO_ID,
            },
        ],
        feeCurrencies: [
            {
                coinDenom: process.env.NEXT_PUBLIC_COIN_DENOM,
                coinMinimalDenom: process.env.NEXT_PUBLIC_COIN_MINIMAL_DENOM,
                coinDecimals: process.env.NEXT_PUBLIC_COIN_DECIMALS,
                coinGeckoId: process.env.NEXT_PUBLIC_COIN_GECKO_ID,
            },
        ],
        stakeCurrency: {
            coinDenom: process.env.NEXT_PUBLIC_COIN_DENOM,
            coinMinimalDenom: process.env.NEXT_PUBLIC_COIN_MINIMAL_DENOM,
            coinDecimals: process.env.NEXT_PUBLIC_COIN_DECIMALS,
            coinGeckoId: process.env.NEXT_PUBLIC_COIN_GECKO_ID,
        },
        gasPriceStep: {
            GAS_PRICE_STEP_LOW: process.env.NEXT_PUBLIC_GAS_PRICE_STEP_LOW,
            GAS_PRICE_STEP_LOW:process.env.NEXT_PUBLIC_GAS_PRICE_STEP_MEDIUM,
            GAS_PRICE_STEP_LOW: process.env.NEXT_PUBLIC_GAS_PRICE_STEP_HIGH,
        },
    }
}