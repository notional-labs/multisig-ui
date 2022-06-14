import Button from "./Button"
import { getKeplrAccount } from "../../libs/keplrClient"

const ConnectButton = ({chainId, setAccount}) => {

    const connect = async () => {
        const {accounts} = await getKeplrAccount(chainId)
        localStorage.setItem('account', JSON.stringify(accounts))
        setAccount(JSON.stringify(accounts))
    }

    return (
        <Button
            clickFunction={connect}
            text={'Connect'}
            style={{
                border: 'solid 2px white',
                backgroundColor: '#808080',
                color: 'white',
                borderRadius: '10px',
                fontSize: '1.5rem',
                padding: '0 2em 0 2em'
            }}
        />
    )
}

export default ConnectButton