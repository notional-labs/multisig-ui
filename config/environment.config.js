import { string, object, number,addMethod } from "yup";
import getConfig from 'next/config'

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()

/**
 * convert empty string to undefined .
 *
 * Reason:
 * This help prevents the string enviorment variable to set to empty,
 * and taking default value.
 */
addMethod(string, 'stripEmptyString', function () {
  return this.transform((value) => (value === '' ? undefined : value));
});

/**
 * convert empty string to undefined .
 *
 * Reason:
 * This help prevents the enviorment number variable to set to empty,
 * and taking default value.
 */
 addMethod(number, 'stripEmptyString', function () {

  return this.transform((value) => (isNaN(value) || value === '' ? undefined : value));

});

/**
 * contains all the validated environment variables.
 *
 * Reason:
 * This help prevents the application to start without environment variables. If not used you may still find the
 * error but a bit late.
 */
export const environment = object()
  .shape({
    funadbSecret:string().stripEmptyString(),
    publicHost: string().stripEmptyString().default('http://localhost:3000/'),
    chainid: string().stripEmptyString().default('pylons-testnet-3'),
    chainname: string().stripEmptyString().default('pylons'),
    rpc: string().stripEmptyString().default('https://rpc.pylons.tech'),
    rest: string().stripEmptyString().default('https://lcd.pylons.tech/'),
    bip44cointype: number().stripEmptyString().default(118),
    bech32prefixaccaddr: string().stripEmptyString().default('pylo'),
    bech32prefixaccpub: string().stripEmptyString().default('pylo'+'pub'),
    bech32prefixvaladdr: string().stripEmptyString().default('pylo'+'valoper'),
    bech32prefixvalpub: string().stripEmptyString().default('pylo'+'valoperpub'),
    bech32prefixconsaddr: string().stripEmptyString().default('pylo'+'valcons'),
    bech32prefixconspub: string().stripEmptyString().default('pylo'+'valconspub'),
    currenciescoindenom: string().stripEmptyString().default('BEDROCK'),
    currenciescoinminimaldenom: string().stripEmptyString().default('ubedrock'),
    currenciescoindecimals: number().stripEmptyString().default(6),
    currenciescoingeckoid: string().stripEmptyString().default('pylon'),
    feecurrenciescoindenom: string().stripEmptyString().default('BEDROCK'),
    feecurrenciescoinminimaldenom: string().stripEmptyString().default('ubedrock'),
    feecurrenciescoindecimals: number().stripEmptyString().default(6),
    feecurrenciescoingeckoid: string().stripEmptyString().default('pylon'),
    stakecurrencycoindenom: string().stripEmptyString().default('BEDROCK'),
    stakecurrencycoinminimaldenom: string().stripEmptyString().default('ubedrock'),
    stakecurrencycoindecimals: number().stripEmptyString().default(6),
    stakecurrencycoingeckoid: string().stripEmptyString().default('pylon'),
    gaspricesteplow: number().stripEmptyString().default(0.01),
    gaspricestepmedium: number().stripEmptyString().default(0.025),
    gaspricestephigh: number().stripEmptyString().default(0.03),
    gaspricestepaverage: number().stripEmptyString().default(0.03),
    denom: string().stripEmptyString().default('ubedrock'),
    displayDenom:string().stripEmptyString().default('bedrock'),
    baseDenom:string().stripEmptyString().default('ubedrock'),
    baseExponent: number().stripEmptyString().default(6),
    supportedDenom: string().stripEmptyString().default("BEDROCK,PYLON,STRIPEUSD"),
    supportedDenomDisplay: string().stripEmptyString().default("ubedrock,upylon,ustripeusd"),
    name: string().stripEmptyString().default('pylons'),
    prefix: string().stripEmptyString().default('pylo'),
    color: string().stripEmptyString().default('linear-gradient(to right, #ef4421,#0a0049 81%)'),
    explorer: string().stripEmptyString().default('https://pylons.explorers.guru/'),
    txExplorer: string().stripEmptyString().default('https://pylons.explorers.guru/transaction/'),
    valExplorer: string().stripEmptyString().default('https://pylons.explorers.guru/validator/'),
    govExplorer: string().stripEmptyString().default('https://pylons.explorers.guru/proposal/'),
    logo: string().stripEmptyString().default('/images/logo/pylons.png'),
    hyperLink: string().stripEmptyString().default('https://www.pylons.tech/home/')
  })
  .validateSync({
    funadbSecret: serverRuntimeConfig.funadbSecret,
    publicHost: process.env.NEXT_PUBLIC_HOST,
    chainid: process.env.NEXT_PUBLIC_CHAIN_ID,
    chainname: process.env.NEXT_PUBLIC_CHAIN_NAME,
    rpc: process.env.NEXT_PUBLIC_RPC,
    rest: process.env.NEXT_PUBLIC_REST,
    bip44cointype: process.env.NEXT_PUBLIC_BIP44_COINTYPE,
    bech32prefixaccaddr: process.env.NEXT_PUBLIC_BECH32_PREFIX_ACC_ADDR,
    bech32prefixaccpub: process.env.NEXT_PUBLIC_BECH32_PREFIX_ACC_PUB,
    bech32prefixvaladdr: process.env.NEXT_PUBLIC_BECH32_PREFIX_VAL_ADDR,
    bech32prefixvalpub: process.env.NEXT_PUBLIC_BECH32_PREFIX_VAL_PUB,
    bech32prefixconsaddr: process.env.NEXT_PUBLIC_BECH32_PREFIX_CONS_ADDR,
    bech32prefixconspub: process.env.NEXT_PUBLIC_BECH32_PREFIX_CONS_PUB,
    currenciescoindenom: process.env.NEXT_PUBLIC_CURRENCIES_COIN_DENOM,
    currenciescoinminimaldenom: process.env.NEXT_PUBLIC_CURRENCIES_COIN_MINIMAL_DENOM,
    currenciescoindecimals: process.env.NEXT_PUBLIC_CURRENCIES_COIN_DECIMALS,
    currenciescoingeckoid: process.env.NEXT_PUBLIC_CURRENCIES_COIN_GECKO_ID,
    feecurrenciescoindenom: process.env.NEXT_PUBLIC_FEE_CURRENCIES_COIN_DENOM,
    feecurrenciescoinminimaldenom: process.env.NEXT_PUBLIC_FEE_CURRENCIES_COIN_MINIMAL_DENOM,
    feecurrenciescoindecimals: process.env.NEXT_PUBLIC_FEE_CURRENCIES_COIN_DECIMALS,
    feecurrenciescoingeckoid: process.env.NEXT_PUBLIC_FEE_CURRENCIES_COIN_GECKO_ID,
    stakecurrencycoindenom: process.env.NEXT_PUBLIC_STAKE_CURRENCY_COIN_DENOM,
    stakecurrencycoinminimaldenom: process.env.NEXT_PUBLIC_STAKE_CURRENCY_COIN_MINIMAL_DENOM,
    stakecurrencycoindecimals: process.env.NEXT_PUBLIC_STAKE_CURRENCY_COIN_DECIMALS,
    stakecurrencycoingeckoid: process.env.NEXT_PUBLIC_STAKE_CURRENCY_COIN_GECKO_ID,
    gaspricesteplow: process.env.NEXT_PUBLIC_GAS_PRICE_STEP_LOW,
    gaspricestepmedium: process.env.NEXT_PUBLIC_GAS_PRICE_STEP_MEDIUM,
    gaspricestephigh: process.env.NEXT_PUBLIC_GAS_PRICE_STEP_HIGH,
    gaspricestepaverage: process.env.NEXT_PUBLIC_GAS_PRICE_STEP_AVERAGE,
    denom: process.env.NEXT_PUBLIC_DENOM,
    displayDenom: process.env.NEXT_PUBLIC_DISPLAY_DENOM,
    baseDenom: process.env.NEXT_PUBLIC_BASE_DENOM,
    baseExponent: process.env.NEXT_PUBLIC_BASE_EXPONENT,
    name: process.env.NEXT_PUBLIC_NAME,
    prefix: process.env.NEXT_PUBLIC_PREFIX,
    color: process.env.NEXT_PUBLIC_COLOR,
    explorer: process.env.NEXT_PUBLIC_EXPLORER,
    txExplorer: process.env.NEXT_PUBLIC_TX_EXPLORER,
    valExplorer: process.env.NEXT_PUBLIC_VAL_EXPLORER,
    govExplorer: process.env.NEXT_PUBLIC_GOV_EXPLORER,
    logo: process.env.NEXT_PUBLIC_LOGO,
    hyperLink: process.env.NEXT_PUBLIC_HYPERLINK,
    supportedDenom: process.env.NEXT_PUBLIC_SUPPORTED_DENOM,
    supportedDenomDisplay: process.env.NEXT_PUBLIC_SUPPORTED_DENOM_DISPLAY,
  });
