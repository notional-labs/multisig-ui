import { StargateClient } from "@cosmjs/stargate";

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
        accounts.chain = process.env.REACT_APP_CHAIN_ID
        return {
            accounts,
            offlineSigner,
        };
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
    console.log(address, denom)
    const client = await StargateClient.connect(rpc);
    const balance = await client.getBalance(address, denom);
    return balance;
}