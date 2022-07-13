import { useEffect, useState, useContext } from "react"
import { getMultisigFromAddress } from "../../libs/multisig"
import { openNotification } from "../ulti/Notification"
import { useRouter } from "next/router"
import { getBalance } from "../../libs/keplrClient"
import { Typography, Tooltip } from "antd"
import FlexRow from "../flex_box/FlexRow"
import Button from "../input/Button"
import { ChainContext } from "../Context"
import { prefixToId } from "../../data/chainData"
import TransactionCreate from "../form/TransactionCreate"
import TransactionImport from "../form/TransactionImport"

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
    const [holding, setHolding] = useState([])
    const { chain, wrapper } = useContext(ChainContext)
    const router = useRouter()
    const { multisigID } = router.query
    const [showCreate, setShowCreate] = useState(false)
    const [showImport, setShowImport] = useState(false)

    useEffect(() => {
        (async () => {
            if (!multisigID) return
            try {
                const res = await getMultisigFromAddress(multisigID)
                const id = prefixToId[`${res.prefix}`]
                id && wrapper(id)
                id && localStorage.setItem('current', id)
                const balances = await getBalance(chain.rpc, multisigID)
                setHolding([...balances])
            }
            catch (e) {
                openNotification('error', 'Failed to fetch multisig info or balance ' + e.message)
            }
        })()
    }, [multisigID])

    const handleCLick = (buttonType, setVal = true) => {
        if (buttonType === 'create') {
            setShowCreate(setVal)
        }
        else {
            setShowImport(setVal)
        }
    }

    const getRowCard = (title, paragrah, buttonText, buttonType) => {
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
                    clickFunction={() => handleCLick(buttonType)}
                />
            </div>
        )
    }

    return (
        <div
            style={{

                backgroundColor: '#ffffff',
                boxShadow: ' 0px 0px 20px 2px rgba(0, 0, 0, 0.25)',
                padding: '2em 3em',
                borderRadius: '30px',
                position: 'relative',
                zIndex: 1
            }}
        >
            <h1
                style={{
                    textAlign: 'center'
                }}
            >
                Multisig Manager
            </h1>
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
                    <a
                        href={`${chain.explorer}account/${multisigID}`}
                        target="_blank"
                        style={{
                            color: 'white'
                        }}
                    >
                        <Tooltip
                            title="Check address on block explorer"
                        >
                            {multisigID}
                        </Tooltip>
                    </a>
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
                style={{
                    marginBottom: '10px',
                    maxHeight: '200px',
                    overflow: 'auto',
                    border: 'solid 1px black',
                    padding: '.5em 1em',
                    borderRadius: '10px',
                }}
            >
                <table
                    style={{
                        width: '100%',
                        borderSpacing: '0 1em',
                    }}
                >
                    <thead
                        style={{
                            borderBottom: 'solid 1.25px black',
                            fontSize: '1rem'
                        }}
                    >
                        <tr>
                            <th
                                style={{
                                    width: '30%',
                                    textAlign: 'left'
                                }}
                            >
                                Name
                            </th>
                            <th
                                style={{
                                    width: '40%',
                                    textAlign: 'center'
                                }}
                            >
                                Amount
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            holding.map((balance, index) => {
                                return (
                                    <tr
                                        key={index}
                                    >
                                        <td
                                            style={{
                                                width: '30%',
                                                paddingTop: '1em'
                                            }}
                                        >
                                            {
                                                balance.denom.split('u')[1].toUpperCase()
                                            }
                                        </td>
                                        <td
                                            style={{
                                                width: '40%',
                                                paddingTop: '1em',
                                                textAlign: 'center'
                                            }}
                                        >
                                            {
                                                (parseInt(balance.amount) / 1000000).toFixed(6)
                                            }
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
            {
                !showCreate && !showImport && (
                    <FlexRow
                        components={[
                            getRowCard(
                                'New transaction',
                                'Once a transaction is created, it can be signed by the multisig members, and then broadcast',
                                'Create Transaction',
                                'create'
                            ),
                            getRowCard(
                                'Import transaction',
                                'Import an already generated transaction',
                                'Import Transaction',
                                'import'
                            ),
                        ]}
                        justifyContent={'space-between'}
                        style={{
                            marginTop: '40px'
                        }}
                    />
                )
            }
            {
                showCreate && (
                    <TransactionCreate
                        multisigID={multisigID}
                        router={router}
                        chain={chain}
                        wrapSetClose={() => handleCLick('create', false)}
                    />
                )
            }
            {
                showImport && (
                    <TransactionImport
                        multisigID={multisigID}
                        router={router}
                        chain={chain}
                        wrapSetClose={() => handleCLick('import', false)}
                    />
                )
            }
        </div>
    )
}

export default MultisigView