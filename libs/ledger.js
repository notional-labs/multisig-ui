import { LedgerSigner } from "@cosmjs/ledger-amino"
import TransportWebUSB from "@ledgerhq/hw-transport-webusb"

export const getLedgerAccount = async (prefix) => {
    try{
        const transport = await TransportWebUSB.create();
        const signer = new LedgerSigner(transport, {prefix: prefix})

        const accounts = await signer.getAccounts()
        return accounts && accounts.length > 0 && accounts[0]
    }
    catch (e) {
        throw e
    }
}

export const getLedgerSigner = async (prefix) => {
    try{
        const transport = await TransportWebUSB.create();
        const signer = new LedgerSigner(transport, {prefix: prefix})

        return signer
    }
    catch (e) {
        throw e
    }
}