import { createMultisigThresholdPubkey, pubkeyToAddress, } from "@cosmjs/amino";
import axios from "axios";

export const createMultisigFromPubkeys = async (compressedPubkeys, threshold, prefix, components,) => {
    // eslint-disable-next-line no-useless-catch
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
        const res = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/multisig/create`, multisig);
        return res.data.address;
    } catch (e) {
        throw e;
    }
}

export const importMultisigFromPubkeys = async (compressedPubkeys, threshold, prefix, components, address) => {
    // eslint-disable-next-line no-useless-catch
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
        const res = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/multisig/create`, multisig);
        return res.data.address;
    } catch (e) {
        throw e;
    }
}


export const getMultisigFromAddress = async (address) => {
    // eslint-disable-next-line no-useless-catch
    try {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/multisig`, { address })
        if(!res.data || res.data === null) {
            throw new Error("This address might not be created using this tool !")
        }
        return res.data
    } catch (e) {
        throw e
    }
}

export const getAllMultisigOfAddress = async (address) => {
    // eslint-disable-next-line no-useless-catch
    try {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/multisig/all-multisig`, { address })
        return res.data
    } catch (e) {
        throw e
    }
}

export const checkIfMultisigExist = async (address) => {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/multisig`, { address })
    return (res.data)
}