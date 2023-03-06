import { useEffect, useState } from "react"
import { getProposals } from "../../../libs/queryClients"
import { createVoteMsg } from "../../../libs/transaction"
import { openNotification } from "../../ulti/Notification"
import { Radio, Space } from "antd";
import Button from "../../input/Button"

const VoteMsg = ({ chain, address, msgs, setMsgs, style }) => {
    const [proposals, setProposals] = useState([])
    const [txBody, setTxBody] = useState({
        option: 1,
        proposalId: "",
        gas: 200000,
        fee: 0,
        memo: "",
    })

    const invalidForm = () => {
        return txBody.option === 0 || txBody.proposalId === ""
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
                const res = await getProposals(chain.api, address)
                res.proposals && setProposals([...res.proposals])
                res.proposals && res.proposals.length > 0 && setTxBody({
                    ...txBody,
                    proposalId: res.proposals[0].proposal_id
                })
            }
            catch (e) {
                openNotification("error", e.message)
            }
        })()
    }, [chain])

    const createMsg = async () => {
        try {
            const msg = createVoteMsg(
                txBody.option,
                txBody.proposalId,
                address,
            )
            await setMsgs([...msgs, msg])
            openNotification('success', 'Adding successfully')
        }
        catch (e) {
            openNotification('success', 'Adding unsuccessfully')
        }
    }

    const handleSelect = (e) => {
        const newTx = {
            ...txBody
        }
        newTx[e.target.name] = e.target.value
        setTxBody({
            ...newTx,
        })
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
                    Proposal
                </h4>
                {
                    proposals.length > 0 ? (
                        <select
                            onChange={handleSelect}
                            style={{
                                width: "100%",
                                padding: "1em",
                                borderRadius: "10px",
                            }}
                            name={"proposalId"}
                        >
                            {
                                proposals.map((proposal, index) => {
                                    return (
                                        <option
                                            value={proposal.proposal_id}
                                            key={index}
                                        >
                                            # {proposal.proposal_id} {proposal.content.title}
                                        </option>
                                    )
                                })
                            }
                        </select>

                    ) : (
                        <div
                            style={{
                                width: "100%",
                                borderRadius: "10px",
                                height: "50px",
                                backgroundColor: "transparent",
                                padding: "1em",
                                border: "solid 1px black",
                                color: "red"
                            }}
                        >
                            No proposals in voting period yet!
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
                    Option
                </h4>
                <Radio.Group
                    onChange={handleSelect}
                    value={txBody.option}
                    name={"option"}
                >
                    <Space direction="horizontal">
                        <Radio value={1}>Yes</Radio>
                        <Radio value={3}>No</Radio>
                        <Radio value={4}>No With Veto</Radio>
                        <Radio value={2}>Abstain</Radio>
                    </Space>
                </Radio.Group>
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

export default VoteMsg