import { createMultisigThresholdPubkey, pubkeyToAddress, } from "@cosmjs/amino";
import axios from "axios";

export const createMultisigFromPubkeys = async (compressedPubkeys, threshold, prefix, components) => {
    try {
        let pubkeys = compressedPubkeys.map((compressedPubkey) => {
            return {
                type: "tendermint/PubKeySecp256k1",
                value: compressedPubkey,
            };
        });
        const multisigPubkey = createMultisigThresholdPubkey(pubkeys, threshold);
        const multisigAddress = pubkeyToAddress(multisigPubkey, prefix);

        const multisig = {
            address: multisigAddress,
            pubkeyJSON: JSON.stringify(multisigPubkey),
            components: components
        };
        const res = await axios.post("/api/multisig", multisig);
        return res.data.address;
    } catch (e) {
        throw e;
    }
}

export const getMultisigFromAddress = async (address) => {
    try {
        const res = await axios.post(`/api/multisig/${address}`, { address })
        return res.data
    } catch (e) {
        throw e
    }
}