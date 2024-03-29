import { useEffect, useState, useCallback, useContext } from "react"
import { getKeplrAccount, getKey } from "../../libs/keplrClient"
import ConnectButton from "../input/ConnectButton"
import Profile from "../Profile"
import { openNotification } from "../ulti/Notification"
import { ChainContext } from "../Context"

const Account = ({ chainName }) => {
    const [account, setAccount] = useState("")
    const { chain } = useContext(ChainContext)

    const keplrKeystorechangeHandler = useCallback(async (event) => {
        try {
            const keplrAccount = await getAccount(chain.chain_id)
            const currentAccount = localStorage.getItem("account")
            if (currentAccount && currentAccount !== "") {
                localStorage.setItem("account", JSON.stringify(keplrAccount))
                setAccount(JSON.stringify(keplrAccount))
            }
        }
        catch (e) {
            openNotification('error', e.message)
        }
    }, [chain]);

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
                if (currentAccount && currentAccount !== "") {
                    const keplrAccount = await getAccount(chain.chain_id)
                    localStorage.setItem("account", JSON.stringify(keplrAccount))
                    setAccount(JSON.stringify(keplrAccount))
                }
            }
            catch (e) {
                openNotification('error', e.message)
            }
        })()
    }, [chain.chain_id])

    const wrapperSetAccount = (acc) => {
        setAccount(acc)
    }

    const getAccount = async () => {
        const acc = await getKey(chain.chain_id)
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
            chainId={chain.chain_id}
            setAccount={wrapperSetAccount}
        />
    )
}

export default Account