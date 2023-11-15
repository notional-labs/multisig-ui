import TransferMsg from "./transaction/TransferMsg"
import DelegateMsg from "./transaction/DelegateMsg"
import RedelegateMsg from "./transaction/RedelegateMsg"
import UndelegateMsg from "./transaction/UndelegateMsg"
import VoteMsg from "./transaction/VoteMsg"
import { Tooltip } from "antd"

const style = {
    label: {
        backgroundColor: "#000000",
        padding: "1em 1.5em",
        borderRadius: "10px 0 0 10px",
        display: "block",
        color: "white",
        fontSize: "1rem",
        width: "20%",
        textAlign: "center"
    },
    value: {
        backgroundColor: "#D9D9D9",
        padding: "1em 1.5em",
        borderRadius: "0px 10px 10px 0px",
        display: "block",
        color: "#000000",
        fontSize: "1rem",
        width: "80%",
        textAlign: "left",
        overflowX: "hidden"
    },
    flexRow: {
        display: "flex",
        justifyContent: "start",
        marginBottom: "20px"
    }
}

const TransactionInfo = ({ tx, txHash, chain }) => {

    const msgInfo = (type, msg) => {
        let jsx
        switch (type) {
            case "/cosmos.bank.v1beta1.MsgSend":
                jsx = <TransferMsg
                    msg={msg}
                    parentStyle={style}
                    chain={chain}
                />
                break;
            case "/cosmos.staking.v1beta1.MsgDelegate":
                jsx = <DelegateMsg
                    msg={msg}
                    parentStyle={style}
                    chain={chain}
                />
                break;

            case "/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward":
                jsx = <div></div>
                break;

            case "/cosmos.staking.v1beta1.MsgBeginRedelegate":
                jsx = <RedelegateMsg
                    msg={msg}
                    parentStyle={style}
                    chain={chain}
                />
                break;

            case "/cosmos.staking.v1beta1.MsgUndelegate":
                jsx = <UndelegateMsg
                    msg={msg}
                    parentStyle={style}
                    chain={chain}
                />
                break;

            case "/cosmos.gov.v1beta1.MsgVote":
                jsx = <VoteMsg
                    msg={msg}
                    parentStyle={style}
                    chain={chain}
                />
                break;
        }

        return jsx
    }

    return (
        <div
            style={{
                width: "100%"
            }}
        >
            {
                txHash && (
                    <div
                        style={style.flexRow}
                    >
                        <label
                            style={style.label}
                        >
                            Tx hash:
                        </label>
                        <Tooltip placement="bottom" title="Check transaction in block explorer">
                            <div
                                style={style.value}
                            >
                                <a
                                    href={`${chain.txExplorer}${txHash}`}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    {txHash}
                                </a>
                            </div>
                        </Tooltip>
                    </div>
                )
            }
            <div
                style={style.flexRow}
            >
                <div
                    style={{
                        ...style.label,
                        height: '55px'
                    }}
                >
                    Msgs:
                </div>
                <div
                    style={{
                        backgroundColor: "#D9D9D9",
                        width: "80%"
                    }}
                >
                    {
                        tx.msgs.map((msg, index) => {
                            return (
                                <div
                                    key={index}
                                    style={{
                                        borderBottom: 'solid 2px white'
                                    }}
                                >
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "start",
                                            color: "#ffffff",
                                            fontSize: "1rem",
                                            width: "100%",
                                            textAlign: "left",
                                            overflowX: "hidden",
                                            backgroundColor: "#757575",
                                            height: '55px'
                                        }}
                                    >
                                        <label
                                            style={{
                                                width: "20%",
                                                textAlign: 'center',
                                                padding: "1em",
                                            }}
                                        >
                                            @Type
                                        </label>
                                        <div
                                            style={{
                                                width: "80%",
                                                padding: "1em",
                                            }}
                                        >
                                            {msg.typeUrl}
                                        </div>
                                    </div>
                                    {
                                        msgInfo(msg.typeUrl, msg)
                                    }
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div
                style={style.flexRow}
            >
                <label
                    style={style.label}
                >
                    Gas (wanted):
                </label>
                <div
                    style={style.value}
                >
                    {tx.fee.gas}
                </div>
            </div>
            <div
                style={style.flexRow}
            >
                <label
                    style={style.label}
                >
                    Memo:
                </label>
                <div
                    style={style.value}
                >
                    {tx.memo}
                </div>
            </div>
        </div>
    )
}

export default TransactionInfo