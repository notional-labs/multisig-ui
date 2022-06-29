import { useContext, useState } from "react"
import { useRouter } from "next/router"
import { ChainContext } from "../Context"
import SendMsgForm from "./transaction/SendMsg"
import DelegateMsgForm from "./transaction/DelegateMsg"
import UndelegateMsg from "./transaction/UndelegateMsg"
import WithdrawMsg from "./transaction/WithdrawMsg"

const TransactionCreate = ({ }) => {
    const [txType, setTxType] = useState(0)
    const router = useRouter()
    const { multisigID } = router.query
    const { chain } = useContext(ChainContext)

    const txTypes = [
        {
            type: 'msgSend',
            component: (
                <SendMsgForm
                    chain={chain}
                    router={router}
                    address={multisigID}
                />
            )
        }, {
            type: 'msgDelegate',
            component: (
                <DelegateMsgForm
                    chain={chain}
                    router={router}
                    address={multisigID}
                />
            )
        }, {
            type: 'msgUndelegate',
            component: (
                <UndelegateMsg
                    chain={chain}
                    router={router}
                    address={multisigID}
                />
            )
        }, {
            type: 'msgWithdraw',
            component: (
                <WithdrawMsg
                    chain={chain}
                    router={router}
                    address={multisigID}
                />
            )
        }
    ]

    const getForm = () => {
        return txTypes[txType].component
    }

    return (
        <div
            style={{
                marginLeft: '300px',
                backgroundColor: '#ffffff',
                boxShadow: ' 0px 0px 20px 2px rgba(0, 0, 0, 0.25)',
                padding: '2em 3em',
                borderRadius: '30px',
                position: 'relative',
                zIndex: 1,
                width: '100%'
            }}
        >
            <h1
                style={{
                    marginBottom: 0,
                    textAlign: 'center'
                }}
            >
                Create Transaction
            </h1>
            <h3>
                Message Type
            </h3>
            <select
                defaultValue={0}
                placeholder={'Select message type'}
                onChange={(e) => {
                    setTxType(e.target.value)
                }}
                style={{
                    marginBottom: '10px',
                    width: '100%',
                    borderRadius: '10px',
                    padding: '1em'
                }}
            >
                {txTypes.map((type, index) => {
                    return (
                        <option
                            key={index}
                            value={index}
                            style={{
                                padding: '1em'
                            }}
                        >
                            {type.type}
                        </option>
                    )
                })}
            </select>
            {
                getForm()
            }
        </div>
    )
}

export default TransactionCreate