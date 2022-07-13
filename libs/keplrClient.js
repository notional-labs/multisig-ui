import { StargateClient } from "@cosmjs/stargate";
import axios from "axios";
import { getMultisigFromAddress } from "./multisig";

export const getKeplrAccount = async (chainId) => {
    if (!window.getOfflineSigner || !window.keplr) {
        alert("Keplr Wallet not detected, please install extension");
        return {
            accounts: null
        }
    } else {
        // await window.keplr.experimentalSuggestChain(anoneTestnetChain)
        await window.keplr.enable(chainId)
        const offlineSigner = window.keplr.getOfflineSigner(chainId);
        const accounts = await offlineSigner.getAccounts();
        return {
            accounts,
            offlineSigner,
        };
    }
}

export const getKey = async (chainId) => {
    if (!window.getOfflineSigner || !window.keplr) {
        alert("Keplr Wallet not detected, please install extension");
        return null
    } else {
        // await window.keplr.experimentalSuggestChain(anoneTestnetChain)
        await window.keplr.enable(chainId)
        const account = await window.keplr.getKey(chainId);
        return account
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

export const getBalance = async (rpc, address, denom) => {
    const client = await StargateClient.connect(rpc);
    const res = await client.getAllBalances(address)
    return res;
}

export const getAccount = async (rpc, address) => {
    const client = await StargateClient.connect(rpc);
    try {
        let account = await client.getAccount(address);

        console.log(account)

        if (!account) {
            throw new Error(
                "Account has no pubkey on chain, this address will need to send a transaction to appear on chain. (If it is newly made address please make sure to send some token to this address )"
            );
        }
        else if (!account.pubkey) {
            const res = await getMultisigFromAddress(address)
            console.log(res)

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

export const getSequence = async (api, address) => {
    try {
        let { data } = await axios.get(`${api}cosmos/auth/v1beta1/accounts/${address}`, {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
            'Expires': '0',
          })

        if (!data.account) {
            throw new Error(
                "Account has no pubkey on chain, this address will need to send a transaction to appear on chain. (If it is newly made address please make sure to send some token to this address )"
            );
        }
        return data.account;
    }
    catch (e) {
        throw new Error(e.message)
    }
}