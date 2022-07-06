import { createContext, useEffect, useState } from 'react';
import { chainData } from '../data/chainData';
import { getKey } from '../libs/keplrClient';
import { AnimatePresence } from "framer-motion";

export const ChainContext = createContext();

export const ChainProvider = (props) => {
    const [chain, setChain] = useState(null);

    useEffect(() => {
        (async () => {
            const index = localStorage.getItem('current')
            if (index && index !== '') {
                setChain(chainData[index])
            }
            else {
                setChain(chainData[0])
            }
        })()
    }, [])

    const wrapper = (index) => {
        setChain(chainData[index])
    }

    return chain && (
        <AnimatePresence
            exitBeforeEnter={true}
        >
            <ChainContext.Provider
                value={{
                    chain,
                    wrapper,
                }}
            >
                {props.children}
            </ChainContext.Provider>
        </AnimatePresence>
    );
};
