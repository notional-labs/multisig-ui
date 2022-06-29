import { setupStakingExtension, setupDistributionExtension, } from "@cosmjs/stargate/build/queries"
import { Tendermint34Client } from "@cosmjs/tendermint-rpc";
import { QueryClient } from "@cosmjs/stargate/build/queries";

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

export const getRewards = async (rpc, address) => {
    try {
        const tendermint = await Tendermint34Client.connect("https://rpc.cosmos.network/")
        const baseQuery = new QueryClient(tendermint)
        const extension = setupDistributionExtension(baseQuery)
        const res = await extension.distribution.delegationTotalRewards("cosmos105rfyahwj8wu2hwz84l7tlpz2ujxul335fdyct")
        console.log(res)
        return res
    }
    catch (e) {
        throw e
    }
}
