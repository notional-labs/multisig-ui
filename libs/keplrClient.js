import { StargateClient } from "@cosmjs/stargate";
import axios from "axios";
import { getMultisigFromAddress } from "./multisig";
import { chainObj } from "../data/experimentalChain";
import { checkIfVestedAccount, checkEthermintAcccount } from "./checkTool";

export const getKeplrAccount = async (chainId) => {
    try {
        if (!window.getOfflineSigner || !window.keplr) {
            alert("Keplr Wallet not detected, please install extension");
            throw new Error("Keplr not found")
        } else {
            await window.keplr.enable(chainId)
            const offlineSigner = window.keplr.getOfflineSigner(chainId);
            const accounts = await offlineSigner.getAccounts();
            return {
                accounts,
                offlineSigner,
            };
        }
    }
    catch (e) {
        alert(e.message)
        throw e
    }
}

export const getKey = async (chainId) => {
    try {
        if (!window.getOfflineSigner || !window.keplr) {
            alert("Keplr Wallet not detected, please install extension");
            throw new Error("Keplr not found")
        } else {
            // try {
            //     await window.keplr.enable(chainId)
            // }
            // catch (e) {
                const experimentalChain = chainObj[15]
                // if (!experimentalChain) throw e
                await window.keplr.experimentalSuggestChain({
                    // Chain-id of the Cosmos SDK chain.
                    chainId: "test-1",
                    // The name of the chain to be displayed to the user.
                    chainName: "Testnet",
                    // RPC endpoint of the chain.
                    rpc: "http://localhost:26657",
                    // REST endpoint of the chain.
                    rest: "http://localhost:1317",
                    // Staking coin information
                    // (Currently, Keplr doesn't have the UI that shows multiple tokens, therefore this uses the SHELL token as the primary token althought SHELL is not a staking coin.)
                    stakeCurrency: {
                        // Coin denomination to be displayed to the user.
                        coinDenom: "whale",
                        // Actual denom (i.e. uatom, uscrt) used by the blockchain.
                        coinMinimalDenom: "uwhale",
                        // # of decimal points to convert minimal denomination to user-facing denomination.
                        coinDecimals: 6,
                        // (Optional) Keplr can show the fiat value of the coin if a coingecko id is provided.
                        // You can get id from https://api.coingecko.com/api/v3/coins/list if it is listed.
                        // coinGeckoId: ""
                    },
                    // (Optional) If you have a wallet webpage used to stake the coin then provide the url to the website in `walletUrlForStaking`.
                    // The 'stake' button in Keplr extension will link to the webpage.
                    // walletUrlForStaking: "",
                    // The BIP44 path.
                    bip44: {
                        // You can only set the coin type of BIP44.
                        // 'Purpose' is fixed to 44.
                        coinType: 118,
                    },
                    // Bech32 configuration to show the address to user.
                    // This field is the interface of
                    // {
                    //   bech32PrefixAccAddr: string;
                    //   bech32PrefixAccPub: string;
                    //   bech32PrefixValAddr: string;
                    //   bech32PrefixValPub: string;
                    //   bech32PrefixConsAddr: string;
                    //   bech32PrefixConsPub: string;
                    // }
                    "bech32Config": {
                        "bech32PrefixAccAddr": "migaloo",
                        "bech32PrefixAccPub": "migaloopub",
                        "bech32PrefixValAddr": "migaloovaloper",
                        "bech32PrefixValPub": "migaloovaloperpub",
                        "bech32PrefixConsAddr": "migaloovalcons",
                        "bech32PrefixConsPub": "migaloovalconspub"
                      },
                    // List of all coin/tokens used in this chain.
                    currencies: [{
                        // Coin denomination to be displayed to the user.
                        coinDenom: "whale",
                        // Actual denom (i.e. uatom, uscrt) used by the blockchain.
                        coinMinimalDenom: "uwhale",
                        // # of decimal points to convert minimal denomination to user-facing denomination.
                        coinDecimals: 6,
                        // (Optional) Keplr can show the fiat value of the coin if a coingecko id is provided.
                        // You can get id from https://api.coingecko.com/api/v3/coins/list if it is listed.
                        // coinGeckoId: ""
                    }],
                    // List of coin/tokens used as a fee token in this chain.
                    feeCurrencies: [{
                        // Coin denomination to be displayed to the user.
                        coinDenom: "whale",
                        // Actual denom (i.e. uatom, uscrt) used by the blockchain.
                        coinMinimalDenom: "uwhale",
                        // # of decimal points to convert minimal denomination to user-facing denomination.
                        coinDecimals: 6,
                        // (Optional) Keplr can show the fiat value of the coin if a coingecko id is provided.
                        // You can get id from https://api.coingecko.com/api/v3/coins/list if it is listed.
                        // coinGeckoId: ""
                    }],
                    // (Optional) The number of the coin type.
                    // This field is only used to fetch the address from ENS.
                    // Ideally, it is recommended to be the same with BIP44 path's coin type.
                    // However, some early chains may choose to use the Cosmos Hub BIP44 path of '118'.
                    // So, this is separated to support such chains.
                    // coinType: 118,
                    // (Optional) This is used to set the fee of the transaction.
                    // If this field is not provided, Keplr extension will set the default gas price as (low: 0.01, average: 0.025, high: 0.04).
                    // Currently, Keplr doesn't support dynamic calculation of the gas prices based on on-chain data.
                    // Make sure that the gas prices are higher than the minimum gas prices accepted by chain validators and RPC/REST endpoint.
                    gasPriceStep: {
                        low: 0.025,
                        average: 0.03,
                        high: 0.04
                    }
                })
            // }
            const account = await window.keplr.getKey(chainId);
            return account
        }
    }
    catch (e) {
        throw e
    }
}

