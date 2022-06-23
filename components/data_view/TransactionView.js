import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getTransactionById } from "../../libs/transaction";
import { openNotification } from "../ulti/Notification";
import TransactionInfo from "./TransactionInfo";
import { Spin } from "antd";

const TransactionView = ({ }) => {
    const [currentSignatures, setCurrentSignatures] = useState([]);
    const [broadcastError, setBroadcastError] = useState('');
    const [isBroadcasting, setIsBroadcasting] = useState(false);
    const [transactionHash, setTransactionHash] = useState('');
    const [txInfo, setTxInfo] = useState(null)
    const addSignature = (signature) => {
        setCurrentSignatures((currentSignatures) => [
            ...currentSignatures,
            signature,
        ]);
    };
    const router = useRouter()
    const { transactionID } = router.query

    useEffect(() => {
        (async () => {
            try {
                if (!transactionID) return
                const transaction = await getTransactionById(transactionID)
                transaction.dataJSON && setTxInfo(JSON.parse(transaction.dataJSON))
                setTransactionHash(transaction.txHash)
                setCurrentSignatures([...transaction.signatures.data])
            }
            catch (e) {
                openNotification('error', 'fail to retrieve transaction from database' + e.message)
            }
        })()
    }, [transactionID])

    return (
        <div
            style={{
                width: '60%',
                margin: 'auto',
                backgroundColor: '#ffffff',
                boxShadow: ' 0px 0px 20px 2px rgba(0, 0, 0, 0.25)',
                padding: '2em',
                borderRadius: '30px',
            }}
        >
            <h1
                style={{
                    textAlign: 'center'
                }}
            >
                {
                    transactionHash ? 'Completed Transaction' : 'In Progress Transaction'
                }
            </h1>
            {
                txInfo ? (
                    <TransactionInfo
                        tx={txInfo}
                    />
                ) : (
                    <div
                        style={{
                            width: '100%',
                            textAlign: 'center',
                            marginTop: '20px'
                        }}
                    >
                        <Spin size="large" />
                    </div>
                )
            }
        </div>
    )
}

export default TransactionView