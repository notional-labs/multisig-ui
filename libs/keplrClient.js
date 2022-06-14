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