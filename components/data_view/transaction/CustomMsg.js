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

const CustomMsg = ({ chain, parentStyle, msg }) => {
    return (
        <div>
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
                    a
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
                   b
                </motion.div>
            </div>
        </>
        </div>
    )
}

export default CustomMsg