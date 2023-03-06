import { useEffect, useState } from "react"
import { getDelegations, } from "../../../libs/queryClients"
import Input from "../../input/Input"
import { createUndelegateMsg } from "../../../libs/transaction"
import { openNotification } from "../../ulti/Notification"
import ValidatorRow from "../../data_view/ValidatorRow"
import { convertValueFromDenom } from "../../../libs/stringConvert"
import Button from "../../input/Button"
import { InputNumber } from 'antd';

const UndelegateMsg = ({ chain, address, msgs, setMsgs, style }) => {
    const [delegations, setdelegations] = useState([])
    const [txBody, setTxBody] = useState({
        validator: "",
        amount: 0,
    })
    const [amountError, setAmountError] = useState("")
    const [maxAmount, setMaxAmount] = useState(0)

    const invalidForm = () => {
        for (let key in txBody) {
            if (key === "amount" && txBody[key] === 0) return true
        }
        return false
    }

    const disabled = () => {
        if (invalidForm() || amountError !== "") {
            return true
        }
        return false
    }

    useEffect(() => {
        (async () => {
            try {
                const res = await getDelegations(chain.rpc, address)
                let delegation
                if(res.delegationResponses && res.delegationResponses.length > 0){
                    delegation = res.delegationResponses[0] 
                }
                delegation && setMaxAmount(parseInt(delegation.balance.amount, 10) / 1000000)
                delegation && setTxBody({
                    ...txBody,
                    validator: delegation.delegation.validatorAddress
                })
                setdelegations([...res.delegationResponses])
            }
            catch (e) {
                openNotification("error", e.message)
            }
        })()
    }, [chain])

    const createMsg = async () => {
        try {
            const msg = createUndelegateMsg(
                address,
                txBody.validator,
                convertValueFromDenom(chain.base_denom, txBody.amount),
                chain.denom
            )
            await setMsgs([...msgs, msg])
            openNotification('success', 'Adding successfully')
        }
        catch (e) {
            openNotification('success', 'Adding unsuccessfully')
        }
    }

    const handleInputNumber = (val) => {
        setTxBody({
            ...txBody,
            amount: parseFloat(val)
        })
    }

    const handleSelect = (e) => {
        setTxBody({
            ...txBody,
            validator: e.target.value
        })
        const filter = delegations.filter(del => del.delegation.validatorAddress === e.target.value)
        const delegation = filter[0]
        setMaxAmount(parseInt(delegation.balance.amount, 10) / 1000000)
    }

    return (
        <div>
            <div
                style={style.input}
            >
                <h4
                    style={{
                        marginBottom: 0
                    }}
                >
                    Delegation
                </h4>
                {
                    delegations.length > 0 ? (
                        <select
                            onChange={handleSelect}
                            style={{
                                width: "100%",
                                padding: "1em",
                                borderRadius: "10px",
                            }}
                        >
                            {
                                delegations.map((delegation, index) => {
                                    return (
                                        <option
                                            value={delegation.delegation.validatorAddress}
                                            key={index}
                                        >
                                            <ValidatorRow
                                                address={delegation.delegation.validatorAddress}
                                                chain={chain}
                                            />
                                        </option>
                                    )
                                })
                            }
                        </select>) : (
                        <div
                            style={{
                                width: "100%",
                                padding: "1em",
                                borderRadius: "10px",
                                backgroundColor: "#808080",
                                color: "white"
                            }}
                        >
                            This address hasn`t delegate to any validators yet!
                        </div>
                    )
                }

            </div>
            <h4
                style={{
                    marginBottom: 0
                }}
            >
                {`Delegation amount (${chain.denom.substring(1).toUpperCase()})`}
            </h4>
            <div
                style={{
                    width: "100%",
                    padding: "1em",
                    borderRadius: "10px",
                    backgroundColor: "#808080",
                    color: "white",
                    marginBottom: "10px"
                }}
            >
                {maxAmount}
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
                clickFunction={async () => await createMsg()}
                disable={disabled()}
            />
        </div>
    )
}

export default UndelegateMsg