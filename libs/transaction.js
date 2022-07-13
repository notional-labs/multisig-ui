import { coins, coin } from "@cosmjs/amino";
const gov_1 = require("cosmjs-types/cosmos/gov/v1beta1/gov")
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
        if (!res.data || res.data === null) {
            throw new Error('This transaction might not be created using this tool!')
        }
        return res.data
    }
    catch (e) {
        throw e;
    }
}

export const checkIfHasPendingTx = async(address) => {
    try {
        const res = await axios.get(`/api/multisig/${address}/all-transaction`)
        console.log(res.data)
        if (!res.data || res.data === null) {
            throw new Error('Failed to check transaction!')
        }
        return res.data.some((tx) => tx.status === 'PENDING')
    }
    catch (e) {
        throw e;
    }
}

export const createSendMsg = (
    fromAddress,
    toAddress,
    amount,
    gas,
    denom,
    memo,
    chainId,
    feeAmount
) => {
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
        chainId: chainId,
        msgs: [msg],
        fee: fee,
        memo: memo,
    };
}

export const createDelegateMsg = (
    delegator_address,
    validator_address,
    amount,
    gas,
    denom,
    memo,
    chainId,
    feeAmount
) => {
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
        chainId: chainId,
        msgs: [msg],
        fee: fee,
        memo: memo,
    };
}

export const createUndelegateMsg = (
    delegatorAddress,
    validatorAddress,
    amount,
    gas,
    denom,
    memo,
    chainId,
    feeAmount
) => {
    const fee = getFee(gas, feeAmount, denom)
    const msgUndelegate = {
        delegatorAddress: delegatorAddress,
        validatorAddress: validatorAddress,
        amount: coin(amount, denom)
    }
    const msg = {
        typeUrl: "/cosmos.staking.v1beta1.MsgUndelegate",
        value: msgUndelegate,
    };
    return {
        chainId: chainId,
        msgs: [msg],
        fee: fee,
        memo: memo,
    };
}

export const createWithdrawRewardsMsg = (
    delegatorAddress,
    validatorAddresses,
    gas,
    denom,
    memo,
    chainId,
    feeAmount
) => {
    const fee = getFee(gas, feeAmount, denom)
    let msgs = []
    validatorAddresses.map(validator_address => {
        const msgWithDraw = {
            delegatorAddress: delegatorAddress,
            validatorAddress: validator_address,
        }
        const msg = {
            typeUrl: "/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward",
            value: msgWithDraw,
        };
        msgs.push(msg)
    })
    return {
        chainId: chainId,
        msgs: [...msgs],
        fee: fee,
        memo: memo,
    };
}

export const createRedelegateMsg = (
    delegatorAddress,
    validatorSrcAddress,
    validatorDstAddress,
    amount,
    gas,
    denom,
    memo,
    chainId,
    feeAmount
) => {
    const fee = getFee(gas, feeAmount, denom)
    const msgRedelegate = {
        delegatorAddress: delegatorAddress,
        validatorSrcAddress: validatorSrcAddress,
        validatorDstAddress: validatorDstAddress,
        amount: coin(amount, denom)
    }
    const msg = {
        typeUrl: "/cosmos.staking.v1beta1.MsgBeginRedelegate",
        value: msgRedelegate,
    };
    return {
        chainId: chainId,
        msgs: [msg],
        fee: fee,
        memo: memo,
    };
}

export const createSubmitProposalMsg = (
    typeUrl,
    title,
    description,
    proposer,
    deposit,
    gas,
    denom,
    memo,
    chainId,
    feeAmount
) => {
    const fee = getFee(gas, feeAmount, denom)
    const msgSubmitProposal = {
        content: {
            typeUrl: typeUrl,
            value: gov_1.TextProposal.encode(gov_1.TextProposal.fromPartial({
                title: title,
                description: description,
            })).finish(),
        },
        initialDeposit: coins(deposit, denom),
        proposer: proposer
    }

    const msg = {
        typeUrl: "/cosmos.gov.v1beta1.MsgSubmitProposal",
        value: msgSubmitProposal,
    }

    return {
        chainId: chainId,
        msgs: [msg],
        fee: fee,
        memo: memo,
    }
}

export const createVoteMsg = (
    option,
    proposal_id,
    voter,
    gas,
    denom,
    memo,
    chainId,
    feeAmount
) => {
    const fee = getFee(gas, feeAmount, denom)
    const msgVote = {
        option: option,
        proposalId: proposal_id,
        voter: voter
    }

    const msg = {
        typeUrl: "/cosmos.gov.v1beta1.MsgVote",
        value: msgVote,
    }
    return {
        chainId: chainId,
        msgs: [msg],
        fee: fee,
        memo: memo,
    }
}

export const createDepositMsg = (
    amount,
    depositor,
    proposal_id,
    gas,
    denom,
    memo,
    feeAmount
) => {
    const fee = getFee(gas, feeAmount, denom)
    const msgDeposit = {
        amount: [coin(amount, denom)],
        depositor: depositor,
        proposalId: proposal_id
    }

    const msg = {
        typeUrl: '/cosmos.gov.v1beta1.MsgDeposit',
        value: msgDeposit
    }

    return {
        chainId: chainId,
        msgs: [msg],
        fee: fee,
        memo: memo,
    }
}


