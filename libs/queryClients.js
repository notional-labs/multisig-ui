import { setupStakingExtension, setupTxExtension, QueryClient, setupGovExtension } from "@cosmjs/stargate";
import { Tendermint34Client } from "@cosmjs/tendermint-rpc";
import axios from "axios";

export const getValidators = async (rpc) => {
    try {
        const tendermint = await Tendermint34Client.connect(rpc)
        const baseQuery = new QueryClient(tendermint)
        const extension = setupStakingExtension(baseQuery)
        let validators = []
        let res = await extension.staking.validators("BOND_STATUS_BONDED")
        if ( !res.validators || res.validators.length === 0 ) {
            throw new Error("0 validators found")
        }
        validators.push(...res.validators)
        while (res.pagination.nextKey.length !== 0) {
            res = await extension.staking.validators("BOND_STATUS_BONDED", res.pagination.nextKey)
            validators.push(...res.validators)
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
    try{
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
