import { createContext, useEffect, useState } from 'react';
import { chainData } from '../data/chainData';
import { getKeplrAccount } from '../libs/keplrClient';

export const ChainContext = createContext();

export const ChainProvider = (props) => {
    const [chain, setChain] = useState(chainData[0]);

    useEffect(() => {
        (async () => {
            const index = localStorage.getItem('current')
            if (index && index !== '') {
                setChain(chainData[index])
            }
        })()
    }, [])

    const wrapper = (index) => {
        setChain(chainData[index])
    }
    
    return (
        <ChainContext.Provider
            value={{
                chain,
                wrapper,
            }}
        >
            {props.children}
        </ChainContext.Provider>
    );
};
