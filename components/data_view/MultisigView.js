import { useEffect, useState, useContext } from "react"
import { getMultisigFromAddress } from "../../libs/multisig"
import { openNotification } from "../ulti/Notification"
import { useRouter } from "next/router"
import { getBalance } from "../../libs/keplrClient"
import { Typography } from "antd"
import FlexRow from "../flex_box/FlexRow"
import Button from "../input/Button"
import { ChainContext } from "../Context"

const { Paragraph } = Typography;

const style = {
    rowCard: {
        borderRadius: '10px',
        backgroundColor: 'white',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.25)',
        width: '48%',
        padding: '1em',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    button: {
        border: 0,
        borderRadius: '10px',
        backgroundColor: 'black',
        color: 'white',
        padding: '1em',
        fontSize: '1rem'
    },
    textField: {
        backgroundColor: '#808080',
        color: 'white',
        padding: '1.5em 1em',
        borderRadius: '10px',
        marginBottom: '30px'
    }
}

const MultisigView = () => {
    const [multisig, setMultisg] = useState(null)
    const [holding, setHolding] = useState(0)
    const [loading, setLoading] = useState(false)
    const { chain } = useContext(ChainContext)
    const router = useRouter()
    const { multisigID } = router.query

    useEffect(() => {
        (async () => {
            setLoading(true)
            if (!multisigID) return
            try {
                const res = await getMultisigFromAddress(multisigID)
                const balance = await getBalance(chain.rpc, multisigID, chain.denom)
                setHolding(parseInt(balance.amount) / 1000000)
                setMultisg(res)
                setLoading(false)
            }
            catch (e) {
                setLoading(false)
                openNotification('error', e.message)
            }
        })()
    }, [multisigID])

    const handleCLick = (route) => {
        router.push(route)
    }

    const getRowCard = (title, paragrah, buttonText, route) => {
        return (
            <div
                style={style.rowCard}
            >
                <div>
                    <h3
                        style={{
                            fontWeight: 'bold'
                        }}
                    >
                        {title}
                    </h3>
                    <p>
                        {paragrah}
                    </p>
                </div>
                <Button
                    text={buttonText}
                    style={style.button}
                    clickFunction={() => handleCLick(route)}
                />
            </div>
        )
    }

    return (
        <div
            style={{
                width: '60%',
                margin: 'auto',
                backgroundColor: '#ffffff',
                boxShadow: ' 0px 0px 20px 2px rgba(0, 0, 0, 0.25)',
                padding: '2em',
                borderRadius: '30px',
            }}
        >
            <h3
                style={{
                    marginBottom: 0
                }}
            >
                Address
            </h3>
            <div
                style={style.textField}
            >
                <Paragraph
                    copyable={{ text: multisigID }}
                    style={{
                        marginBottom: 0,
                        color: 'white'
                    }}
                >
                    {multisigID}
                </Paragraph>
            </div>
            <h3
                style={{
                    marginBottom: 0
                }}
            >
                Holdings
            </h3>
            <div
                style={style.textField}
            >
                <text>
                    {`${holding} ${chain.denom.slice(1).toUpperCase()}`}
                </text>
            </div>
            <FlexRow
                components={[
                    getRowCard(
                        'New transaction',
                        'Once a transaction is created, it can be signed by the multisig members, and then broadcast',
                        'Create Transaction',
                        '/transaction/create'
                    ),
                    getRowCard(
                        'Import transaction',
                        'Import an already generated transaction',
                        'Import Transaction',
                        '/transaction/import'
                    ),
                ]}
                justifyContent={'space-between'}
                style={{
                    marginTop: '20px'
                }}
            />
        </div>
    )
}

export default MultisigView