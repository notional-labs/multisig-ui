import { useEffect, useState } from "react"
import { getValidators } from "../../../libs/queryClients"
import Input from "../../input/Input"
import ShareForm from "./ShareForm"
import { checkIfHasPendingTx, createDelegateMsg } from "../../../libs/transaction"
import { openLoadingNotification, openNotification } from "../../ulti/Notification"
import axios from "axios"
import WarningModal from "../../ulti/WarningModal"
import { convertValueFromDenom } from "../../../libs/stringConvert"

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

const DelegateMsg = ({ chain, router, address, checked, setChecked }) => {
    const [validators, setValidators] = useState([])
    const [txBody, setTxBody] = useState({
        toAddress: "",
        amount: 0,
        gas: 200000,
        fee: 0,
        memo: "",
    })
    const [showWarning, setShowWarning] = useState(false)

    const invalidForm = () => {
        for (let key in txBody) {
            if (key !== "memo" && txBody[key] === "") return true
            else if (key === "amount" && txBody[key] === 0) return true
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
                const res = await getValidators(chain.rpc)
                res.validators && setValidators([...res.validators])
            }
            catch (e) {
                openNotification("error", e.message)
            }
        })()
    }, [chain])

    const handleCreate = async () => {
        openLoadingNotification("open", "Creating transaction")
        try {
            const tx = createDelegateMsg(
                address,
                txBody.toAddress,
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
        if (e.target.name === "amount" || e.target.name === "fee" || e.target.name === "gas") {
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

    const handleSelect = (e) => {
        setTxBody({
            ...txBody,
            toAddress: e.target.value
        })
    }
    const handleClose = () => {
        setShowWarning(false)
    }

    const handleProcced = async () => {
        const check = await checkIfHasPendingTx(address)
        if ( check && !checked ) {
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
                    Validator
                </h4>
                <select
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

export default DelegateMsg