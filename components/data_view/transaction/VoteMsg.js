import { Tooltip } from "antd"

const VoteMsg = ({ tx, style, chain }) => {
    return (
        <>
            <div
                style={style.flexRow}
            >
                <label
                    style={style.label}
                >
                    Proposal Id:
                </label>
                <Tooltip placement="bottom" title="Check transaction in block explorer">
                    <div
                        style={style.value}
                    >
                        <a
                            href={`${chain.explorer}proposals/${tx.msgs[0].value.proposalId}`}
                            target="_blank"
                        >
                            {(tx.msgs[0].value.proposalId)}
                        </a>
                    </div>
                </Tooltip>
            </div>
            <div
                style={style.flexRow}
            >
                <label
                    style={style.label}
                >
                    Option:
                </label>
                <div
                    style={style.value}
                >
                    {tx.msgs[0].value.option}
                </div>
            </div>
        </>
    )
}

export default VoteMsg