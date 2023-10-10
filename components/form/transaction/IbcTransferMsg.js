import { useState, useEffect } from "react";
import Input from "../../input/Input"
import { openNotification } from "../../ulti/Notification";
import { createIbcTransferMsg } from "../../../libs/transaction";
import { stringShortener } from "../../../libs/stringConvert";
import Button from "../../input/Button";
import { InputNumber, Checkbox } from 'antd';
import { getChainPair, getAllDstChain, getSourceChainChannel } from "../../../libs/queryClients";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const DENOM_SUBSTRING_START_LENGTH = 10
const DENOM_SUBSTRING_END_LENGTH = 10

const denomShortender = (denom) => {
    if (denom.length > 20) {
        return stringShortener(denom, DENOM_SUBSTRING_START_LENGTH, DENOM_SUBSTRING_END_LENGTH)
    }

    return denom
}

const IbcTransferMsgForm = ({ address, chain, style, msgs, setMsgs, balances }) => {
    const [txBody, setTxBody] = useState({
        sourcePort: "",
        sourceChannel: "",
        receiver: "",
        token: {
            amount: 0,
            denom: ""
        },
        memo: ""
    })
    const [selectedToken, setSelectedToken] = useState(0)
    const [dstChains, setDstChains] = useState([])
    const [channels, setChannels] = useState([])
    const [addrError, setAddrError] = useState("")
    const [advance, setAdvance] = useState(false)

    useEffect(() => {
        try {
            const res = getAllDstChain(chain.name)
            setDstChains([...res])
            res.length > 0 && selectChain(res[0].chain_name)
        }
        catch (e) {
            openNotification("error", e.message)
        }
    }, [])

    const selectChain = (dstChainName) => {
        try {
            const res = getChainPair(chain.name, dstChainName)
            setChannels([...res.channels])
            const sourceChain = getSourceChainChannel(res, chain.name)
            selectChannel(sourceChain)
        }
        catch (e) {
            openNotification("error", e.message)
        }
    }

    const selectChannel = (channel) => {
        setTxBody({
            ...txBody,
            sourcePort: channel.port_id,
            sourceChannel: channel.channel_id
        })
    }

    const selectToken = (e) => {
        setSelectedToken(e.target.value)
    }

    const invalidForm = () => {
        if (txBody.token.amount === 0
            || txBody.receiver === ""
            || txBody.sourceChannel === ""
            || txBody.sourcePort === "") return true
        return false
    }

    const disabled = () => {
        if (invalidForm() || addrError !== "") {
            return true
        }
        return false
    }

    const handleInputNumber = (val) => {
        setTxBody({
            ...txBody,
            token: {
                amount: parseFloat(val),
                denom: balances[selectedToken].denom
            }
        })
    }

    const createMsg = () => {
        try {
            const msg = createIbcTransferMsg(
                address,
                txBody.receiver,
                txBody.token.amount,
                txBody.token.denom,
                txBody.sourcePort,
                txBody.sourceChannel,
                txBody.memo,
            )
            setMsgs([...msgs, msg])
            openNotification('success', 'Adding successfully')
        }
        catch (e) {
            openNotification('error', e.message)
        }
    }

    const handleKeyGroupChange = (e) => {
        if (e.target.name === "amount") {
            setTxBody({
                ...txBody,
                [e.target.name]: parseFloat(e.target.value)
            })
        }
        else {
            setTxBody({
                ...txBody,
                [e.target.name]: e.target.value
            })
        }
    }

    const onChange = (e) => {
        setAdvance(e.target.checked)
    };

    return (
        <div>
            <div
                style={{
                    marginBottom: "10px"
                }}
            >
                <h4
                    style={{
                        margin: 0
                    }}
                >
                    {`Destination (${txBody.sourceChannel}/${txBody.sourcePort})`}
                </h4>
                {
                    dstChains.length > 0 ? <select
                        onChange={(e) => {
                            selectChain(e.target.value)
                        }}
                        style={{
                            width: "100%",
                            padding: "1em",
                            borderRadius: "10px",
                        }}
                    >
                        {
                            dstChains.map((dstChain, index) => {
                                return (
                                    <option
                                        value={dstChain.chain_name}
                                        key={index}
                                    >
                                        {dstChain.chain_name}
                                    </option>
                                )
                            })
                        }
                    </select> : <select
                        disabled={true}
                        style={{
                            width: "100%",
                            padding: "1em",
                            borderRadius: "10px",
                        }}
                    >
                        <option>
                            No connections found on chain registry
                        </option>
                    </select>
                }
            </div>
            <div
                style={{
                    marginTop: "20px",
                    fontStyle: "italic",
                    fontSize: "85%"
                }}
            >
                <ExclamationCircleOutlined style={{ color: "#ffc72b" }} /> For IBC connections that are not registered on chain registry. Go to advance setting to fill in source port and source channel manually !
            </div>
            <Checkbox
                onChange={onChange}
                style={{
                    margin: "10px 0"
                }}
            >
                Advance
            </Checkbox>
            {
                advance && (
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(2, 1fr)",
                            gap: "5%"
                        }}
                    >
                        <Input
                            onChange={(e) => {
                                handleKeyGroupChange(e);
                            }}
                            value={txBody.sourcePort}
                            label="Source port ID"
                            name="sourcePort"
                            placeholder="Port ID"
                            style={{
                                ...style.input,
                                width: "100%"
                            }}
                        />
                        <Input
                            onChange={(e) => {
                                handleKeyGroupChange(e);
                            }}
                            value={txBody.sourceChannel}
                            label="Source channel ID"
                            name="sourceChannel"
                            placeholder="Channel ID"
                            style={{
                                ...style.input,
                                width: "100%"
                            }}
                        />
                    </div>
                )
            }
            <div
                style={{
                    marginBottom: "10px"
                }}
            >
                <h4
                    style={{
                        margin: 0
                    }}
                >
                    Token
                </h4>
                {
                    balances.length > 0 ? <select
                        onChange={selectToken}
                        style={{
                            width: "100%",
                            padding: "1em",
                            borderRadius: "10px",
                        }}
                    >
                        {
                            balances.map((balance, index) => {
                                return (
                                    <option
                                        value={index}
                                        key={index}
                                    >
                                        {`${balance.amount} ${balance.denom}`}
                                    </option>
                                )
                            })
                        }
                    </select> : <select
                        disabled={true}
                        style={{
                            width: "100%",
                            padding: "1em",
                            borderRadius: "10px",
                        }}
                    >
                        <option>
                            Empty balances
                        </option>
                    </select>
                }
            </div>
            <Input
                onChange={(e) => {
                    handleKeyGroupChange(e);
                }}
                value={txBody.toAddress}
                label="Send To"
                name="receiver"
                placeholder="Address here"
                error={addrError}
                style={style.input}
            />
            <div>
                <h4
                    style={{
                        margin: 0
                    }}
                >
                    {`Amount (${balances.length > 0 && denomShortender(balances[selectedToken].denom).toUpperCase()})`}
                </h4>
                <InputNumber
                    onChange={handleInputNumber}
                    value={txBody.amount}
                    label={`Amount (${balances.length > 0 && balances[selectedToken].denom.toUpperCase()})`}
                    name="amount"
                    placeholder="Amount"
                    max={balances.length > 0 && balances[selectedToken].amount}
                    style={{
                        ...style.input,
                        width: "100%",
                        borderRadius: "10px",
                        border: "solid 1px black",
                        padding: "10px 0"
                    }}
                />
            </div>
            <Input
                onChange={(e) => {
                    handleKeyGroupChange(e);
                }}
                value={txBody.toAddress}
                label="Memo"
                name="memo"
                placeholder="memo"
                error={addrError}
                style={style.input}
            />
            <Button
                text={"Add Message"}
                style={{
                    backgroundColor: disabled() ? "#808080" : "black",
                    color: "white",
                    padding: "1em",
                    width: "100%",
                    borderRadius: "10px",
                    marginTop: "20px",
                    border: 0
                }}
                clickFunction={createMsg}
                disable={disabled()}
            />
        </div>
    )
}

export default IbcTransferMsgForm