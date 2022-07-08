import { useEffect, useState } from "react"
import ShareForm from "./ShareForm"
import { getRewards } from "../../../libs/validators"
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
        gas: 200000,
        fee: 0,
        memo: '',
    })

    const invalidForm = () => {
        for (let key in txBody) {
            if (key !== 'memo' && txBody[key] === '') return true
        }
        if (rewards.length === 0) return true
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
                const res = await getRewards(chain.api, address)
                setRewards([...res.rewards])
            }
            catch (e) {
                openNotification('error', e.message)
            }
        })()
    }, [chain])

    const handleCreate = async () => {
        openLoadingNotification('open', 'Creating transaction')
        try {
            const validator_addresses = rewards.map(reward => reward.validator_address)
            const tx = createWithdrawRewardsMsg(
                address,
                validator_addresses,
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
                        <div
                            style={{
                                width: '100%',
                                padding: '1em',
                                borderRadius: '10px',
                                maxHeight: '100px',
                                overflow: 'auto',
                                border: 'solid 1px black'
                            }}
                        >
                            <table
                                style={{
                                    width: '100%',
                                    borderSpacing: '0 1em',
                                }}
                            >
                                <thead
                                    style={{
                                        borderBottom: 'solid 1.25px black',
                                        fontSize: '1rem'
                                    }}
                                >
                                    <tr>
                                        <th
                                            style={{
                                                width: '60%',
                                                padding: '.5em 0',
                                                textAlign: 'left'
                                            }}
                                        >
                                            Validator Address
                                        </th>
                                        <th
                                            style={{
                                                width: '40%',
                                                padding: '.5em',
                                                textAlign: 'left'
                                            }}
                                        >
                                            Reward
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        rewards.map((reward, index) => {
                                            return (
                                                <tr
                                                    key={index}
                                                >
                                                    <td
                                                        style={{
                                                            width: '60%',
                                                            paddingTop: '1em'
                                                        }}
                                                    >
                                                        {reward.validator_address}
                                                    </td>
                                                    <td
                                                        style={{
                                                            width: '40%',
                                                            paddingTop: '1em'
                                                        }}
                                                    >
                                                        {(parseFloat(reward.reward[0].amount) / 1000000).toFixed(2)} {reward.reward[0].denom.split('u')[1].toUpperCase()}
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>) : (
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