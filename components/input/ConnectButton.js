import Button from "./Button"
import { getKeplrAccount } from "../../libs/keplrClient"
import { useRouter } from "next/router"

const ConnectButton = ({ chainId, setAccount }) => {
    const router = useRouter()

    const connect = async () => {
        const { accounts } = await getKeplrAccount(chainId)
        localStorage.setItem('account', JSON.stringify(accounts))
        setAccount(JSON.stringify(accounts))
    }

    return (
        <div
            style={{
                position: 'relative',
                color: '#000000',
                height: '100%'
            }}
        >
            <Button
                clickFunction={connect}
                text={'Connect'}
                style={{
                    border: 'solid 2px white',
                    backgroundColor: '#808080',
                    color: 'white',
                    borderRadius: '10px',
                    fontSize: '1.5rem',
                    padding: '.42em 1em'
                }}
            />
        </div>
    )
}

export default ConnectButton