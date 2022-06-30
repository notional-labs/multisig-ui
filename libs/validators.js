import { setupStakingExtension, setupDistributionExtension, } from "@cosmjs/stargate/build/queries"
import { Tendermint34Client } from "@cosmjs/tendermint-rpc";
import { QueryClient } from "@cosmjs/stargate/build/queries";
import axios from "axios";

export const getValidators = async (rpc) => {
    try {
        const tendermint = await Tendermint34Client.connect(rpc)
        const baseQuery = new QueryClient(tendermint)
        const extension = setupStakingExtension(baseQuery)
        const res = await extension.staking.validators('BOND_STATUS_BONDED')
        console.log(res)
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
        console.log(res)
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
        console.log(res)
        return res
    }
    catch (e) {
        throw e
    }
}

export const getRewards = async (api, address) => {
    try {
        const res = await axios.get(`${api}/cosmos/distribution/v1beta1/delegators/${address}/rewards`)
        console.log(res.data)
        return res.data
    }
    catch (e) {
        throw e
    }
}
