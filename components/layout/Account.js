import { useEffect, useState, useCallback } from "react"
import { getKeplrAccount, getKey } from "../../libs/keplrClient"
import ConnectButton from "../input/ConnectButton"
import Profile from "../Profile"

const Account = ({ chainId, chainName }) => {
    const [account, setAccount] = useState('')

    const keplrKeystorechangeHandler = useCallback(async (event) => {
        const keplrAccount = await getAccount(chainId)
        const currentAccount = localStorage.getItem('account')
        console.log(currentAccount)
        if (currentAccount && currentAccount !== '') {
            localStorage.setItem('account', JSON.stringify(keplrAccount))
            setAccount(JSON.stringify(keplrAccount))
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
            const currentAccount = localStorage.getItem('account')
            if (currentAccount && currentAccount !== '') {
                const keplrAccount = await getAccount(chainId)
                localStorage.setItem('account', JSON.stringify(keplrAccount))
                setAccount(JSON.stringify(keplrAccount))
            }
        })()
    }, [])

    useEffect(() => {
        (async () => {
            const currentAccount = localStorage.getItem('account')
            if (currentAccount === '' || !currentAccount) return
            const keplrAccount = await getAccount(chainId)
            localStorage.setItem('account', JSON.stringify(keplrAccount))
            setAccount(JSON.stringify(keplrAccount))
        })()
    }, [chainId])

    const wrapperSetAccount = (account) => {
        setAccount(account)
    }

    const getAccount = async () => {
        const account = await getKey(chainId)
        return account
    }

    return account && account !== '' ? (
        <Profile
            account={JSON.parse(account)}
            chainName={chainName}
            setAccount={wrapperSetAccount}
        />
    ) : (
        <ConnectButton
            chainId={chainId}
            setAccount={wrapperSetAccount}
        />
    )
}

export default Account