import {
    AminoTypes,
    SigningStargateClient,
    defaultRegistryTypes
} from '@cosmjs/stargate';
import { Registry } from '@cosmjs/proto-signing';
import { osmosis, cosmwasm } from 'osmojs';

export const getSignningSuperClient = async (signer) => {
    // registry
    const registry = new Registry(defaultRegistryTypes);

    // aminotypes
    const aminoTypes = new AminoTypes({
        ...cosmwasm.wasm.v1.AminoConverter,
        ...osmosis.gamm.v1beta1.AminoConverter,
        ...osmosis.lockup.AminoConverter,
        ...osmosis.superfluid.AminoConverter
    });

    cosmwasm.wasm.v1.load(registry);
    osmosis.gamm.v1beta1.load(registry);
    osmosis.lockup.load(registry);
    osmosis.superfluid.load(registry);

    const client = await SigningStargateClient.offline(
        signer,
        { registry, aminoTypes }
    );

    return client;
}

export const getCustomCLient = async (types) => {
    const uniqTypes = [...new Set(types)]
    // get path to file
    const paths = uniqTypes.map(type => {
        type = type.slice(1,type.length)
        const splitType = type.split(".")
        splitType.pop()
        return splitType.join('/')
    })
}