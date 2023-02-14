import { createMultisigThresholdPubkey, pubkeyToAddress, } from "@cosmjs/amino";
import axios from "axios";

export const createMultisigFromPubkeys = async (compressedPubkeys, threshold, prefix, components,) => {
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
            components: components,
            prefix: prefix
        };
        const check = await checkIfMultisigExist(multisigAddress)
        if (check) throw new Error("This multisig already exist, maybe try add more component addresses or change the current components")
        const res = await axios.post("/api/multisig", multisig);
        return res.data.address;
    } catch (e) {
        throw e;
    }
}

export const importMultisigFromPubkeys = async (compressedPubkeys, threshold, prefix, components, address) => {
    try {
        let pubkeys = compressedPubkeys.map((compressedPubkey) => {
            return {
                type: "tendermint/PubKeySecp256k1",
                value: compressedPubkey,
            };
        });
        const multisigPubkey = createMultisigThresholdPubkey(pubkeys, threshold);

        const multisig = {
            address: address,
            pubkeyJSON: JSON.stringify(multisigPubkey),
            components: components,
            prefix: prefix
        };
        const check = await checkIfMultisigExist(address)
        if (check) throw new Error("This multisig already exist, maybe try add more component addresses or change the current components")
        const res = await axios.post("/api/multisig", multisig);
        return res.data.address;
    } catch (e) {
        throw e;
    }
}


export const getMultisigFromAddress = async (address) => {
    try {
        const res = await axios.post(`/api/multisig/${address}`, { address })
        if(!res.data || res.data === null) {
            throw new Error("This address might not be created using this tool !")
        }
        return res.data
    } catch (e) {
        throw e
    }
}

export const getAllMultisigOfAddress = async (address) => {
    try {
        const res = await axios.post(`/api/multisig/all-multisig`, { address })
        return res.data
    } catch (e) {
        throw e
    }
}

export const checkIfMultisigExist = async (address) => {
    const res = await axios.post(`/api/multisig/${address}`, { address })
    return (res.data)
}