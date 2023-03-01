import { useState, useEffect } from "react"
import { pubkeyToAddress } from "@cosmjs/amino"
import { addressShortener } from "../../libs/stringConvert"

const ComponentView = ({ pubkey, index, prefix, chain }) => {
    const [address, setAddress] = useState("")

    useEffect(() => {
        if (chain.chain_id.startsWith('evmos')) {
            const address = PublicKey.fromBase64(fromBase64(pubkey))
            address.type = '/ethermint.crypto.v1.ethsecp256k1.PubKey'
            const addr = address.toAddress().toBech32('evmos')
            setAddress(addr)
        }
        else if (chain.chain_id.startsWith('injective')) {
            const address = PublicKey.fromBase64(fromBase64(pubkey))
            address.type = '/injective.crypto.v1beta1.ethsecp256k1.PubKey'
            const addr = address.toAddress().toBech32('inj')
            setAddress(addr)
        }
        else {
            const addrUint8Array = fromBase64(pubkey)
            const rawAddr = rawSecp256k1PubkeyToRawAddress(addrUint8Array)
            const addr = toBech32(prefix, rawAddr)
            setAddress(addr)
        }
    }, [pubkey])

    return (
        <div
            key={index}
            style={{
                backgroundColor: "#dedede",
                borderRadius: "10px",
                textAlign: "center",
                marginBottom: "5px"
            }}
        >
            <a
                href={`${chain.explorer}account/${address}`}
                target={"_blank"}
                rel="noreferrer"
                style={{
                    color: "black"
                }}
            >
                {addressShortener(address)}
            </a>
        </div>
    )
}

export default ComponentView