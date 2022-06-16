import { createMultisigThresholdPubkey, pubkeyToAddress, } from "@cosmjs/amino";

export const createMultisigFromPubkeys = async (compressedPubkeys, threshold, prefix) => {
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
        };
        const res = await axios.post("/api/multisig", multisig);
        return res.data.address;
    } catch (error) {
        throw error;
    }
}