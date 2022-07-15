import axios from "axios"

export const addressShortener = (addr, start = 15, end = 4) => {
    return addr && addr.slice(0, start) + '...' + addr.slice(addr.length - end, addr.length)
}

export const timeStampHandler = (time) => {
    let date = new Date(time)
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`
}

export const addressAmino = ["validator_address", "delegator_address", "from_address", "to_address", "validator_src_address", "validator_dst_address"]
export const addressConversion = ["validatorAddress", "delegatorAddress", "fromAddress", "toAddress", "validatorSrcAddress", "validatorDstAddress"]

export const getDenom = async (api, ibcDenom) => {
    const { data } = await axios.get(`${api}ibc/apps/transfer/v1/denom_traces/${ibcDenom}`)
    const denom = data.denom_trace && data.denom_trace.base_denom.substring(0,1) === 'u' ? data.denom_trace.base_denom : 'unknown'
    return denom
}