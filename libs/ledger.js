import { LedgerSigner } from "@cosmjs/ledger-amino"
import TransportWebUSB from "@ledgerhq/hw-transport-webusb"

export const getLedgerAccount = async () => {
    try{
        const transport = await TransportWebUSB.create();
        const signer = new LedgerSigner(transport)

        const accounts = await signer.getAccounts()
        console.log(accounts)
        return accounts
    }
    catch (e) {
        throw e
    }
}

export const getLedgerSigner = async () => {
    try{
        const transport = await TransportWebUSB.create();
        const signer = new LedgerSigner(transport)

        console.log(signer)
        return signer
    }
    catch (e) {
        throw e
    }
}