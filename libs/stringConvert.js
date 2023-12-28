import axios from "axios"
import { specialDenom } from "../data/chainData"
import { AcceptedMessageKeysFilter, ContractExecutionAuthorization, CombinedLimit, ContractMigrationAuthorization, MaxCallsLimit, MaxFundsLimit, AllowAllMessagesFilter, AcceptedMessagesFilter } from "cosmjs-types/cosmwasm/wasm/v1/authz";

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

export const getDisplayDenomWithChainInfo = (denom, chain) => {
    if (denom === chain.denom) {
        return chain.displayDenom
    }
    return denom
}

export const getDisplayValueWithChainInfo = (value, denom, chain) => {
    if (denom === chain.denom) {
        return getValueFromDenom(denom, value)
    }
    return value
}

export const getValueWithChainInfo = (value, denom, chain) => {
    if (denom === chain.denom) {
        return convertValueFromDenom(chain.base_denom, value)
    }
    return value
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

export const encodeObjectToBytes = (obj) => {
    // ContractExecutionAuthorization, ContractMigrationAuthorization both have grants struct
    let grantCon = obj.value.grant.authorization.value.grants
    for (let key in grantCon) {
        // limit and field are optional in grants struct
        if (grantCon[key].limit) {
            // CombinedLimit, MaxCallsLimit, MaxFundsLimit in limit field
            let lastVal = grantCon[key].limit.value;
            delete grantCon[key].limit.value
            let splitArr = grantCon[key].limit.typeUrl.split(".")
            grantCon[key].limit["value"] = convertStruct(splitArr[splitArr.length-1], lastVal)
        }
        if (grantCon[key].filter) {
            // AcceptedMessageKeysFilter, AllowAllMessagesFilter, AcceptedMessagesFilter in filter field
            let lastVal = grantCon[key].filter.value;
            delete grantCon[key].filter.value
            let splitArr = grantCon[key].filter.typeUrl.split(".")
            grantCon[key].filter["value"] = convertStruct(splitArr[splitArr.length-1], lastVal)
        }
    }
    let lastValGrants = obj.value.grant.authorization.value
    delete obj.value.grant.authorization.value
    let splitArr = obj.value.grant.authorization.typeUrl.split(".")
    obj.value.grant.authorization["value"] = convertStruct(splitArr[splitArr.length-1], lastValGrants)
    return obj
}

export const convertStruct = (type, value) => {
    switch (type) {
        case "ContractExecutionAuthorization":
            return ContractExecutionAuthorization.encode(value).finish()
        case "ContractMigrationAuthorization":
            return ContractMigrationAuthorization.encode(value).finish()
        case "MaxCallsLimit":
            return MaxCallsLimit.encode(value).finish()
        case "MaxFundsLimit":
            return MaxFundsLimit.encode(value).finish()
        case "CombinedLimit":
            return CombinedLimit.encode(value).finish()
        case "AllowAllMessagesFilter":
            return AllowAllMessagesFilter.encode(value).finish()
        case "AcceptedMessageKeysFilter":
            return AcceptedMessageKeysFilter.encode(value).finish()
        case "AcceptedMessagesFilter":
            return AcceptedMessagesFilter.encode(value).finish()
        default:
            throw "Type not supported"
    }
}