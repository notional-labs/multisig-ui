import { useEffect, useState } from "react"
import { getRewards } from "../../../libs/queryClients"
import { createWithdrawRewardsMsg } from "../../../libs/transaction"
import { openNotification } from "../../ulti/Notification"
import ValidatorRow from "../../data_view/ValidatorRow"
import { getValueFromDenom } from "../../../libs/stringConvert"
import Button from "../../input/Button"

const WithdrawMsg = ({ chain, address, msgs, setMsgs, style }) => {
    const [rewards, setRewards] = useState([])

    const invalidForm = () => {
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
                openNotification("error", e.message)
            }
        })()
    }, [chain])

    const createMsg = async () => {
        try {
            const validator_addresses = rewards.map(reward => reward.validator_address)
            const messages = createWithdrawRewardsMsg(
                address,
                validator_addresses,
            )
            await setMsgs([...msgs, ...messages])
            openNotification('success', 'Adding successfully')
        }
        catch (e) {
            openNotification('success', 'Adding unsuccessfully')
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
                                width: "100%",
                                padding: "1em",
                                borderRadius: "10px",
                                maxHeight: "100px",
                                overflow: "auto",
                                border: "solid 1px black"
                            }}
                        >
                            <table
                                style={{
                                    width: "100%",
                                    borderSpacing: "0 1em",
                                }}
                            >
                                <thead
                                    style={{
                                        borderBottom: "solid 1.25px black",
                                        fontSize: "1rem"
                                    }}
                                >
                                    <tr>
                                        <th
                                            style={{
                                                width: "60%",
                                                padding: ".5em 0",
                                                textAlign: "left"
                                            }}
                                        >
                                            Validator
                                        </th>
                                        <th
                                            style={{
                                                width: "40%",
                                                padding: ".5em",
                                                textAlign: "left"
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
                                                            width: "60%",
                                                            paddingTop: "1em"
                                                        }}
                                                    >
                                                        <a
                                                            href={`${chain.valExplorer}${reward.validator_address}`}
                                                            target={"_blank"}
                                                            rel="noreferrer"
                                                        >
                                                            <ValidatorRow
                                                                address={reward.validator_address}
                                                                chain={chain}
                                                            />
                                                        </a>
                                                    </td>
                                                    <td
                                                        style={{
                                                            width: "40%",
                                                            paddingTop: "1em"
                                                        }}
                                                    >
                                                        {getValueFromDenom(reward.reward[0].denom, reward.reward[0].amount)} 
                                                        {reward.reward[0].denom.substring(1).toUpperCase()}
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

export default WithdrawMsg