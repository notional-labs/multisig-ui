import { useEffect, useState } from "react"
import { getKeplrAccount } from "../../libs/keplrClient"
import ConnectButton from "../input/ConnectButton"
import Profile from "../Profile"

const Account = ({chainId, chainName}) => {
    const [account, setAccount] = useState('')
    const [initialRender, setInitialRender] = useState(true)

    useEffect(() => {
        setAccount(localStorage.getItem('account'))
        setInitialRender(false)
    }, [])

    useEffect(() => {
        (async () => {
            if(initialRender) return
            const keplrAccount = await getAccount(chainId)
            localStorage.setItem('account', JSON.stringify(keplrAccount))
            setAccount(JSON.stringify(keplrAccount))
        })()
    }, [chainId])

    const wrapperSetAccount = (account) => {
        setAccount(account)
    }

    const getAccount = async () => {
        const {accounts} = await getKeplrAccount(chainId)
        return accounts
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