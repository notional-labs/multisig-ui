import { useEffect, useState, useCallback } from "react"
import { getKeplrAccount, getKey } from "../../libs/keplrClient"
import { getLedgerAccount } from "../../libs/ledger"
import ConnectButton from "../input/ConnectButton"
import Profile from "../Profile"
import { openNotification } from "../ulti/Notification"

const Account = ({ prefix, chainId, chainName }) => {
    const [account, setAccount] = useState("")

    const keplrKeystorechangeHandler = useCallback(async (event) => {
        try {
            const keplrAccount = await getAccount(chainId)
            const currentAccount = localStorage.getItem("account")
            if (currentAccount && currentAccount !== "") {
                const acc = {
                    ...keplrAccount,
                    type: "keplr"
                }
                localStorage.setItem("account", JSON.stringify(acc))
                setAccount(JSON.stringify(acc))
            }
        }
        catch (e) {
            openNotification('error', e.message)
        }
    }, []);

    useEffect(() => {
        window.keplr && window.addEventListener("keplr_keystorechange", keplrKeystorechangeHandler)

        return () => {
            window.removeEventListener("keplr_keystorechange", keplrKeystorechangeHandler)
        }
    }, []);

    useEffect(() => {
        (async () => {
            try {
                const currentAccount = localStorage.getItem("account")
                if (currentAccount === "" || !currentAccount) return
                const type = JSON.parse(currentAccount).type || ""
                let acc
                if (type === "keplr") {
                    acc = await getAccount(chainId)
                    localStorage.setItem("account", JSON.stringify({...acc, type: "keplr"}))
                }
                else {
                    acc = await getLedgerAccount(prefix)
                    localStorage.setItem("account", JSON.stringify({...acc, type: "ledger"}))
                }
                setAccount(JSON.stringify(acc))
            }
            catch (e) {
                openNotification("error", e.message)
            }
        })()
    }, [chainId])

    const wrapperSetAccount = (acc) => {
        setAccount(acc)
    }

    const getAccount = async () => {
        const acc = await getKey(chainId)
        return acc
    }

    return account && account !== "" ? (
        <Profile
            account={JSON.parse(account)}
            chainName={chainName}
            setAccount={wrapperSetAccount}
        />
    ) : (
        <ConnectButton
            prefix={prefix}
            chainId={chainId}
            setAccount={wrapperSetAccount}
        />
    )
}

export default Account