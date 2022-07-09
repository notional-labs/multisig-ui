import Button from "./Button"
import { getKeplrAccount, getKey } from "../../libs/keplrClient"
import { useRouter } from "next/router"

const ConnectButton = ({ chainId, setAccount }) => {
    const router = useRouter()

    const connect = async () => {
        const account = await getKey(chainId)
        localStorage.setItem('account', JSON.stringify(account))
        window.dispatchEvent( new Event('storage') )
        setAccount(JSON.stringify(account))
    }

    return (
        <div
            style={{
                position: 'relative',
                height: '100%'
            }}
        >
            <Button
                clickFunction={connect}
                text={'Connect'}
                style={{
                    border: 'solid 2px white',
                    backgroundImage: 'linear-gradient(93.58deg, #D9D9D9 0%, #808080 100%)',
                    color: 'black',
                    borderRadius: '10px',
                    fontSize: '1.5rem',
                    padding: '.42em 1em'
                }}
            />
        </div>
    )
}

export default ConnectButton