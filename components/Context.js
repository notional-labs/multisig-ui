import { createContext, useEffect, useState } from "react";
import Head from "next/head";
import { chainData } from "../data/chainData";
import { AnimatePresence } from "framer-motion";

export const ChainContext = createContext();

export const ChainProvider = (props) => {
    const [chain, setChain] = useState(chainData[23]);

    useEffect(() => {
        (async () => {
            const index = localStorage.getItem("current")
            if (index && index !== "" && index < chainData.length) {
                setChain(chainData[23])
            }
            else {
                localStorage.setItem("current", 0)
                setChain(chainData[23])
            }
        })()
    }, [])

    const wrapper = (index) => {
        setChain(chainData[23])
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
