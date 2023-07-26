import { coins, coin } from "@cosmjs/amino";
const gov_1 = require("cosmjs-types/cosmos/gov/v1beta1/gov")
import axios from "axios"
import {
    calculateFee,
    GasPrice
} from '@cosmjs/stargate';
const amino_1 = require("@cosmjs/amino");
const math_1 = require("@cosmjs/math");
const utils_1 = require("@cosmjs/utils");
const signing_1 = require("cosmjs-types/cosmos/tx/signing/v1beta1/signing");
const service_1 = require("cosmjs-types/cosmos/tx/v1beta1/service");
const tx_1 = require("cosmjs-types/cosmos/tx/v1beta1/tx");
const long_1 = require("long")
const proto_signing_1 = require("@cosmjs/proto-signing");
const queryclient_1 = require("@cosmjs/stargate");
import { QueryClient } from "@cosmjs/stargate";
import { Tendermint34Client } from "@cosmjs/tendermint-rpc";
import Timestamp from "timestamp-nano";

const simulate = async (signerClient, messages, memo, rpc, sequence, threshold, pk) => {
    const anyMsgs = messages.map((m) => signerClient.registry.encodeAsAny(m));
    const { gasInfo } = await sim(anyMsgs, memo, pk, sequence, rpc, threshold);
    (0, utils_1.assertDefined)(gasInfo);
    return math_1.Uint53.fromString(gasInfo.gasUsed.toString()).toNumber();
}

const sim = async (messages, memo, multisigPubkey, sequence, base, threshold ) => {
    const tendermint = await Tendermint34Client.connect(base)
    const baseQuery = new QueryClient(tendermint)
    const rpc = (0, queryclient_1.createProtobufRpcClient)(baseQuery);
    let queryService = new service_1.ServiceClientImpl(rpc);
    let modeInfo = []
    for (let i = 0; i < threshold; i++){
        modeInfo[i] = { single: { mode: signing_1.SignMode.SIGN_MODE_UNSPECIFIED }}
    }
    const tx = tx_1.Tx.fromPartial({
        authInfo: tx_1.AuthInfo.fromPartial({
            fee: tx_1.Fee.fromPartial({}),
            signerInfos: [
                {
                    publicKey: (0, proto_signing_1.encodePubkey)(multisigPubkey),
                    sequence: long_1.fromNumber(sequence, true),
                    modeInfo:{ multi: modeInfo},
                },
            ],
        }),
        body: tx_1.TxBody.fromPartial({
            messages: Array.from(messages),
            memo: memo,
        }),
        signatures: [new Uint8Array()],
    });
    const request = service_1.SimulateRequest.fromPartial({
        txBytes: tx_1.Tx.encode(tx).finish(),
    });
    const response = await queryService.Simulate(request);
    return response;
}

export const calculateGas = async (signingClient, msgs, memo, gas, rpc, sequence, threshold, pk) => {
    const gasPrice = GasPrice.fromString(gas);
    const gasEstimation = await simulate(signingClient, msgs, memo, rpc, sequence, threshold, pk);
    const fee = calculateFee(Math.round(gasEstimation * 1.5), gasPrice);
    return { fee, gasEstimation };
}

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
            throw new Error("This transaction might not be created using this tool!")
        }
        return res.data
    }
    catch (e) {
        throw e;
    }
}

export const checkIfHasPendingTx = async (address) => {
    try {
        const res = await axios.get(`/api/multisig/${address}/all-transaction`)
        if (!res.data || res.data === null) {
            throw new Error("Failed to check transaction!")
        }
        return res.data.some((tx) => tx.status === "PENDING")
    }
    catch (e) {
        throw e;
    }
}

export const makeTxBody = (
    msgs,
    gas,
    denom,
    memo,
    chainId,
    feeAmount
) => {
    const fee = getFee(gas, feeAmount, denom)

    return {
        chainId: chainId,
        msgs: [...msgs],
        fee: fee,
        memo: memo,
    };
}

export const createSendMsg = (
    fromAddress,
    toAddress,
    amount,
    denom,
) => {
    const msgSend = {
        fromAddress: fromAddress,
        toAddress: toAddress,
        amount: coins(amount, denom),
    };
    const msg = {
        typeUrl: "/cosmos.bank.v1beta1.MsgSend",
        value: msgSend,
    };

    return msg
}

export const createDelegateMsg = (
    delegator_address,
    validator_address,
    amount,
    denom,
) => {
    const msgDelegate = {
        delegatorAddress: delegator_address,
        validatorAddress: validator_address,
        amount: coin(amount, denom)
    }
    const msg = {
        typeUrl: "/cosmos.staking.v1beta1.MsgDelegate",
        value: msgDelegate,
    }
    return msg
}

export const createUndelegateMsg = (
    delegatorAddress,
    validatorAddress,
    amount,
    denom,
) => {
    const msgUndelegate = {
        delegatorAddress: delegatorAddress,
        validatorAddress: validatorAddress,
        amount: coin(amount, denom)
    }
    const msg = {
        typeUrl: "/cosmos.staking.v1beta1.MsgUndelegate",
        value: msgUndelegate,
    };
    return msg
}

export const createWithdrawRewardsMsg = (
    delegatorAddress,
    validatorAddresses,
) => {
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
    return msgs
}

export const createRedelegateMsg = (
    delegatorAddress,
    validatorSrcAddress,
    validatorDstAddress,
    amount,
    denom,
) => {
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
    return msg
}

export const createSubmitProposalMsg = (
    typeUrl,
    title,
    description,
    proposer,
    deposit,
    denom,
) => {
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

    return msg
}

export const createVoteMsg = (
    option,
    proposal_id,
    voter,
) => {
    const msgVote = {
        option: option,
        proposalId: proposal_id,
        voter: voter
    }

    const msg = {
        typeUrl: "/cosmos.gov.v1beta1.MsgVote",
        value: msgVote,
    }
    return msg
}

export const createDepositMsg = (
    amount,
    depositor,
    proposal_id,
    denom,
) => {
    const msgDeposit = {
        amount: [coin(amount, denom)],
        depositor: depositor,
        proposalId: proposal_id
    }

    const msg = {
        typeUrl: "/cosmos.gov.v1beta1.MsgDeposit",
        value: msgDeposit
    }

    return msg
}

export const createIbcTransferMsg = (
    sender,
    receiver,
    amount,
    denom,
    sourcePort,
    sourceChannel,
) => {
    const amt = `${amount}`
    const currentDate = new Date()
    const timeoutDate = new Date(currentDate.getTime() + 10 * 60 * 1000)
    console.log(timeoutDate)
    const msgIbcTransfer = {
        sourcePort: sourcePort,
        sourceChannel: sourceChannel,
        sender: sender,
        receiver: receiver,
        token: coin(amt, denom),
        timeoutTimestamp: (timeoutDate.getTime() * 1000000)
    };
    const msg = {
        typeUrl: "/ibc.applications.transfer.v1.MsgTransfer",
        value: msgIbcTransfer,
    };
    return msg
}


