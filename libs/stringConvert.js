export const addressShortener = (addr) => {
    return addr && addr.slice(0, 15) + '...' + addr.slice(addr.length - 4, addr.length)
}