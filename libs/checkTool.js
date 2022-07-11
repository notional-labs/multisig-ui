import { pubkeyToAddress } from "@cosmjs/amino"

export const checkAddress = (addr, prefix) => {
    let prefixLength = prefix.length
    if (addr.slice(0, prefixLength) !== prefix) {
        throw new Error('Invalid address prefix')
    }
    if ((addr.slice(prefixLength, addr.length).length !== 39)) {
        throw new Error('Invalid address length')
    }
}

export const isValidAddress = (addr, prefix) => {
    try {
        checkAddress(addr, prefix)
        return true
    }
    catch {
        return false
    }
}

export const multisigHasAddr = (components, addr, prefix) => {
    const componentAddresses = components.map(component => {
        const address = component && pubkeyToAddress(
            component, prefix)
        return address
    })

    const prevAddrMatch = componentAddresses.findIndex(
        (address) => address === addr
    );

    if (prevAddrMatch > -1) return true

    return false
}