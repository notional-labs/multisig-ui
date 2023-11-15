import { getValueFromDenom, getDisplayDenom, denomShortender, getDisplayValueWithChainInfo, getDisplayDenomWithChainInfo } from "../../../libs/stringConvert"
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

const TransferMsg = ({ parentStyle, msg, chain }) => {
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
                    Amount:
                </motion.label>
                <motion.div
                    whileTap={{ scale: 0.9 }}
                    whileHover={{ scale: 1.05 }}
                    style={
                        style.value
                    }
                >
                    {`${msg.value.amount.length > 0 && getDisplayValueWithChainInfo(msg.value.amount[0].amount, msg.value.amount[0].denom, chain)} `}
                    {msg.value.amount.length > 0 && denomShortender(getDisplayDenomWithChainInfo(msg.value.amount[0].denom, chain).toUpperCase())}
                </motion.div>
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
                    To:
                </motion.label>
                <motion.div
                    whileTap={{ scale: 0.9 }}
                    whileHover={{ scale: 1.05 }}
                    style={
                        style.value
                    }
                >
                    {msg.value.toAddress}
                </motion.div>
            </div>
        </>
    )
}

export default TransferMsg