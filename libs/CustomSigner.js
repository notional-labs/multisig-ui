import {
    AminoTypes,
    SigningStargateClient,
    defaultRegistryTypes
} from '@cosmjs/stargate';
import { Registry } from '@cosmjs/proto-signing';
import * as multisigjs from 'multisigjs'
import * as stridejs from 'stridejs'
import { MsgTransfer } from "cosmjs-types/ibc/applications/transfer/v1/tx";
import Long from "long";

function omitDefault(input) {
    if (typeof input === "string") {
        return input === "" ? undefined : input;
    }

    if (typeof input === "number") {
        return input === 0 ? undefined : input;
    }

    if (Long.isLong(input)) {
        return input.isZero() ? undefined : input;
    }

    throw new Error(`Got unsupported type '${typeof input}'`);
}

export const getCustomClient = async (types, signer) => {
    // registry
    const registry = new Registry(defaultRegistryTypes);
    const uniqTypes = [...new Set(types)]

    // filter types from default registry
    uniqTypes.filter(type => {
        const filter = defaultRegistryTypes.filter(registry => {
            registry[0] === type
        })
        if (filter.length > 0) {
            return true
        }
        return false
    })
    let aminoConverters

    if (signer.chainId === 'stride-1') {
        // get amino converter from each types
        aminoConverters = uniqTypes.map(t => {
            let type = t.slice(1, t.length)
            const splitType = type.split(".")
            splitType.pop()
            let value = stridejs
            splitType.forEach(element => {
                if (value[element] !== null) {
                    value = value[element]
                }
            });
            value && value.load && typeof value.load === 'function' && value.load(registry)
            return value ? value.AminoConverter : {}
        })
    }
    else {
        // get amino converter from each types
        aminoConverters = uniqTypes.map(t => {
            let type = t.slice(1, t.length)
            const splitType = type.split(".")
            splitType.pop()
            let value = multisigjs
            splitType.forEach(element => {
                if (value[element] !== null) {
                    value = value[element]
                }
            });
            value && value.load && typeof value.load === 'function' && value.load(registry)
            return value ? value.AminoConverter : {}
        })
    }

    var animoObjs = Object.assign({}, ...aminoConverters);

    // aminotypes
    let aminoTypes = new AminoTypes({ ...animoObjs })

    // fix memo missing in amino converter in cosmjs
    aminoTypes.register['/ibc.applications.transfer.v1.MsgTransfer'] = {
        aminoType: 'cosmos-sdk/MsgTransfer',
        toAmino: ({
            sourcePort,
            sourceChannel,
            token,
            sender,
            receiver,
            timeoutHeight,
            timeoutTimestamp,
            memo,
        }) => ({
            source_port: sourcePort,
            source_channel: sourceChannel,
            token: token,
            sender: sender,
            receiver: receiver,
            timeout_height: timeoutHeight
                ? {
                    revision_height: omitDefault(timeoutHeight.revisionHeight)?.toString(),
                    revision_number: omitDefault(timeoutHeight.revisionNumber)?.toString(),
                }
                : {},
            timeout_timestamp: omitDefault(timeoutTimestamp)?.toString(),
            memo: memo,
        }),
        fromAmino: ({
            source_port,
            source_channel,
            token,
            sender,
            receiver,
            timeout_height,
            timeout_timestamp,
            memo,
        }) =>
            MsgTransfer.fromPartial({
                sourcePort: source_port,
                sourceChannel: source_channel,
                token: token,
                sender: sender,
                receiver: receiver,
                timeoutHeight: timeout_height
                    ? {
                        revisionHeight: Long.fromString(timeout_height.revision_height || "0", true),
                        revisionNumber: Long.fromString(timeout_height.revision_number || "0", true),
                    }
                    : undefined,
                timeoutTimestamp: Long.fromString(timeout_timestamp || "0", true),
                memo: memo,
            }),
    }

    // TODO: need to load the registry for custom type 
    // eg: osmosis.gamm.v1beta1.load(registry);

    const client = await SigningStargateClient.offline(
        signer,
        { registry, aminoTypes }
    );


    return client;
}

export const getCustomAminoConverter = (type) => {
    let aminoConverter

    let newType = type.slice(1, type.length)
    const splitType = newType.split(".")
    splitType.pop()
    let value = multisigjs
    splitType.forEach(element => {
        if (value[element] !== null) {
            value = value[element]
        }
    });

    aminoConverter = value ? value.AminoConverter : null

    return aminoConverter;
}
