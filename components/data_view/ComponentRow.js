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
        <div>
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
                            />
                        </div>
                    )
                })
            }
        </div>
    )
}

export default ComponentRow