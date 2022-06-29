import { useEffect, useState } from "react"
import { getDelegations, getRewards, } from "../../../libs/validators"
import Input from "../../input/Input"
import ShareForm from "./ShareForm"
import { createWithdrawRewardsMsg } from "../../../libs/transaction"
import { openLoadingNotification, openNotification } from "../../ulti/Notification"
import axios from "axios"

const style = {
    input: {
        marginBottom: '10px',
        color: 'black'
    }
}


const WithdrawMsg = ({ chain, router, address }) => {
    const [rewards, setRewards] = useState([])
    const [txBody, setTxBody] = useState({
        validator: '',
        gas: 20000,
        fee: 0,
        memo: '',
    })

    const invalidForm = () => {
        for (let key in txBody) {
            if (key !== 'memo' && txBody[key] === '') return true
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
                const res = await getRewards(chain.rpc, address)
                console.log(res)
                
            }
            catch (e) {
                openNotification('error', e.message)
            }
        })()
    }, [chain])

    const handleCreate = async () => {
        openLoadingNotification('open', 'Creating transaction')
        try {
            const tx = createWithdrawRewardsMsg(
                address,
                txBody.validator,
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
        if (e.target.name === 'fee' || e.target.name === 'gas') {
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
                    Rewards
                </h4>
                {
                    rewards.length > 0 ? (
                        <select
                            onChange={handleSelect}
                            style={{
                                width: '100%',
                                padding: '1em',
                                borderRadius: '10px',
                            }}
                        >
                            {
                                rewards.map((delegation, index) => {
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

export default WithdrawMsg