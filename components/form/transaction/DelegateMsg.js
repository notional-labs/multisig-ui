import { useEffect, useState } from "react"
import { getValidators, statusList } from "../../../libs/queryClients"
import Input from "../../input/Input"
import { createDelegateMsg } from "../../../libs/transaction"
import { openNotification } from "../../ulti/Notification"
import { convertValueFromDenom } from "../../../libs/stringConvert"
import Button from "../../input/Button"
import { InputNumber } from 'antd';

const inputMode = [
    'List select',
    'Manually input'
]

const DelegateMsg = ({ chain, address, msgs, setMsgs, style }) => {
    const [validators, setValidators] = useState([])
    const [txBody, setTxBody] = useState({
        toAddress: "",
        amount: 0,
    })
    const [status, setStatus] = useState(0)
    const [mode, setMode] = useState(0)
    const [loading, setLoading] = useState(false)

    const invalidForm = () => {
        for (let key in txBody) {
            if (key === "amount" && txBody[key] === 0) return true
        }
        return false
    }

    const disabled = () => {
        if (invalidForm()) {
            return true
        }
        return false
    }

    useEffect(() => {
        (async () => {
            try {
                setLoading(true)
                const res = await getValidators(chain.rpc, statusList[status])
                res.validators && setValidators([...res.validators])
                setLoading(false)
            }
            catch (e) {
                setLoading(false)
                openNotification("error", e.message)
            }
        })()
    }, [chain, status])

    const createMsg = () => {
        try {
            const msg = createDelegateMsg(
                address,
                txBody.toAddress,
                convertValueFromDenom(chain.base_denom, txBody.amount),
                chain.denom
            )
            setMsgs([...msgs, msg])
            openNotification('success', 'Adding successfully')
        }
        catch (e) {
            openNotification('error', e.message)
        }
    }

    const handleInputNumber = (val) => {
        setTxBody({
            ...txBody,
            amount: parseFloat(val)
        })
    }

    const handleInput = (e) => {
        setTxBody({
            ...txBody,
            toAddress: e.target.value
        })
    }

    const handleSelect = (e) => {
        setTxBody({
            ...txBody,
            toAddress: e.target.value
        })
    }

    return (
        <div>
            <h4
                style={{
                    marginBottom: 0
                }}
            >
                Validator
            </h4>
            <div
                style={{
                    ...style.input,
                    backgroundColor: "#ffffff",
                    boxShadow: " 0px 0px 10px 1px rgba(0, 0, 0, 0.25)",
                    padding: "1em 2em",
                    borderRadius: "10px",
                    position: "relative",
                    zIndex: 1,
                    width: "100%",
                    margin: "10px 0 20px 0"
                }}
            >
                <div
                    style={{
                        marginBottom: 0
                    }}
                >
                    Input method
                </div>
                <div
                    style={{
                        borderRadius: "5px",
                        padding: "2px 5px",
                        backgroundColor: "#ebebeb",
                        width: "25%"
                    }}
                >
                    <Button
                        text={inputMode[0]}
                        clickFunction={() => {
                            setMode(0)
                        }}
                        style={{
                            border: 0,
                            borderRadius: "5px",
                            backgroundColor: mode === 0 ? "black" : "transparent",
                            color: mode === 0 && "white",
                            width: "50%"
                        }}
                    />
                    <Button
                        text={inputMode[1]}
                        clickFunction={() => {
                            setMode(1)
                        }}
                        style={{
                            border: 0,
                            width: "50%",
                            borderRadius: "5px",
                            backgroundColor: mode === 1 ? "black" : "transparent",
                            color: mode === 1 && "white",
                        }}
                    />
                </div>
                {mode === 0 ? <div
                    style={{
                        backgroundColor: "#ffffff",
                        boxShadow: " 0px 0px 10px 1px rgba(0, 0, 0, 0.25)",
                        padding: "1em 2em",
                        borderRadius: "10px",
                        position: "relative",
                        zIndex: 1,
                        width: "100%",
                        margin: "20px 0 20px 0"
                    }}
                >
                    <div
                        style={{
                            marginBottom: "10px",
                        }}
                    >
                        <div
                            style={{
                                borderRadius: "5px",
                                padding: "2px 5px",
                                backgroundColor: "#ebebeb",
                                width: "15%"
                            }}
                        >
                            <Button
                                text={"Active"}
                                clickFunction={() => {
                                    setStatus(0)
                                }}
                                style={{
                                    border: 0,
                                    borderRadius: "5px",
                                    backgroundColor: status === 0 ? "black" : "transparent",
                                    color: status === 0 && "white",
                                    width: "50%"
                                }}
                            />
                            <Button
                                text={"Inactive"}
                                clickFunction={() => {
                                    setStatus(1)
                                }}
                                style={{
                                    border: 0,
                                    width: "50%",
                                    borderRadius: "5px",
                                    backgroundColor: status === 1 ? "black" : "transparent",
                                    color: status === 1 && "white",
                                }}
                            />
                        </div>
                    </div>
                    {!loading && <select
                        onChange={handleSelect}
                        style={{
                            width: "100%",
                            padding: "1em",
                            borderRadius: "10px",
                        }}
                    >
                        {
                            validators.length > 0 && validators.map((validator, index) => {
                                return (
                                    <option
                                        value={validator.operatorAddress}
                                        key={index}
                                    >
                                        {validator.description.moniker}
                                    </option>
                                )
                            })
                        }
                    </select>
                    }
                </div> : <div
                    style={{
                        backgroundColor: "#ffffff",
                        boxShadow: " 0px 0px 10px 1px rgba(0, 0, 0, 0.25)",
                        padding: "1em 2em",
                        borderRadius: "10px",
                        position: "relative",
                        zIndex: 1,
                        width: "100%",
                        margin: "20px 0 20px 0"
                    }}
                >
                    <Input
                        onChange={handleInput}
                        value={txBody.toAddress}
                        label="Operator address"
                        name="toAddress"
                        placeholder="Address here"
                        style={style.input}
                    />
                </div>
                }
            </div>
            <div>
                <h4
                    style={{
                        margin: 0
                    }}
                >
                    {`Amount (${chain.denom.substring(1).toUpperCase()})`}
                </h4>
                <InputNumber
                    onChange={handleInputNumber}
                    value={txBody.amount}
                    label={`Amount (${chain.denom.substring(1).toUpperCase()})`}
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

export default DelegateMsg