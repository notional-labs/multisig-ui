import { useState, useEffect } from "react";
import Input from "../../input/Input"
import { isValidAddress } from "../../../libs/checkTool";
import { openNotification } from "../../ulti/Notification";
import { createIbcTransferMsg } from "../../../libs/transaction";
import { convertValueFromDenom, stringShortener } from "../../../libs/stringConvert";
import Button from "../../input/Button";
import { InputNumber } from 'antd';
import { getChainPair, getAllDstChain, getSourceChain } from "../../../libs/queryClients";

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
        }
    })
    const [selectedToken, setSelectedToken] = useState(0)
    const [dstChains, setDstChains] = useState([])
    const [channels, setChannels] = useState([])
    const [loading, setLoading] = useState(false)
    const [addrError, setAddrError] = useState("")

    useEffect(() => {
        try {
            setLoading(true)
            const res = getAllDstChain(chain.name)
            setDstChains([...res])
            setLoading(false)
        }
        catch (e) {
            setLoading(false)
            openNotification("error", e.message)
        }
    }, [])

    const selectChain = (dstChainName) => {
        try {
            setLoading(true)
            const res = getChainPair(chain.name, dstChainName)
            setChannels([...res.channels])
            const sourceChain = getSourceChain(res, chain.name)
            selectChannel(sourceChain)
            setLoading(false)
        }
        catch (e) {
            setLoading(false)
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
        for (let key in txBody) {
            if (key === "token" && txBody[key].amount === 0) return true
            else if (key === "receiver" && txBody[key] === "") return true
        }
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
                    Destination
                </h4>
                {!loading && <select
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
                        dstChains.length > 0 && dstChains.map((dstChain, index) => {
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
                </select>}
            </div>
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
                <select
                    onChange={selectToken}
                    style={{
                        width: "100%",
                        padding: "1em",
                        borderRadius: "10px",
                    }}
                >
                    {
                        balances.length > 0 && balances.map((balance, index) => {
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
                </select>
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
                    {`Amount (${denomShortender(balances[selectedToken].denom).toUpperCase()})`}
                </h4>
                <InputNumber
                    onChange={handleInputNumber}
                    value={txBody.amount}
                    label={`Amount (${balances[selectedToken].denom.toUpperCase()})`}
                    name="amount"
                    placeholder="Amount"
                    max={balances[selectedToken].amount}
                    style={{
                        ...style.input,
                        width: "100%",
                        borderRadius: "10px",
                        border: "solid 1px black",
                        padding: "10px 0"
                    }}
                />
            </div>
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