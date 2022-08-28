import * as multisigjs from "multisigjs"
import {
    defaultRegistryTypes
} from '@cosmjs/stargate';
import { Registry } from '@cosmjs/proto-signing';

const getCustomAminoConverter = async (type) => {

    const registry = new Registry(defaultRegistryTypes);

    const filter = defaultRegistryTypes.filter(registry => {
        registry[0] === type
    })
    if (filter.length > 0) {
        return {}
    }

    let aminoConverter

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
    aminoConverter = value.AminoConverter || []

    return aminoConverter;
}

test('/akash.audit.v1beta1.MsgSignProviderAttributes', async () => {
    const data = await getCustomAminoConverter('/akash.audit.v1beta1.MsgSignProviderAttributes')
    expect(data).toBe(multisigjs.akash.audit.v1beta1.AminoConverter);
});