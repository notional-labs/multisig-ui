import { useState, useEffect } from "react"
import ComponentView from "./ComponentView"

const ComponentRow = ({ pubkeys, prefix, chain }) => {
    const [pubkeyList, setPubkeyList] = useState([])

    useEffect(() => {
        const pubkeyJson = JSON.parse(pubkeys)
        const pubkeyListFromJSON = pubkeyJson.value.pubkeys
        setPubkeyList([...pubkeyListFromJSON])
    }, [pubkeys])

    return (
        <div
            id="component"
            style={{
                borderRadius: "0 0 10px 10px",
                textAlign: "center",
                marginBottom: "5px",
                border: "solid 1px #7a7a7a",
                borderTop: "none",
            }}
        >
            <style>
                {
                    `
                        @keyframes growDown {
                            0% {
                                transform: scaleY(0)
                            }
                            80% {
                                transform: scaleY(1.1)
                            }
                            100% {
                                transform: scaleY(1)
                            }
                        }
                        @keyframes drop-down {
                            from {height: 0px; display: none;}
                            to {height: 100px; display: block;}
                        }

                        #component {
                            animation: growDown 300ms ease-in-out forwards;
                            transform-origin: top;
                            display: block;
                        }
                    `
                }
            </style>
            {
                pubkeyList.length > 0 && pubkeyList.map((pubkey, index) => {
                    return (
                        <div
                            key={index}
                        >
                            <ComponentView
                                pubkey={pubkey.value}
                                index={index}
                                prefix={prefix}
                                chain={chain}
                                length={pubkeyList.length}
                            />
                        </div>
                    )
                })
            }
        </div>
    )
}

export default ComponentRow