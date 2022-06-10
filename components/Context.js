import { createContext, useState } from 'react';
import { chainData } from '../data/chainData';

export const ChainContext = createContext();

export const ChainProvider = (props) => {
    const [chain, setChain] = useState(chainData[0]);

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
