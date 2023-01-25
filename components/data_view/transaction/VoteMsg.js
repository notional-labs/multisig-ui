import { Tooltip } from "antd"
import { motion } from "framer-motion"

const style = {
    label: {
        width: "20%",
        textAlign: "center",
        fontWeight: "bold",
        padding: '1em'
    },
    value: {
        width: "80%",
        padding: '1em'
    }
}

const options = {
    1: "yes",
    2: "abstain",
    3: "no",
    4: "no with veto"
}

const VoteMsg = ({ chain, parentStyle, msg }) => {
    return (
        <>
            <div
                style={{
                    ...parentStyle.flexRow,
                    marginBottom: 0,
                    borderBottom: 'solid .5px white'
                }}
            >
                <motion.label
                    whileTap={{ scale: 0.9 }}
                    whileHover={{ scale: 1.05 }}
                    style={
                        style.label
                    }
                >
                    Proposal Id:
                </motion.label>
                <Tooltip placement="bottom" title="Check proposal in block explorer">
                    <motion.div
                        style={
                            style.value
                        }
                    >
                        <a
                            href={`${chain.govExplorer}${msg.value.proposalId}`}
                            target="_blank"
                            rel="noreferrer"
                        >
                            {(msg.value.proposalId)}
                        </a>
                    </motion.div>
                </Tooltip>
            </div>
            <div
                style={{
                    ...parentStyle.flexRow,
                    marginBottom: 0,
                    borderBottom: 'solid .5px white'
                }}
            >
                <motion.label
                    whileTap={{ scale: 0.9 }}
                    whileHover={{ scale: 1.05 }}
                    style={
                        style.label
                    }
                >
                    Option:
                </motion.label>
                <motion.div
                    whileTap={{ scale: 0.9 }}
                    whileHover={{ scale: 1.05 }}
                    style={
                        style.value
                    }
                >
                    {options[`${msg.value.option}`]}
                </motion.div>
            </div>
        </>
    )
}

export default VoteMsg
