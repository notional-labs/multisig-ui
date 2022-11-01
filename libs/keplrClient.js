import { StargateClient } from "@cosmjs/stargate";
import axios from "axios";
import { getMultisigFromAddress } from "./multisig";
import { getExperimentalChainDataById } from "../utils/common";

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
            try {
                await window.keplr.enable(chainId)
            }
            catch (e) {
                const experimentalChain = getExperimentalChainDataById(chainId)
                if (!experimentalChain) throw e
                await window.keplr.experimentalSuggestChain(experimentalChain)
            }
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
    console.log(res)
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
