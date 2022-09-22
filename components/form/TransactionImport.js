import Button from "../input/Button"
import { CloseOutlined } from "@ant-design/icons"
import TextArea from "antd/lib/input/TextArea"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import axios from "axios"
import { checkMsg } from "../../libs/checkTool"
import { mockData } from "../../data/mockData"
import { checkIfHasPendingTx } from "../../libs/transaction"
import WarningModal from "../ulti/WarningModal"
import { addressAmino, addressConversion } from "../../libs/stringConvert"
import { openLoadingNotification, openNotification } from "../ulti/Notification"

const typeMsg = [
    "cosmos-sdk/MsgWithdrawDelegationReward",
    "cosmos-sdk/MsgDelegate",
    "cosmos-sdk/MsgSend",
    "cosmos-sdk/MsgUndelegate",
    "cosmos-sdk/MsgBeginRedelegate"
]

const typeMsgConversion = [
    "/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward",
    "/cosmos.staking.v1beta1.MsgDelegate",
    "/cosmos.bank.v1beta1.MsgSend",
    "/cosmos.staking.v1beta1.MsgUndelegate",
    "/cosmos.staking.v1beta1.MsgBeginRedelegate"
]

const style = {
    input: {
        marginBottom: "10px",
        color: "black"
    },
    button: {
        border: 0,
        borderRadius: "10px",
        width: "40%",
        padding: ".5em 1em"
    }
}

