import Button from "../input/Button"
import { CloseOutlined } from '@ant-design/icons'
import { motion } from "framer-motion"

const TransactionImport = ({ multisigID, chain, router, wrapSetClose }) => {
    return (
        <motion.div
            initial={{
                y: -60,
                opacity: 0,

            }}
            animate={{
                y: 0,
                opacity: 1
            }}
            style={{
                backgroundColor: '#ffffff',
                boxShadow: ' 0px 0px 20px 2px rgba(0, 0, 0, 0.25)',
                padding: '2em 3em',
                borderRadius: '10px',
                position: 'relative',
                zIndex: 1,
                width: '100%',
                marginTop: '50px'
            }}
        >
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '10px'
                }}
            >
                <h2
                    style={{
                        marginBottom: 0,
                        textAlign: 'left'
                    }}
                >
                    Import Transaction
                </h2>
                <Button
                    text={(
                        <CloseOutlined />
                    )}
                    style={{
                        position: 'relative',
                        top: '0px',
                        border: 0,
                        backgroundColor: 'transparent',
                        fontWeight: 'bold',
                        fontSize: '1.25rem'
                    }}
                    clickFunction={wrapSetClose}
                />
            </div>

        </motion.div>
    )
}

export default TransactionImport