import { useState, useEffect } from "react"
import ComponentView from "./ComponentView"

const ComponentRow = ({ pubkeys, prefix }) => {
    const [pubkeyList, setPubkeyList] = useState([])

    useEffect(() => {
        const pubkeyJson = JSON.parse(pubkeys)
        const pubkeyList = pubkeyJson.value.pubkeys
        setPubkeyList([...pubkeyList])
    }, [pubkeys])

    return (
        <div>
            {
                pubkeyList.length > 0 && pubkeyList.map((pubkey, index) => {
                    return (
                        <ComponentView
                            pubkey={pubkey.value}
                            index={index}
                            prefix={prefix}
                        />
                    )
                })
            }
        </div>
    )
}

export default ComponentRow