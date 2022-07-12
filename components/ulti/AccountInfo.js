import { useEffect, useState } from "react"
import { getAccount, getSequence } from "../../libs/keplrClient"
import FlexRow from "../flex_box/FlexRow"
import Button from "../input/Button"
import { openNotification } from "./Notification"
import { ReloadOutlined } from "@ant-design/icons"
import { Spin, Tooltip } from "antd";
import SignerList from "../list/SignerList"

const style = {
    value: {
        fontWeight: 'bold',
        margin: '0 5px'
    }
}

const circle = (
    <span
        style={{
            width: '10px',
            height: '10px',
            backgroundColor: '#189A01',
            borderRadius: '50%',
            display: 'inline-block',
            position: 'relative',
            margin: 'auto 10px auto 0'
        }}
    />
)

const AccountInfo = ({ 
    address, 
    chain, 
    currentSignatures,
    addSignature,
    transactionID,
    walletAccount,
    setHasSigned,
    tx
}) => {
    const [account, setAccount] = useState({
        accountNumber: '',
        sequence: ''
    })
    const [loading, setLoading] = useState(false)
    const [toggleUpdate, setToggleUpdate] = useState(false)

    useEffect(() => {
        (async () => {
            try {
                setLoading(true)
                const signAccount = await getSequence(chain.api, address)
                setAccount({
                    accountNumber: `${signAccount.account_number}`,
                    sequence: `${signAccount.sequence}`
                })
                setLoading(false)
            }
            catch (e) {
                setLoading(false)
                setAccount({
                    accountNumber: 'Account not yet on chain',
                    sequence: 'Account not yet on chain'
                })
                openNotification('error', 'Failed to fetch current account info')
            }
        })()
    }, [toggleUpdate])


    return (
        <>
            <text>
                Current account sequence
            </text>
            <div
                style={{
                    backgroundColor: '#D9D9D9',
                    padding: '1em',
                    width: '100%',
                    borderRadius: '10px',
                    position: 'relative',
                    marginBottom: '10px'
                }}
            >
                {
                    loading ? (
                        <div
                            style={{
                                width: '100%',
                                textAlign: 'center',
                                marginTop: '20px',
                                borderRadius: '10px'
                            }}
                        >
                            <Spin size="large" />
                        </div>
                    ) : (
                        <>
                            <FlexRow
                                components={[
                                    circle,
                                    <text>
                                        Account Number:
                                    </text>,
                                    <text
                                        style={style.value}
                                    >
                                        {account.accountNumber}
                                    </text>
                                ]}
                                justifyContent={'start'}
                            />
                            <FlexRow
                                components={[
                                    circle,
                                    <text>
                                        Sequence:
                                    </text>,
                                    <text
                                        style={style.value}
                                    >
                                        {account.sequence}
                                    </text>
                                ]}
                                justifyContent={'start'}
                            />
                            <Tooltip title='Update'>
                                <Button
                                    text={(
                                        <div>
                                            <ReloadOutlined
                                                spin={loading}
                                            />
                                        </div>
                                    )}
                                    style={{
                                        position: 'absolute',
                                        top: '0px',
                                        left: '96%',
                                        color: 'black',
                                        backgroundColor: 'transparent',
                                        borderRadius: '10px',
                                        border: 0,
                                        height: '40px',
                                    }}
                                    clickFunction={() => {
                                        setToggleUpdate(!toggleUpdate)
                                    }}
                                />
                            </Tooltip>
                        </>
                    )
                }
            </div>
            <h3>
                Current Signers
            </h3>
            {
                currentSignatures.length > 0 ? (
                    <SignerList
                        currentSignatures={currentSignatures}
                        account={account}
                        style={style}
                        chain={chain}
                        address={address}
                        walletAccount={walletAccount}
                        tx={tx} 
                        addSignature={addSignature}
                        setHasSigned={setHasSigned}
                        transactionID={transactionID}
                    />
                ) : (
                    <text>
                        No signatures yet
                    </text>
                )
            }
        </>
    )
}

export default AccountInfo