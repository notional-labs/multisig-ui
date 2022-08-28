import {
    AminoTypes,
    SigningStargateClient,
    defaultRegistryTypes
} from '@cosmjs/stargate';
import { Registry } from '@cosmjs/proto-signing';
import * as telescopePackage from 'osmojs';
import * as multisigjs from 'multisigjs'

export const getSignningSuperClient = async (signer) => {
    // registry
    const registry = new Registry(defaultRegistryTypes);

    // aminotypes
    const aminoTypes = new AminoTypes({
        ...telescopePackage.cosmwasm.wasm.v1.AminoConverter,
        ...telescopePackage.osmosis.gamm.v1beta1.AminoConverter,
        ...telescopePackage.osmosis.lockup.AminoConverter,
        ...telescopePackage.osmosis.superfluid.AminoConverter
    });

    telescopePackage.cosmwasm.wasm.v1.load(registry);
    telescopePackage.osmosis.gamm.v1beta1.load(registry);
    telescopePackage.osmosis.lockup.load(registry);
    telescopePackage.osmosis.superfluid.load(registry);

    const client = await SigningStargateClient.offline(
        signer,
        { registry, aminoTypes }
    );

    return client;
}

export const getCustomClient = async (types, signer) => {
    // registry
    const registry = new Registry(defaultRegistryTypes);
    const uniqTypes = [...new Set(types)]

    //filter types from default registry
    uniqTypes.filter(type => {
        const filter = defaultRegistryTypes.filter(registry => {
            registry[0] === type
        })
        if (filter.length > 0) {
            return true
        }
        return false
    })

    // get amino converter from each types
    const aminoConverters = uniqTypes.map(type => {
        type = type.slice(1, type.length)
        const splitType = type.split(".")
        splitType.pop()
        let value = multisigjs
        splitType.forEach(element => {
            if (value[element] !== null) {
                value = value[element]
            }
        });
        value.load && typeof value.load === 'function' && value.load(registry)
        return value.AminoConverter || []
    })

    var animoObjs = Object.assign({}, ...aminoConverters);

    // aminotypes
    const aminoTypes = new AminoTypes({...animoObjs})

    const client = await SigningStargateClient.offline(
        signer,
        { registry, aminoTypes }
    );

    return client;
}