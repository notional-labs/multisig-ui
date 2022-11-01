import { chainObj } from "../data/experimentalChain";
// Return true if arugmetn is undefined
export const getExperimentalChainDataById = (id) => {
    
    for (let chain of chainObj) {
        if (chain.chainId == id) {
            return chain
        }
    }
    return {}
}