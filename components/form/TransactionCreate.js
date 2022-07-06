import { useState } from "react"
import SendMsgForm from "./transaction/SendMsg"
import DelegateMsgForm from "./transaction/DelegateMsg"
import UndelegateMsg from "./transaction/UndelegateMsg"
import WithdrawMsg from "./transaction/WithdrawMsg"
import RedelegateMsg from "./transaction/RedelegateMsg"
import Button from "../input/Button"
import { CloseOutlined } from '@ant-design/icons'

const TransactionCreate = ({ multisigID, chain, router, wrapSetClose }) => {
    const [txType, setTxType] = useState(0)

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
        }, {
            type: 'msgRedelegate',
            component: (
                <RedelegateMsg
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
                backgroundColor: '#ffffff',
                boxShadow: ' 0px 0px 20px 2px rgba(0, 0, 0, 0.25)',
                padding: '2em 3em',
                borderRadius: '10px',
                position: 'relative',
                zIndex: 1,
                width: '100%',
                marginTop: '50px'
            }}
        >
            <h1
                style={{
                    marginBottom: 0,
                    textAlign: 'left'
                }}
            >
                Create Transaction
            </h1>
            <Button
                text={(
                    <CloseOutlined />
                )}
                style={{
                    position: 'absolute',
                    left: '90%',
                    top: '35px',
                    border: 0,
                    backgroundColor: 'transparent',
                    fontWeight: 'bold',
                    fontSize: '1.25rem'
                }}
                clickFunction={wrapSetClose}
            />
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