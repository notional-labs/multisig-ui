import { Tooltip } from "antd"

const options = {
    1: "yes",
    2: "no",
    3: "no with veto",
    4: "abstain"
}

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
                <Tooltip placement="bottom" title="Check proposal in block explorer">
                    <div
                        style={style.value}
                    >
                        <a
                            href={`${chain.govExplorer}${tx.msgs[0].value.proposalId}`}
                            target="_blank"
                            rel="noreferrer"
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
                    {options[`${tx.msgs[0].value.option}`]}
                </div>
            </div>
        </>
    )
}

export default VoteMsg