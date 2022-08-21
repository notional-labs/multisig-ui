import {
    AminoTypes,
    SigningStargateClient
} from '@cosmjs/stargate';
import { Registry } from '@cosmjs/proto-signing';
import { defaultRegistryTypes } from '@cosmjs/stargate';
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

export const getCustomCLient = async (types, chainName) => {
    // get path to file
    const paths = types.map(type => {
        type = type.slice(0,1)
        return type.replaceAll('.', '/')
    })


}