const TransactionImport = ({ multisigID, chain, router, wrapSetClose }) => {
    const [tx, setTx] = useState("")
    const [checked, setChecked] = useState(false)
    const [showWarning, setShowWarning] = useState(false)

    useEffect(() => {
        const notShowWarning = localStorage.getItem("not-show-warning")
        if (notShowWarning && notShowWarning === "true") {
            setChecked(notShowWarning)
        }
    }, [])

    const handleChange = (e) => {
        setTx(e.target.value)
    }

    const convertCLITransaction = (tx_json_parsed) => {
        const msgValue = {}
        const messages = tx_json_parsed.body.messages
        msgValue["messages"] = messages.map(message => {
            const msg = {}
            msg["type"] = message["@type"]
            msg["value"] = {}
            for (const key in message) {
                if (key === "type") continue;
                msg["value"][key] = message[key];
            }
            return msg
        })

        const fee = tx_json_parsed.auth_info.fee;
        msgValue["fee"] = {}
        msgValue["fee"]["gas"] = fee.gas_limit;
        msgValue["fee"]["amount"] = fee.amount;
        msgValue["memo"] = tx_json_parsed.memo;

        return msgValue;
    }

    const convertSinleMsg = (msg) => {
        let msgValue = msg.value;
        let type = msg.typeUrl || msg.type;

        try {
            checkMsg(chain.prefix, msgValue)
        } catch (e) {
            throw new Error(e.message)
        }

        // convert type
        const posi = typeMsg.indexOf(type);
        if (posi > -1) {
            type = typeMsgConversion[posi];
        } else if (!typeMsgConversion.includes(type)) {
            throw new Error("Unsupported or Wrong Transaction Type. Check Again Your Transaction Type")
        }

        // convert to compatible field
        for (let i = 0; i < addressAmino.length; i++) {
            if (!(addressAmino[i] in msgValue)) continue;

            if (addressAmino[i] === "delegator_address" || addressAmino[i] === "from_address") {
                msgValue[addressConversion[i]] = multisigID;
            } else {
                msgValue[addressConversion[i]] = msgValue[addressAmino[i]];
            }

            delete msgValue[addressAmino[i]];
        }

        // console.log(msgValue);

        return {
            value: msgValue,
            typeUrl: type,
        }
    }

    const createTransaction = () => {
        let tx_json_parsed;
        try {
            tx_json_parsed = JSON.parse(tx);
        } catch (err) {
            throw new Error("Invalid Tx Json. Check TX Again!")
        }

        let msgList
        let fee
        let memo
        if ("msgs" in tx_json_parsed) {
            msgList = tx_json_parsed.msgs
            fee = tx_json_parsed.fee
            memo = tx_json_parsed.memo || ""
        } else {
            const msg = convertCLITransaction(tx_json_parsed);
            msgList = msg.messages;
            fee = msg.fee;
            memo = msg.memo || ""
            throw new Error('Unsupported tx format')
        }

        const msgs = msgList.map(msg => {
            return convertSinleMsg(msg)
        })

        return {
            chainId: chain.chain_id,
            msgs: [...msgs],
            fee: fee,
            memo: memo,
        };
    };

    const handleCreate = async () => {
        openLoadingNotification("open", "Creating transaction")
        try {
            const transactionObj = createTransaction();
            const dataJSON = JSON.stringify(transactionObj);
            const data = {
                dataJSON,
                createBy: multisigID,
                status: "PENDING"
            }
            const res = await axios.post("/api/transaction/create", data);
            const { _id } = res.data;
            router.push(`/multisig/${multisigID}/transaction/${_id}`)
            openLoadingNotification("close")
            openNotification("success", "Successfully create transaction")
        }
        catch (e) {
            console.log(e.message)
            openLoadingNotification("close")
            openNotification("error", "Unsuccessfully create transaction " + e.message)
        }
    }

    const checDisable = () => {
        return tx === ""
    }

    const handleClose = () => {
        setShowWarning(false)
    }

    const handleProcced = async () => {
        const check = await checkIfHasPendingTx(multisigID)
        console.log(checked)
        if (check && !checked) {
            setShowWarning(true)
        }
        else {
            await handleCreate()
        }
    }

    const handleCancel = () => {
        setShowWarning(false)
        openNotification("error", "Cancel create transaction")
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
                backgroundColor: "#ffffff",
                boxShadow: " 0px 0px 20px 2px rgba(0, 0, 0, 0.25)",
                padding: "2em 3em",
                borderRadius: "10px",
                position: "relative",
                zIndex: 1,
                width: "100%",
                marginTop: "50px"
            }}
        >
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "10px"
                }}
            >
                <h2
                    style={{
                        marginBottom: 0,
                        textAlign: "left"
                    }}
                >
                    Import Transaction
                </h2>
                <Button
                    text={(
                        <CloseOutlined />
                    )}
                    style={{
                        position: "relative",
                        top: "0px",
                        border: 0,
                        backgroundColor: "transparent",
                        fontWeight: "bold",
                        fontSize: "1.25rem"
                    }}
                    clickFunction={wrapSetClose}
                />
            </div>
            <div
                style={{
                    fontStyle: "italic",
                    color: "#636363",
                    marginBottom: "20px"
                }}
            >
                *Currently support Send, WithdrawDelegatorReward, Delegate, Undelegate, BeginRedelegate type message
            </div>
            <div>
                <TextArea
                    placeholder={mockData}
                    rows={6}
                    onChange={handleChange}
                    className={"black-placeholder"}
                    value={tx}
                    style={{
                        backgroundColor: "#D9D9D9",
                        borderRadius: "10px",
                        maxHeight: "500px",
                        color: "black",
                        overflow: "auto"
                    }}
                />
            </div>
            <Button
                text={"Create Transaction"}
                style={{
                    backgroundColor: checDisable() ? "#808080" : "black",
                    color: "white",
                    padding: "1em",
                    width: "100%",
                    borderRadius: "10px",
                    marginTop: "20px",
                    border: 0
                }}
                clickFunction={async () => await handleProcced()}
                disable={checDisable()}
            />
            <WarningModal
                style={style}
                handleClose={handleClose}
                handleCreate={handleCreate}
                showWarning={showWarning}
                handleCancel={handleCancel}
                checked={checked}
                setChecked={setChecked}
            />
        </motion.div>
    )
}

export default TransactionImport