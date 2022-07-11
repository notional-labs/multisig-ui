import { useState, useEffect } from "react"
import { pubkeyToAddress } from "@cosmjs/amino"
import { addressShortener } from "../../libs/stringConvert"

const ComponentView = ({ pubkey, index, prefix }) => {
    const [address, setAddress] = useState('')

    useEffect(() => {
        const addr = pubkey && pubkeyToAddress(
            {
                type: "tendermint/PubKeySecp256k1",
                value: pubkey,
            }, prefix)
        setAddress(addr)
    }, [pubkey])

    return (
        <div
            key={index}
            style={{
                backgroundColor: '#dedede',
                borderRadius: '10px',
                textAlign: 'center',
                marginBottom: '5px'
            }}
        >
            {addressShortener(address)}
        </div>
    )
}

export default ComponentView