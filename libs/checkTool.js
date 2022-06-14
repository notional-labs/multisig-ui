export const checkAddress = (addr, prefix) => {
    let prefixLength = prefix.length
    console.log(addr.length)
    if (addr.slice(0, prefixLength) !== prefix) {
        throw new Error('Invalid address prefix')
    }
    if ((addr.slice(0, prefixLength).length !== 39)) {
        throw new Error('Invalid address length')
    }
}