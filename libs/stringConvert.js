import axios from "axios"
import { specialDenom } from "../data/chainData"

const DENOM_SUBSTRING_START_LENGTH = 10
const DENOM_SUBSTRING_END_LENGTH = 10

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

export const stringShortener = (str, start = 15, end = 4) => {
    return str && str.slice(0, start) + "..." + str.slice(str.length - end, str.length)
}

export const denomShortender = (denom) => {
    if (denom.length > 20) {
        return stringShortener(denom, DENOM_SUBSTRING_START_LENGTH, DENOM_SUBSTRING_END_LENGTH)
    }

    return denom
}

export const timeStampHandler = (time) => {
    let date = new Date(time)
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`
}

export const addressAmino = ["validator_address", "delegator_address", "from_address", "to_address", "validator_src_address", "validator_dst_address"]
export const addressConversion = ["validatorAddress", "delegatorAddress", "fromAddress", "toAddress", "validatorSrcAddress", "validatorDstAddress"]

export const getDenom = async (api, ibcDenom) => {
    const { data } = await axios.get(`${api}ibc/apps/transfer/v1/denom_traces/${ibcDenom}`)
    const denom = data.denom_trace ? data.denom_trace.base_denom : ibcDenom
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
                            ? denom.substring(1) : denom
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


export const convertValueFromDenom = (baseDenom, value) => {
    const convertValue = value * Math.pow(10, baseDenom.exponent)
    return convertValue
}

export const snakeToCamel = (str) => 
    str.toLowerCase().replace(/([-_][a-z])/g, group =>
    group
      .toUpperCase()
      .replace('-', '')
      .replace('_', '')
  );

export const convertObjProperties = (obj) => {
    let newObj = {}
    for (const [key, value] of Object.entries(obj)) {
        if ( key !== 'msg' && !Array.isArray(value) ) {
            const camelCaseKey = snakeToCamel(key)
            if (typeof value === 'object') {
                const newVal = convertObjProperties(value)
                newObj[camelCaseKey] = newVal
                continue
            }
            newObj[camelCaseKey] = value
        } else {
            newObj[key] = value
        }
    }

    return newObj
}
