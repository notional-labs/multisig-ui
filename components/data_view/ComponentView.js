import { useState, useEffect } from "react"
import { stringShortener } from "../../libs/stringConvert"
import { fromBase64, toBech32 } from "@cosmjs/encoding"
import { rawSecp256k1PubkeyToRawAddress } from "@cosmjs/tendermint-rpc"
import { PublicKey } from "@injectivelabs/sdk-ts";

const ComponentView = ({ pubkey, index, prefix, chain, length }) => {
    const [address, setAddress] = useState("")

    useEffect(() => {
        if (chain.chain_id.startsWith('evmos')) {
            const pk = PublicKey.fromBase64(fromBase64(pubkey))
            pk.type = '/ethermint.crypto.v1.ethsecp256k1.PubKey'
            const addr = pk.toAddress().toBech32('evmos')
            setAddress(addr)
        }
        else if (chain.chain_id.startsWith('injective')) {
            const pk = PublicKey.fromBase64(fromBase64(pubkey))
            pk.type = '/injective.crypto.v1beta1.ethsecp256k1.PubKey'
            const addr = pk.toAddress().toBech32('inj')
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
                textAlign: "center",
                padding: "10px",
                borderBottom: length - 1 !== index && "solid .5px #7a7a7a"
            }}
        >
            <a
                href={`${chain.explorer}account/${address}`}
                target={"_blank"}
                rel="noreferrer"
            >
                {stringShortener(address)}
            </a>
        </div>
    )
}

export default ComponentView