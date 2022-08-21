import {
    AminoTypes,
    SigningStargateClient,
    defaultRegistryTypes
} from '@cosmjs/stargate';
import { Registry } from '@cosmjs/proto-signing';
import * as telescopePackage from 'osmojs';

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

const getAminoTypes = (animoConverters) => {

}

export const getCustomClient = async (types, signer) => {
    const registry = new Registry(defaultRegistryTypes);
    const uniqTypes = [...new Set(types)]

    // get path to package
    const paths = uniqTypes.map(type => {
        type = type.slice(1, type.length)
        const splitType = type.split(".")
        splitType.pop()
        return splitType.join('.')
    })

    const aminoConverters = paths.map(path => {
        const splitType = path.split(".")
        let value = telescopePackage
        splitType.forEach(element => {
            if (value[element] !== null) {
                value = value[element]
            }
        });
        value.load && typeof value.load === 'function' && value.load(registry)
        return value.AminoConverter || []
    })

    const spreadAminoObj = {}

    var animoObjs = Object.assign({}, spreadAminoObj, ...aminoConverters);

    const aminoTypes = new AminoTypes({...animoObjs})

    const client = await SigningStargateClient.offline(
        signer,
        { registry, aminoTypes }
    );

    return client;
}