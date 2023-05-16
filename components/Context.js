import { createContext, useEffect, useState } from "react";
import Head from "next/head";
import { chainData } from "../data/chainData";
import { AnimatePresence } from "framer-motion";

export const ChainContext = createContext();

export const ChainProvider = (props) => {
    const [chain, setChain] = useState(null);

    useEffect(() => {
        (async () => {
            const index = localStorage.getItem("current")
            if (index && index !== "" && index < chainData.length) {
                setChain(chainData[index])
            }
            else {
                localStorage.setItem("current", 0)
                setChain(chainData[0])
            }
        })()
    }, [])

    const wrapper = (index) => {
        setChain(chainData[index])
    }

    return chain && (
        <AnimatePresence
            mode='wait'
        >
            <Head>
                <link rel="shortcut icon" href="/images/favico.ico" />
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
            </Head>
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
