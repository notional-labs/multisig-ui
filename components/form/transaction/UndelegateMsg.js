import { useEffect, useState } from "react"
import { getDelegations, } from "../../../libs/queryClients"
import Input from "../../input/Input"
import ShareForm from "./ShareForm"
import { createUndelegateMsg, checkIfHasPendingTx } from "../../../libs/transaction"
import { openLoadingNotification, openNotification } from "../../ulti/Notification"
import ValidatorRow from "../../data_view/ValidatorRow"
import WarningModal from "../../ulti/WarningModal"
import { convertValueFromDenom } from "../../../libs/stringConvert"
import axios from "axios"

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


const UndelegateMsg = ({ chain, router, address, checked, setChecked }) => {
    const [delegations, setdelegations] = useState([])
    const [txBody, setTxBody] = useState({
        validator: "",
        amount: 0,
        gas: 200000,
        fee: 0,
        memo: "",
    })
    const [showWarning, setShowWarning] = useState(false)
    const [amountError, setAmountError] = useState("")
    const [maxAmount, setMaxAmount] = useState(0)

    const invalidForm = () => {
        for (let key in txBody) {
            if (key !== "memo" && txBody[key] === "") return true
            else if (key === "amount" && txBody[key] === 0) return true
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

    const handleCreate = async () => {
        openLoadingNotification("open", "Creating transaction")
        try {
            const tx = createUndelegateMsg(
                address,
                txBody.validator,
                convertValueFromDenom(chain.base_denom, txBody.amount),
                txBody.gas,
                chain.denom,
                txBody.memo,
                chain.chain_id,
                txBody.fee,

            );
            const dataJSON = JSON.stringify(tx);
            const data = {
                dataJSON,
                createBy: address,
                status: "PENDING"
            }
            const res = await axios.post("/api/transaction/create", data);
            const { _id } = res.data;
            router.push(`/multisig/${address}/transaction/${_id}`)
            openLoadingNotification("close")
            openNotification("success", "Created successfully")
        }
        catch (e) {
            openLoadingNotification("close")
            openNotification("error", e.message)
        }
    }

    const handleKeyGroupChange = (e) => {
        if (e.target.name === "amount") {
            setAmountError("")
            setTxBody({
                ...txBody,
                [e.target.name]: parseFloat(e.target.value)
            })
            if (parseFloat(e.target.value) > maxAmount) {
                setAmountError("Amount should be lower than delegation amount")
            }
        }
        else if (e.target.name === "fee" || e.target.name === "gas") {
            setTxBody({
                ...txBody,
                [e.target.name]: parseInt(e.target.value, 10)
            })
        }
        else {
            setTxBody({
                ...txBody,
                [e.target.name]: e.target.value
            })
        }
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

    const handleClose = () => {
        setShowWarning(false)
    }

    const handleProcced = async () => {
        const check = await checkIfHasPendingTx(address)
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
                            This address hasn`t delegate to any queryClients yet!
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
            <Input
                onChange={(e) => {
                    handleKeyGroupChange(e);
                }}
                value={txBody.amount}
                label={`Amount (${chain.denom.substring(1).toUpperCase()})`}
                name="amount"
                type="number"
                placeholder="Amount"
                style={style.input}
                error={amountError}
            />
            <ShareForm
                txBody={txBody}
                handleKeyGroupChange={(e) => {
                    handleKeyGroupChange(e);
                }}
                handleCreate={handleProcced}
                chain={chain}
                style={style}
                disabled={disabled()}
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
        </div>
    )
}

export default UndelegateMsg