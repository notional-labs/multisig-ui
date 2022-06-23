import { coins, coin } from "@cosmjs/amino";
import axios from 'axios'

const getFee = (gas, amount, denom) => {
    return {
        amount: coins(amount, denom),
        gas: gas.toString(),
    }
}

export const getTransactionById = async (id) => {
    try {
        const res = await axios.get(`/api/transaction/${id}`)
        return res.data
    }
    catch (e) {
        throw e;
    }
}

export const createSendMsg = (fromAddress, toAddress, amount, gas, denom, memo, chainId, accountNumber, sequence, feeAmount) => {
    const fee = getFee(gas, feeAmount, denom)
    const msgSend = {
        fromAddress: fromAddress,
        toAddress: toAddress,
        amount: coins(amount, denom),
    };
    const msg = {
        typeUrl: "/cosmos.bank.v1beta1.MsgSend",
        value: msgSend,
    };

    return {
        accountNumber: accountNumber,
        sequence: sequence,
        chainId: chainId,
        msgs: [msg],
        fee: fee,
        memo: memo,
    };
}

export const createDelegateMsg = (delegator_address, validator_address, amount, gas, denom, memo, chainId, accountNumber, sequence, feeAmount) => {
    const fee = getFee(gas, feeAmount, denom)
    const msgDelegate = {
        delegatorAddress: delegator_address,
        validatorAddress: validator_address,
        amount: coin(amount, denom)
    }
    const msg = {
        typeUrl: "/cosmos.staking.v1beta1.MsgDelegate",
        value: msgDelegate,
    }
    return {
        accountNumber: accountNumber,
        sequence: sequence,
        chainId: chainId,
        msgs: [msg],
        fee: fee,
        memo: memo,
    };
}
