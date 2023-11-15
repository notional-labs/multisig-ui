import { useState } from "react";
import Input from "../../input/Input"
import { isValidAddress } from "../../../libs/checkTool";
import { openNotification } from "../../ulti/Notification";
import { createSendMsg, } from "../../../libs/transaction";
import { denomShortender, 
    getDisplayDenomWithChainInfo, 
    getDisplayValueWithChainInfo, 
    getValueWithChainInfo} from "../../../libs/stringConvert";
import Button from "../../input/Button";
import { InputNumber } from 'antd';

const SendMsgForm = ({ address, chain, style, msgs, setMsgs, balances }) => {
    const [txBody, setTxBody] = useState({
        toAddress: "",
        amount: 0,
    })
    const [selectedToken, setSelectedToken] = useState(0)

    const [addrError, setAddrError] = useState("")

    const invalidForm = () => {
        for (let key in txBody) {
            if (key === "amount" && txBody[key] === 0) return true
        }
        return false
    }

    const selectToken = (e) => {
        setSelectedToken(e.target.value)
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
            amount: parseFloat(val)
        })
    }

    const createMsg = () => {
        try {
            const msg = createSendMsg(
                address,
                txBody.toAddress,
                getValueWithChainInfo(txBody.amount, balances[selectedToken].denom, chain),
                balances[selectedToken].denom
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

    const handleKeyBlur = (e) => {
        if (e.target.name === "toAddress" && !isValidAddress(e.target.value, chain.prefix)) {
            setAddrError("Invalid Address")
        }
        else {
            setAddrError("")
        }
    }

    return (
        <div>
            <Input
                onChange={(e) => {
                    handleKeyGroupChange(e);
                }}
                value={txBody.toAddress}
                label="Send To"
                name="toAddress"
                placeholder="Address here"
                error={addrError}
                onBlur={handleKeyBlur}
                style={style.input}
            />
            <div
                style={{marginBottom: '10px'}}
            >
                <h4
                    style={{
                        margin: 0
                    }}
                >
                    {`Select token to send`}
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
                                        {`${getDisplayValueWithChainInfo(balance.amount, balance.denom, chain)} 
                                        ${getDisplayDenomWithChainInfo(balance.denom, chain)}`}
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
            <div>
                <h4
                    style={{
                        margin: 0
                    }}
                >
                    {`Amount (${balances.length > 0 
                        ? denomShortender(getDisplayDenomWithChainInfo(balances[selectedToken].denom, chain)).toUpperCase() : ''})`}
                </h4>
                <InputNumber
                    onChange={handleInputNumber}
                    value={txBody.amount}
                    label={`Amount`}
                    name="amount"
                    placeholder="Amount"
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

export default SendMsgForm
