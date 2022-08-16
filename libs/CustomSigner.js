import {
    AminoTypes,
    SigningStargateClient,
    defaultRegistryTypes
} from '@cosmjs/stargate';
import { Registry } from '@cosmjs/proto-signing';
import { osmosis } from 'osmojs';
import { cosmwasm } from 'osmojs';

export const getSigningOsmosisClient = async (signer) => {
    // registry
    const registry = new Registry(defaultRegistryTypes);

    // aminotypes
    const aminoTypes = new AminoTypes({
        ...osmosis.gamm.v1beta1.AminoConverter,
        ...osmosis.lockup.AminoConverter,
        ...osmosis.superfluid.AminoConverter
    });

    osmosis.gamm.v1beta1.load(registry);
    osmosis.lockup.load(registry);
    osmosis.superfluid.load(registry);

    const client = await SigningStargateClient.offline(
        signer,
        { registry, aminoTypes }
    );

    return client;
}

export const getSigningCosmwasmClient = async (signer) => {
    // registry
    const registry = new Registry(defaultRegistryTypes);

    // aminotypes
    const aminoTypes = new AminoTypes({
        ...cosmwasm.v1.wasm.AminoConverter,
    });

    cosmwasm.wasm.v1.load(registry);


    const client = await SigningStargateClient.offline(
        signer,
        { registry, aminoTypes }
    );

    return client;
}

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