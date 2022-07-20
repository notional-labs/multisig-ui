import { useEffect, useState } from "react"
import SendMsgForm from "./transaction/SendMsg"
import DelegateMsgForm from "./transaction/DelegateMsg"
import UndelegateMsg from "./transaction/UndelegateMsg"
import WithdrawMsg from "./transaction/WithdrawMsg"
import RedelegateMsg from "./transaction/RedelegateMsg"
import VoteMsg from "./transaction/VoteMsg"
import Button from "../input/Button"
import { CloseOutlined } from '@ant-design/icons'
import { motion } from "framer-motion"

const TransactionCreate = ({ multisigID, chain, router, wrapSetClose }) => {
    const [txType, setTxType] = useState(0)
    const [checked, setChecked] = useState(false)

    const txTypes = [
        {
            type: 'msgSend',
            component: (
                <SendMsgForm
                    chain={chain}
                    router={router}
                    address={multisigID}
                    checked={checked}
                    setChecked={setChecked}
                />
            )
        }, {
            type: 'msgDelegate',
            component: (
                <DelegateMsgForm
                    chain={chain}
                    router={router}
                    address={multisigID}
                    checked={checked}
                    setChecked={setChecked}
                />
            )
        }, {
            type: 'msgUndelegate',
            component: (
                <UndelegateMsg
                    chain={chain}
                    router={router}
                    address={multisigID}
                    checked={checked}
                    setChecked={setChecked}
                />
            )
        }, {
            type: 'msgWithdraw',
            component: (
                <WithdrawMsg
                    chain={chain}
                    router={router}
                    address={multisigID}
                    checked={checked}
                    setChecked={setChecked}
                />
            )
        }, {
            type: 'msgRedelegate',
            component: (
                <RedelegateMsg
                    chain={chain}
                    router={router}
                    address={multisigID}
                    checked={checked}
                    setChecked={setChecked}
                />
            )
        },
        {
            type: 'msgVoteProposal',
            component: (
                <VoteMsg
                    chain={chain}
                    router={router}
                    address={multisigID}
                    checked={checked}
                    setChecked={setChecked}
                />
            )
        }
    ]

    useEffect(() => {
        const notShowWarning = localStorage.getItem('not-show-warning')
        if (notShowWarning && notShowWarning === 'true') {
            setChecked(notShowWarning)
        }
    }, [])

    const getForm = () => {
        return txTypes[txType].component
    }

    return (
        <motion.div
            initial={{
                y: -60,
                opacity: 0,
                
            }}
            animate={{
                y: 0,
                opacity: 1
            }}
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
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '10px'
                }}
            >
                <h2
                    style={{
                        marginBottom: 0,
                        textAlign: 'left'
                    }}
                >
                    Create Transaction
                </h2>
                <Button
                    text={(
                        <CloseOutlined />
                    )}
                    style={{
                        position: 'relative',
                        top: '0px',
                        border: 0,
                        backgroundColor: 'transparent',
                        fontWeight: 'bold',
                        fontSize: '1.25rem'
                    }}
                    clickFunction={wrapSetClose}
                />
            </div>
            <h3
                style={{
                    marginBottom: 0
                }}
            >
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
        </motion.div>
    )
}

export default TransactionCreate