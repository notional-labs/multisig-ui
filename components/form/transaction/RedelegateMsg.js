import { useEffect, useState } from "react"
import { getDelegations, getValidators, } from "../../../libs/validators"
import Input from "../../input/Input"
import ShareForm from "./ShareForm"
import { createRedelegateMsg } from "../../../libs/transaction"
import { openLoadingNotification, openNotification } from "../../ulti/Notification"
import axios from "axios"

const style = {
    input: {
        marginBottom: '10px',
        color: 'black'
    }
}


const RedelegateMsg = ({ chain, router, address }) => {
    const [validators, setValidators] = useState([])
    const [delegations, setdelegations] = useState([])
    const [txBody, setTxBody] = useState({
        validatorSrc: '',
        validatorDest: '',
        amount: 0,
        gas: 200000,
        fee: 0,
        memo: '',
    })
    const [amountError, setAmountError] = useState('')
    const [valError, setValError] = useState('')
    const [maxAmount, setMaxAmount] = useState(0)

    const invalidForm = () => {
        for (let key in txBody) {
            if (key !== 'memo' && txBody[key] === '') return true
            else if (key === 'amount' && txBody[key] === 0) return true
        }
        return false
    }

    const disabled = () => {
        if (invalidForm() || amountError !== '') {
            return true
        }
        return false
    }

    useEffect(() => {
        (async () => {
            try {
                const res = await getDelegations(chain.rpc, address)
                let delegation
                if (res.delegationResponses && res.delegationResponses.length > 0) {
                    delegation = res.delegationResponses[0]
                }
                delegation && setMaxAmount(parseInt(delegation.balance.amount) / 1000000)
                delegation && setTxBody({
                    ...txBody,
                    validatorSrc: delegation.delegation.validatorAddress
                })
                const resVal = await getValidators(chain.rpc)
                resVal.validators && setValidators([...resVal.validators])
                setdelegations([...res.delegationResponses])
            }
            catch (e) {
                openNotification('error', e.message)
            }
        })()
    }, [chain])

    const handleCreate = async () => {
        openLoadingNotification('open', 'Creating transaction')
        try {
            if (txBody.validatorSrc === txBody.validatorDest) throw new Error('Destination address must be different from the source address')
            const tx = createRedelegateMsg(
                address,
                txBody.validatorSrc,
                txBody.validatorDest,
                txBody.amount * 1000000,
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
                status: 'PENDING'
            }
            const res = await axios.post("/api/transaction/create", data);
            const { _id } = res.data;
            router.push(`/multisig/${address}/transaction/${_id}`)
            openLoadingNotification('close')
            openNotification('success', 'Created successfully')
        }
        catch (e) {
            openLoadingNotification('close')
            openNotification('error', e.message)
        }
    }

    const handleKeyGroupChange = (e) => {
        if (e.target.name === 'amount') {
            setAmountError('')
            setTxBody({
                ...txBody,
                [e.target.name]: parseFloat(e.target.value)
            })
            if (parseFloat(e.target.value) > maxAmount) {
                setAmountError('Amount should be lower than delegation amount')
            }
        }
        else if (e.target.name === 'fee' || e.target.name === 'gas') {
            setTxBody({
                ...txBody,
                [e.target.name]: parseInt(e.target.value)
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
            validatorSrc: e.target.value
        })
        if (e.target.value === txBody.validatorDest) setValError('Destination address must be different from the source address')
        else setValError('')
        const filter = delegations.filter(del => del.delegation.validatorAddress === e.target.value)
        const delegation = filter[0]
        setMaxAmount(parseInt(delegation.balance.amount) / 1000000)
    }

    const handleSelectVal = (e) => {
        setTxBody({
            ...txBody,
            validatorDest: e.target.value
        })
        if (e.target.value === txBody.validatorSrc) setValError('Destination address must be different from the source address')
        else setValError('')
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
                                width: '100%',
                                padding: '1em',
                                borderRadius: '10px',
                            }}
                        >
                            {
                                delegations.map((delegation, index) => {
                                    return (
                                        <option
                                            value={delegation.delegation.validatorAddress}
                                            key={index}
                                        >
                                            {delegation.delegation.validatorAddress}
                                        </option>
                                    )
                                })
                            }
                        </select>) : (
                        <div
                            style={{
                                width: '100%',
                                padding: '1em',
                                borderRadius: '10px',
                                backgroundColor: '#808080',
                                color: 'white'
                            }}
                        >
                            This address hasn't delegate to any validators yet!
                        </div>
                    )
                }

            </div>
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
                    onChange={handleSelectVal}
                    style={{
                        width: '100%',
                        padding: '1em',
                        borderRadius: '10px',
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
            <text
                style={{
                    color: 'red',
                    fontSize: '.75rem'
                }}
            >
                {valError}
            </text>
            <h4
                style={{
                    marginBottom: 0
                }}
            >
                {`Delegation amount (${chain.denom.split('u')[1].toUpperCase()})`}
            </h4>
            <div
                style={{
                    width: '100%',
                    padding: '1em',
                    borderRadius: '10px',
                    backgroundColor: '#808080',
                    color: 'white',
                    marginBottom: '10px'
                }}
            >
                {maxAmount}
            </div>
            <Input
                onChange={(e) => {
                    handleKeyGroupChange(e);
                }}
                value={txBody.amount}
                label={`Amount (${chain.denom.split('u')[1].toUpperCase()})`}
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
                handleCreate={handleCreate}
                chain={chain}
                style={style}
                disabled={disabled()}
            />
        </div>
    )
}

export default RedelegateMsg