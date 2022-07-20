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
        fontWeight: "bold",
        margin: "0 5px"
    }
}

const circle = (
    <span
        style={{
            width: "10px",
            height: "10px",
            backgroundColor: "#189A01",
            borderRadius: "50%",
            display: "inline-block",
            position: "relative",
            margin: "auto 10px auto 0"
        }}
    />
)

const AccountInfo = ({
    address,
    chain,
    currentSignatures,
    removeSignature,
    editSignature,
    transactionID,
    walletAccount,
    setHasSigned,
    tx
}) => {
    const [account, setAccount] = useState({
        accountNumber: "",
        sequence: ""
    })
    const [loading, setLoading] = useState(false)
    const [toggleUpdate, setToggleUpdate] = useState(false)

    useEffect(() => {
        (async () => {
            try {
                setLoading(true)
                const signAccount = await getAccount(chain.rpc, address)
                setAccount({
                    accountNumber: `${signAccount.accountNumber}`,
                    sequence: `${signAccount.sequence}`
                })
                setLoading(false)
            }
            catch (e) {
                setLoading(false)
                setAccount({
                    accountNumber: "Account not yet on chain",
                    sequence: "Account not yet on chain"
                })

                // ignore no pubkey error
                if (e.message !== "Multisig Account has no pubkey on chain, this address will need to send a transaction to appear on chain. (If it is newly made address please make sure to send some token to this address )") {
                    openNotification("error", e.message)
                }
            }
        })()
    }, [toggleUpdate])

    return (
        <div
            style={{
                boxShadow: " 0px 0px 20px 2px rgba(0, 0, 0, 0.25)",
                padding: "2em 3em",
                borderRadius: "10px",
                marginTop: "30px"
            }}
        >
            <div
                style={{
                    display: "flex",
                    justifyContent: "start",
                    marginBottom: "5px",
                }}
            >
                <h3
                    style={{ marginBottom: 0, marginTop: "10px" }}
                >
                    Current sequence and account number
                </h3>
                <Button
                    text={(
                        <Tooltip title="Update">
                            <div>
                                <ReloadOutlined
                                    spin={loading}
                                />
                            </div>
                        </Tooltip>
                    )}
                    style={{
                        position: "relative",
                        top: "6px",
                        color: "black",
                        backgroundColor: "transparent",
                        borderRadius: "10px",
                        border: 0,
                    }}
                    clickFunction={() => {
                        setToggleUpdate(!toggleUpdate)
                    }}
                />
            </div>
            <div
                style={{
                    backgroundColor: "#D9D9D9",
                    padding: "1em",
                    width: "100%",
                    borderRadius: "10px",
                    position: "relative",
                    marginBottom: "10px"
                }}
            >
                {
                    loading ? (
                        <div
                            style={{
                                width: "100%",
                                textAlign: "center",
                                marginTop: "20px",
                                borderRadius: "10px"
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
                                justifyContent={"start"}
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
                                justifyContent={"start"}
                            />
                        </>
                    )
                }
            </div>
            <h3
                style={{ marginBottom: 0 }}
            >
                Current Signers
            </h3>
            <text
                style={{
                    fontSize: "12px",
                    fontStyle: "italic",
                    margin: 0,
                }}
            >
                *Make sure all signature infos are sync to prevent mismatch sequence
            </text>
            <SignerList
                currentSignatures={currentSignatures}
                account={account}
                style={style}
                chain={chain}
                address={address}
                walletAccount={walletAccount}
                tx={tx}
                setHasSigned={setHasSigned}
                transactionID={transactionID}
                removeSignature={removeSignature}
                editSignature={editSignature}
            />
        </div>
    )
}

export default AccountInfo