export const getPubkey = async (rpc, address) => {
    const client = await StargateClient.connect(rpc);
    const accountOnChain = await client.getAccount(address);
    if (!accountOnChain || !accountOnChain.pubkey) {
        throw new Error(
            "Account has no pubkey on chain, this address will need to send a transaction to appear on chain."
        );
    }
    return accountOnChain.pubkey.value;
};

export const getBalance = async (rpc, address) => {
    const client = await StargateClient.connect(rpc);
    const res = await client.getAllBalances(address)
    return res;
}

export const getBalances = async (api, address) => {
    const { data } = await axios.get(`${api}cosmos/bank/v1beta1/balances/${address}`)
    const balances = data.balances ? data.balances : []
    return balances.reverse()
}

export const getAccount = async (rpc, address) => {
    const client = await StargateClient.connect(rpc);
    try {
        let account = await client.getAccount(address);

        if (!account) {
            throw new Error(
                "Multisig Account has no pubkey on chain, this address will need to send a transaction to appear on chain."
                + "\n" + "(If it is newly made address please make sure to send some token to this address )"
            );
        }
        else if (!account.pubkey) {
            const res = await getMultisigFromAddress(address)

            if (!res) {
                throw new Error(
                    "Multisig was not created using this tool."
                );
            }
            const pubkey = JSON.parse(res.pubkeyJSON);

            account.pubkey = pubkey;
        }
        return account;
    }
    catch (e) {
        throw new Error(e.message)
    }
}

export const getPubkeyByAPI = async (api, address) => {
    try {
        const { data } = await axios.get(`${api}cosmos/auth/v1beta1/accounts/${address}`)
        const accountOnChain = data.account
        if (!accountOnChain || !accountOnChain.pub_key) {
            throw new Error(
                "Account has no pubkey on chain, this address will need to send a transaction to appear on chain."
            );
        }

        if (checkIfVestedAccount(accountOnChain)) {
            if ( !accountOnChain.base_vesting_account.base_account.pub_key ) {
                throw new Error(
                    "Account has no pubkey on chain, this address will need to send a transaction to appear on chain."
                );
            }
            return accountOnChain.base_vesting_account.base_account.pub_key.key
        }

        if (checkEthermintAcccount(accountOnChain)) {
            if ( !accountOnChain.base_account.pub_key ) {
                throw new Error(
                    "Account has no pubkey on chain, this address will need to send a transaction to appear on chain."
                );
            }
            return accountOnChain.base_account.pub_key.key
        }


        return accountOnChain.pub_key.key;
    }
    catch (e) {
        if (e.code === "ERR_BAD_REQUEST" || e.code === "ERR_NETWORK") {
            throw new Error(
                "Account has no pubkey on chain, this address will need to send a transaction to appear on chain."
            )
        }
        throw e
    }
}

export const getMultisigAccountByAPI = async (api, address) => {
    try {
        const { data } = await axios.get(`${api}cosmos/auth/v1beta1/accounts/${address}`)
        let accountOnChain = data.account


        if (!accountOnChain) {
            throw new Error(
                "Account not found, make sure to use the correct address"
            );
        }

        if (checkIfVestedAccount(accountOnChain)) {
            return accountOnChain.base_vesting_account.base_account
        }

        if (checkEthermintAcccount(accountOnChain)) {
            return accountOnChain.base_account
        }
        return accountOnChain;
    }
    catch (e) {
        if (e.code === "ERR_BAD_REQUEST" || e.code === "ERR_NETWORK") {
            throw new Error(
                "Account has no pubkey on chain, this address will need to send a transaction to appear on chain."
            )
        }
        throw e
    }
}

export const getSequence = async (api, address) => {
    try {
        let { data } = await axios.get(`${api}cosmos/auth/v1beta1/accounts/${address}`, {
            "Cache-Control": "no-cache",
            "Pragma": "no-cache",
            "Expires": "0",
        })

        if (!data.account) {
            throw new Error(
                "Multisig Account has no pubkey on chain, this address will need to send a transaction to appear on chain."
                + "\n" + "(If it is newly made address please make sure to send some token to this address )"
            );
        }

        if (checkIfVestedAccount(data.account)) {
            return data.account.base_vesting_account.base_account
        }

        if (checkEthermintAcccount(data.account)) {
            return data.account.base_account
        }
        return data.account;
    }
    catch (e) {
        if (e.code === "ERR_BAD_REQUEST" || e.code === "ERR_NETWORK") {
            throw new Error(
                "Multisig Account has no pubkey on chain, this address will need to send a transaction to appear on chain."
            )
        }
        throw e
    }
}
