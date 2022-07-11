import Button from "./Button"
import { getKey } from "../../libs/keplrClient"
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
                margin: 'auto 0',
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
                    fontSize: '1.25rem',
                    padding: '.25em 1em',
                    height: '100%'
                }}
            />
        </div>
    )
}

export default ConnectButton