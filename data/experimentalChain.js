export const chainObj = {
    "chain": {
        chainId: process.env.NEXT_PUBLIC_CHAIN_ID ? process.env.NEXT_PUBLIC_CHAIN_ID:"pylons-testnet-3",
        chainName: process.env.NEXT_PUBLIC_NAME ? process.env.NEXT_PUBLIC_NAME:"pylons",
        rpc: process.env.NEXT_PUBLIC_RPC ? process.env.NEXT_PUBLIC_RPC:"https://rpc.pylons.tech/",
        rest: process.env.NEXT_PUBLIC_API ? process.env.NEXT_PUBLIC_API:"https://lcd.pylons.tech/",
        bip44: {
            coinType: process.env.NEXT_PUBLIC_BIP44_COINTYPE,
        },
        bech32Config: {
            bech32PrefixAccAddr: process.env.NEXT_PUBLIC_BECH32_PREFIX_ACC_ADDR ? process.env.NEXT_PUBLIC_BECH32_PREFIX_ACC_ADDR:"pylo",
            bech32PrefixAccPub: process.env.NEXT_PUBLIC_BECH32_PREFIX_ACC_PUB ? process.env.NEXT_PUBLIC_BECH32_PREFIX_ACC_PUB:  "pylo" + "pub",
            bech32PrefixValAddr: process.env.NEXT_PUBLIC_BECH32_PREFIX_VAL_ADDR ? process.env.NEXT_PUBLIC_BECH32_PREFIX_VAL_ADDR :"pylo" + "valoper",
            bech32PrefixValPub: process.env.NEXT_PUBLIC_BECH32_PREFIX_VAL_PUB ? process.env.NEXT_PUBLIC_BECH32_PREFIX_VAL_PUB : "pylo" + "valoperpub",
            bech32PrefixConsAddr:process.env.NEXT_PUBLIC_BECH32_PREFIX_CONS_ADDR ? process.env.NEXT_PUBLIC_BECH32_PREFIX_CONS_ADDR:"pylo" + "valcons",
            bech32PrefixConsPub: process.env.NEXT_PUBLIC_BECH32_PREFIX_CONS_PUB ? process.env.NEXT_PUBLIC_BECH32_PREFIX_CONS_PUB:"pylo" + "valconspub",
        },
        currencies: [
            {
                coinDenom: process.env.NEXT_PUBLIC_COIN_DENOM ? process.env.NEXT_PUBLIC_COIN_DENOM:"BEDROCK" ,
                coinMinimalDenom: process.env.NEXT_PUBLIC_COIN_MINIMAL_DENOM ? process.env.NEXT_PUBLIC_COIN_MINIMAL_DENOM:"ubedrock",
                coinDecimals: process.env.NEXT_PUBLIC_COIN_DECIMALS ? process.env.NEXT_PUBLIC_COIN_DECIMALS :6,
                coinGeckoId: process.env.NEXT_PUBLIC_COIN_GECKO_ID ? process.env.NEXT_PUBLIC_COIN_GECKO_ID :"pylon",
            },
        ],
        feeCurrencies: [
            {
                coinDenom: process.env.NEXT_PUBLIC_COIN_DENOM ? process.env.NEXT_PUBLIC_COIN_DENOM:"BEDROCK" ,
                coinMinimalDenom: process.env.NEXT_PUBLIC_COIN_MINIMAL_DENOM ? process.env.NEXT_PUBLIC_COIN_MINIMAL_DENOM:"ubedrock",
                coinDecimals: process.env.NEXT_PUBLIC_COIN_DECIMALS ? process.env.NEXT_PUBLIC_COIN_DECIMALS :6,
                coinGeckoId: process.env.NEXT_PUBLIC_COIN_GECKO_ID ? process.env.NEXT_PUBLIC_COIN_GECKO_ID :"pylon",
            },
        ],
        stakeCurrency: {
            coinDenom: process.env.NEXT_PUBLIC_COIN_DENOM ? process.env.NEXT_PUBLIC_COIN_DENOM:"BEDROCK" ,
                coinMinimalDenom: process.env.NEXT_PUBLIC_COIN_MINIMAL_DENOM ? process.env.NEXT_PUBLIC_COIN_MINIMAL_DENOM:"ubedrock",
                coinDecimals: process.env.NEXT_PUBLIC_COIN_DECIMALS ? process.env.NEXT_PUBLIC_COIN_DECIMALS :6,
                coinGeckoId: process.env.NEXT_PUBLIC_COIN_GECKO_ID ? process.env.NEXT_PUBLIC_COIN_GECKO_ID :"pylon",
        },
        gasPriceStep: {
            GAS_PRICE_STEP_LOW: process.env.NEXT_PUBLIC_GAS_PRICE_STEP_LOW ? process.env.NEXT_PUBLIC_GAS_PRICE_STEP_LOW:0.01,
            GAS_PRICE_STEP_LOW: process.env.NEXT_PUBLIC_GAS_PRICE_STEP_MEDIUM ? process.env.NEXT_PUBLIC_GAS_PRICE_STEP_MEDIUM :0.025,
            GAS_PRICE_STEP_LOW: process.env.NEXT_PUBLIC_GAS_PRICE_STEP_HIGH ? process.env.NEXT_PUBLIC_GAS_PRICE_STEP_HIGH :0.03,
        },
    }
}