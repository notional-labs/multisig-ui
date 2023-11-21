import { pubkeyToAddress } from "@cosmjs/amino"
import { addressAmino, addressConversion } from "./stringConvert"

export const checkAddress = (addr, prefix) => {
    let prefixLength = prefix.length
    if (addr.slice(0, prefixLength) !== prefix) {
        throw new Error("Invalid address prefix")
    }
    if ((addr.slice(prefixLength, addr.length).length !== 39)) {
        throw new Error("Invalid address length")
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

const checkAddressOsmoValid = (prefix, address) => {
    let checkPrefix = prefix + 1;
    if(address.includes(checkPrefix)){
      return true;
    }

    return false;
}

const checkValidatorAddressOsmoValid = (prefix, address) => {
    let checkPrefix = prefix + "valoper1";
    if(address.includes(checkPrefix)){
      return true;
    }

    return false;
}

export const checkMsg = (prefix, msgValue) => {
    console.log(msgValue)
    for (const address of addressAmino) {
        if(!(address in msgValue)) continue;
  
        if(address.includes("validator"))
          if(!checkValidatorAddressOsmoValid(prefix, msgValue[address])){
            throw new Error("Invalid field " + address + ". Please Check Again!");
          }else{
            continue;
          }
  
  
        if(!checkAddressOsmoValid(prefix, msgValue[address])){
          throw new Error("Invalid field " + address + ". Please Check Again!");
        }
    }
}

export const checkIfVestedAccount = (account) => {
    if (!account || account === null) {
        return false
    }

    if (account.base_vesting_account) {
        return true
    }

    return false
}

export const checkEthermintAcccount = (account) => {
    if (!account || account === null) {
        return false
    }

    if (account.base_account) {
        return true
    }

    return false
}
