import Button from "./Button"
import { multisigHasAddr } from "../../libs/checkTool"
import { useEffect, useState } from "react"
import { getKey } from "../../libs/keplrClient"
import { openNotification } from "../ulti/Notification"

const BroadcastButton = ({ broadcastTx, chain, multisig }) => {
    const [account, setAccount] = useState()

    useEffect(() => {
        window.keplr && window.addEventListener("keplr_keystorechange", async () => {
            try {
                const acc = await getKey(chain.chain_id)
            setAccount(acc)
            }
            catch (e) {
                alert(e.message)
            }
        })
    }, []);

    useEffect(() => {
        (async () => {
            try {
                const acc = await getKey(chain.chain_id)
                if (!acc) return
                setAccount(acc)
            }
            catch (e) {
                openNotification("error", e.message)
            }
        })()
    }, [])

    const checkAddrInMultisig = () => {
        console.log("checkAddrInMultisig");
        if (!account) return false
        const pubkeys = multisig && multisig.pubkeyJSON && JSON.parse(JSON.parse(multisig.pubkeyJSON)).value.pubkeys
        if (!pubkeys) return false
        const check = multisigHasAddr(pubkeys, account.bech32Address, multisig.prefix)
        return check
    }

    return checkAddrInMultisig() && (
        <Button
            text={"Broadcast transaction"}
            style={{
                backgroundColor: "black",
                color: "white",
                padding: "1em",
                width: "100%",
                borderRadius: "10px",
                marginTop: "20px",
                border: 0
            }}
            clickFunction={async () => {
                await broadcastTx()
            }}
        />
    )
}

export default BroadcastButton