import Button from "./Button"
import { getKey } from "../../libs/keplrClient"
import { openNotification } from "../ulti/Notification"
import { useState } from "react"
import { Modal } from "antd"
import { getLedgerAccount } from "../../libs/ledger"
import FlexRow from "../flex_box/FlexRow"
import { Image } from "antd"

const style = {
    button: {
        border: "solid 1px black",
        color: "black",
        borderRadius: "10px",
        fontSize: "1.25rem",
        padding: ".5em 1em",
        width: "100%",
        display: "flex",
        justifyContent: "center",
    }
}

const buttonText = (name, logo) => {
    return (
        <FlexRow
            components={[
                logo,
                <p
                    style={{
                        marginLeft: "10px",
                        marginBottom: 0
                    }}
                >
                    {name}
                </p>
            ]}
            style={{
                width: "100px"
            }}
            justifyContent={"start"}
        />
    )
}

const ConnectButton = ({ chainId, setAccount }) => {
    const [showConnect, setShowConnect] = useState(false)

    const connect = () => {
        setShowConnect(true)
    }

    const handleClose = () => {
        setShowConnect(false)
    }

    const connectKeplr = async () => {
        try {
            const account = await getKey(chainId)
            localStorage.setItem("account", JSON.stringify({...account, type: "keplr"}))
            window.dispatchEvent(new Event("storage"))
            setAccount(JSON.stringify(account))
        }
        catch (e) {
            openNotification("error", e.message)
        }
    }

    const connectLedger = async () => {
        try {
            await getLedgerAccount()
            window.dispatchEvent(new Event("storage"))
        }
        catch (e) {
            openNotification("error", e.message)
        }
    }

    return (
        <div
            style={{
                position: "relative",
                margin: "auto 0",
                height: "100%"
            }}
        >
            <Button
                clickFunction={connect}
                text={"Connect"}
                style={{
                    border: "solid 1px white",
                    backgroundColor: "#808080",
                    color: "white",
                    borderRadius: "10px",
                    fontSize: "1.25rem",
                    padding: ".25em 1em",
                    height: "100%"
                }}
            />
            <Modal
                visible={showConnect}
                footer={null}
                closable={false}
                onCancel={handleClose}
            >
                <div
                    style={{
                        backgroundColor: "#ffffff",
                        borderRadius: "10px",
                        padding: ".05em",
                        width: "100%"
                    }}
                >
                    <text
                        style={{
                            fontWeight: "bold",
                        }}
                    >
                        Connect to wallet
                    </text>
                    <Button
                        clickFunction={connectKeplr}
                        text={
                            buttonText(
                                "Keplr",
                                <Image
                                    src="/images/keplr-logo.png"
                                    width={"25px"}
                                    preview={false}
                                />
                            )}
                        style={{
                            ...style.button,
                            marginBottom: "10px",
                            marginTop: "10px"
                        }}
                    />
                    <Button
                        clickFunction={connectLedger}
                        text={
                            buttonText(
                                "Ledger",
                                <Image
                                    src="/images/ledger-logo-short.png"
                                    width={"25px"}
                                    preview={false}
                                />
                            )}
                        style={style.button}
                    />
                </div>
            </Modal>
        </div>
    )
}

export default ConnectButton
