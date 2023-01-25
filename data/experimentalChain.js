import { environment } from "../config/environment.config";
export const chainObj = [{
  chainId: environment.chainid,
  chainName: environment.chainname,
  rpc: environment.rpc,
  rest: environment.rest,
  bip44: {
    coinType: environment.bip44cointype,
  },
  bech32Config: {
    bech32PrefixAccAddr: environment.bech32prefixaccaddr,
    bech32PrefixAccPub: environment.bech32prefixaccpub,
    bech32PrefixValAddr: environment.bech32prefixvaladdr,
    bech32PrefixValPub: environment.bech32prefixvalpub,
    bech32PrefixConsAddr: environment.bech32prefixconsaddr,
    bech32PrefixConsPub: environment.bech32prefixconspub,
  },
  currencies: [
    {
      coinDenom: environment.currenciescoindenom,
      coinMinimalDenom: environment.currenciescoinminimaldenom,
      coinDecimals: environment.currenciescoindecimals,
      coinGeckoId: environment.currenciescoingeckoid,
    },
  ],
  feeCurrencies: [
    {
      coinDenom: environment.feecurrenciescoindenom,
      coinMinimalDenom: environment.feecurrenciescoinminimaldenom,
      coinDecimals: environment.feecurrenciescoindecimals,
      coinGeckoId: environment.feecurrenciescoingeckoid,
      gasPriceStep: {
        low: environment.gaspricesteplow,
        medium: environment.gaspricestepmedium,
        high: environment.gaspricestephigh,
        average: environment.gaspricestepaverage,
      },
    },
  ],
  stakeCurrency: {
    coinDenom: environment.stakecurrencycoindenom,
    coinMinimalDenom: environment.stakecurrencycoinminimaldenom,
    coinDecimals: environment.stakecurrencycoindecimals,
    coinGeckoId: environment.stakecurrencycoingeckoid,
  },
  gasPriceStep: {
    low: environment.gaspricesteplow,
    medium: environment.gaspricestepmedium,
    high: environment.gaspricestephigh,
  },
  "gravity-bridge-3": {
    chainId: "gravity-bridge-3",
    chainName: "gravity bridge",
    rpc: "https://rpc-gravitybridge-ia.cosmosia.notional.ventures/",
    rest: "https://api-gravitybridge-ia.cosmosia.notional.ventures/",
    bip44: {
      coinType: 118,
    },
    bech32Config: {
      bech32PrefixAccAddr: "gravity",
      bech32PrefixAccPub: "gravity" + "pub",
      bech32PrefixValAddr: "gravity" + "valoper",
      bech32PrefixValPub: "gravity" + "valoperpub",
      bech32PrefixConsAddr: "gravity" + "valcons",
      bech32PrefixConsPub: "gravity" + "valconspub",
    },
    currencies: [
      {
        coinDenom: "GRAVITON",
        coinMinimalDenom: "ugraviton",
        coinDecimals: 6,
        coinGeckoId: "graviton",
      },
    ],
    feeCurrencies: [
      {
        coinDenom: "GRAVITON",
        coinMinimalDenom: "ugraviton",
        coinDecimals: 6,
        coinGeckoId: "graviton",
      },
    ],
    stakeCurrency: {
      coinDenom: "GRAVITON",
      coinMinimalDenom: "ugraviton",
      coinDecimals: 6,
      coinGeckoId: "graviton",
    },
    gasPriceStep: {
      low: 0.01,
      average: 0.025,
      high: 0.03,
    },
  },
  "evmos_9001-2": {
    chainId: "evmos_9001-2",
    chainName: "evmos",
    rpc: "https://rpc-evmos-ia.cosmosia.notional.ventures/",
    rest: "https://api-evmos-ia.cosmosia.notional.ventures/",
    bip44: {
      coinType: 118,
    },
    bech32Config: {
      bech32PrefixAccAddr: "evmos",
      bech32PrefixAccPub: "evmos" + "pub",
      bech32PrefixValAddr: "evmos" + "valoper",
      bech32PrefixValPub: "evmos" + "valoperpub",
      bech32PrefixConsAddr: "evmos" + "valcons",
      bech32PrefixConsPub: "evmos" + "valconspub",
    },
    currencies: [
      {
        coinDenom: "EVMOS",
        coinMinimalDenom: "aevmos",
        coinDecimals: 18,
        coinGeckoId: "evmos",
      },
    ],
    feeCurrencies: [
      {
        coinDenom: "EVMOS",
        coinMinimalDenom: "aevmos",
        coinDecimals: 18,
        coinGeckoId: "evmos",
      },
    ],
    stakeCurrency: {
      coinDenom: "EVMOS",
      coinMinimalDenom: "aevmos",
      coinDecimals: 18,
      coinGeckoId: "evmos",
    },
    gasPriceStep: {
      low: 0.01,
      average: 0.025,
      high: 0.03,
    },
  }
}
