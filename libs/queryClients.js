import { setupStakingExtension, setupTxExtension, QueryClient, setupIbcExtension } from "@cosmjs/stargate";
import { Tendermint34Client } from "@cosmjs/tendermint-rpc";
import axios from "axios";
import { ibc } from 'chain-registry';

export const statusList = [
    "BOND_STATUS_BONDED",
    "BOND_STATUS_UNBONDING",
    "BOND_STATUS_UNBONDED"
]

export const getValidators = async (rpc, status = "BOND_STATUS_BONDED") => {
    try {
        const tendermint = await Tendermint34Client.connect(rpc)
        const baseQuery = new QueryClient(tendermint)
        const extension = setupStakingExtension(baseQuery)
        let validators = []
        if (status === "BOND_STATUS_BONDED") {
            let res = await extension.staking.validators(status)
            if (!res.validators || res.validators.length === 0) {
                throw new Error("0 validators found")
            }
            validators.push(...res.validators)
            while (res.pagination.nextKey.length !== 0) {
                res = await extension.staking.validators(status, res.pagination.nextKey)
                validators.push(...res.validators)
            }
        }
        else {
            let res = await extension.staking.validators("BOND_STATUS_UNBONDING")
            if (res.validators) {
                validators.push(...res.validators)
                while (res.pagination.nextKey.length !== 0) {
                    res = await extension.staking.validators(status, res.pagination.nextKey)
                    validators.push(...res.validators)
                }
            }

            res = await extension.staking.validators("BOND_STATUS_UNBONDED")
            if (res.validators) {
                validators.push(...res.validators)
                while (res.pagination.nextKey.length !== 0) {
                    res = await extension.staking.validators(status, res.pagination.nextKey)
                    validators.push(...res.validators)
                }
            }
        }
        return {
            validators
        }
    }
    catch (e) {
        throw e
    }
}

export const getValidator = async (rpc, address) => {
    try {
        const tendermint = await Tendermint34Client.connect(rpc)
        const baseQuery = new QueryClient(tendermint)
        const extension = setupStakingExtension(baseQuery)
        const res = await extension.staking.validator(address)
        return res
    }
    catch (e) {
        throw e
    }
}

export const getDelegations = async (rpc, delegator) => {
    try {
        const tendermint = await Tendermint34Client.connect(rpc)
        const baseQuery = new QueryClient(tendermint)
        const extension = setupStakingExtension(baseQuery)
        const res = await extension.staking.delegatorDelegations(delegator)
        return res
    }
    catch (e) {
        throw e
    }
}

export const getDelegation = async (rpc, delegator, validator) => {
    try {
        const tendermint = await Tendermint34Client.connect(rpc)
        const baseQuery = new QueryClient(tendermint)
        const extension = setupStakingExtension(baseQuery)
        const res = await extension.staking.delegation(delegator, validator)
        return res
    }
    catch (e) {
        throw e
    }
}

export const getRewards = async (api, address) => {
    try {
        const res = await axios.get(`${api}cosmos/distribution/v1beta1/delegators/${address}/rewards`)
        return res.data
    }
    catch (e) {
        throw e
    }
}

export const getTx = async (rpc, txHash) => {
    try {
        const tendermint = await Tendermint34Client.connect(rpc)
        const baseQuery = new QueryClient(tendermint)
        const extension = setupTxExtension(baseQuery)
        const res = await extension.tx.getTx(txHash)
        return res
    }
    catch (e) {
        throw e
    }
}

export const getTxByRest = async (api, txHash) => {
    try {
        const { data } = await axios.get(`${api}cosmos/tx/v1beta1/txs/${txHash}`)
        return data
    }
    catch (e) {
        throw e
    }
}

export const getProposals = async (api) => {
    try {
        const res = await axios.get(`${api}cosmos/gov/v1beta1/proposals?proposal_status=2`)
        return res.data
    }
    catch (e) {
        throw e
    }
}

const checkChainName = (ibc, chainName) => {
    const check = ibc.chain_1.chain_name === chainName || ibc.chain_2.chain_name === chainName
    return check
}

export const getChainPair = (sourceChainName, dstChainName) => {
    const ibcPair = ibc.find((ibc) => checkChainName(ibc, sourceChainName) && checkChainName(ibc, dstChainName))
    return ibcPair
}

const getCounterChain = (ibc, sourceChainName) => {
    if (ibc.chain_1.chain_name === sourceChainName) {
        return ibc.chain_2
    }

    return ibc.chain_1
}

export const getSourceChainChannel = (ibc, sourceChainName) => {
    if (ibc.chain_1.chain_name === sourceChainName) {
        return ibc.channels[0].chain_1
    }

    return ibc.channels[0].chain_2
}

export const getAllDstChain = (sourceChainName) => {
    const ibcPairList = ibc.filter((ibc) => checkChainName(ibc, sourceChainName))
    return ibcPairList.map((ibc) => getCounterChain(ibc, sourceChainName))
}

