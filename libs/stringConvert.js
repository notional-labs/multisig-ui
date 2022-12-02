import axios from "axios"
import { specialDenom } from "../data/chainData"

const SI_prefix = {
    "d": 1,
    "c": 2,
    "m": 3,
    "u": 6,
    "n": 9,
    "p": 12,
    "f": 15,
    "a": 18,
    "z": 21,
    "y": 24
}

export const addressShortener = (addr, start = 15, end = 4) => {
    return addr && addr.slice(0, start) + "..." + addr.slice(addr.length - end, addr.length)
}

export const timeStampHandler = (time) => {
    let date = new Date(time)
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`
}

export const addressAmino = ["validator_address", "delegator_address", "from_address", "to_address", "validator_src_address", "validator_dst_address"]
export const addressConversion = ["validatorAddress", "delegatorAddress", "fromAddress", "toAddress", "validatorSrcAddress", "validatorDstAddress"]

export const getDenom = async (api, ibcDenom) => {
    const { data } = await axios.get(`${api}ibc/apps/transfer/v1/denom_traces/${ibcDenom}`)
    console.log(data.denom_trace)
    const denom = data.denom_trace ? data.denom_trace.base_denom : "unknown"
    return denom
}

export const getDisplayDenom = (denom) => {
    if (denom in specialDenom || denom === 'unknown') {
        return denom
    }
    else {
        const prefix = denom.substring(0, 1)
        const displayDenom = prefix === 'u' 
                            || prefix === 'n'
                            || prefix === 'a' 
                            ? denom.substring(1) : 'unknown'
        return displayDenom
    }
}

export const getValueFromDenom = (denom, value) => {
    let convertValue
    if (denom in specialDenom) {
        const exponent = specialDenom[`${denom}`]
        convertValue = parseInt(value, 10) / Math.pow(10, exponent)
    }
    else {
        const prefix = denom.substring(0, 1)
        switch (prefix) {
            case 'u':
                convertValue = parseInt(value, 10) / Math.pow(10, 6)
                break
            case 'p':
                convertValue = parseInt(value, 10) / Math.pow(10, 12)
                break
            case 'a':
                convertValue = parseInt(value, 10) / Math.pow(10, 18)
                break
            case 'n':
                convertValue = parseInt(value, 10) / Math.pow(10, 9)
                break
            default:
                convertValue = parseInt(value, 10) / Math.pow(10, 6)
                break
        }
    }
    return convertValue
}


export const convertValueFromDenom = (exponent, value) => {
  const convertValue = value * Math.pow(10, exponent)
  return convertValue
};

