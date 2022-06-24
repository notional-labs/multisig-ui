import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { getTransactionById } from "../../libs/transaction";
import { getMultisigFromAddress } from "../../libs/multisig";
import { openNotification } from "../ulti/Notification";
import TransactionInfo from "./TransactionInfo";
import ThresholdInfo from "./ThresholdInfo";
import JSONView from "./JSONView";
import { Spin } from "antd";
import { ChainContext } from "../Context";
import { prefixToId } from "../../data/chainData";

const TransactionView = ({ }) => {
    const [currentSignatures, setCurrentSignatures] = useState([]);
    const [broadcastError, setBroadcastError] = useState('');
    const [isBroadcasting, setIsBroadcasting] = useState(false);
    const [transactionHash, setTransactionHash] = useState('');
    const [txInfo, setTxInfo] = useState(null)
    const [multisig, setMultisig] = useState(null)
    const addSignature = (signature) => {
        setCurrentSignatures((currentSignatures) => [
            ...currentSignatures,
            signature,
        ]);
    };
    const { chain, wrapper } = useContext(ChainContext)

    const router = useRouter()
    const { transactionID, multisigID } = router.query

    useEffect(() => {
        (async () => {
            try {
                if (!transactionID) return
                const transaction = await getTransactionById(transactionID)
                console.log(transaction)
                transaction.dataJSON && setTxInfo(JSON.parse(transaction.dataJSON))
                setTransactionHash(transaction.txHash)
                setCurrentSignatures([...transaction.signatures.data])
            }
            catch (e) {
                openNotification('error', 'fail to retrieve transaction from database ' + e.message)
            }
        })()
    }, [transactionID])

    useEffect(() => {
        (async () => {
            try {
                if (!multisigID) return
                const multisig = await getMultisigFromAddress(multisigID)
                const id = prefixToId[`${multisig.prefix}`]
                wrapper(id)
                localStorage.setItem('current', id)
                multisig.pubkeyJSON && setMultisig(JSON.parse(multisig.pubkeyJSON))
            }
            catch (e) {
                openNotification('error', 'fail to retrieve multisig from database ' + e.message)
            }
        })()
    }, [multisigID])

    return (
        <div
            style={{
                marginLeft: '300px',
                backgroundColor: '#ffffff',
                boxShadow: ' 0px 0px 20px 2px rgba(0, 0, 0, 0.25)',
                padding: '2em 3em',
                borderRadius: '30px',
                position: 'relative',
                zIndex: 1,
                width: '100%'
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
            {
                txInfo ? (
                    <JSONView
                        tx={txInfo}
                    />
                ) : (
                    <div
                        style={{
                            width: '100%',
                            textAlign: 'center',
                            marginTop: '20px',
                            padding: '1em 1.5em',
                            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.25)',
                            borderRadius: '10px'
                        }}
                    >
                        <Spin size="large" />
                    </div>
                )
            }
            {
                multisig && txInfo && !transactionHash ? (
                    <ThresholdInfo 
                        signatures={currentSignatures}
                        threshold={multisig.value.threshold}
                    />
                ) : (
                    <div
                        style={{
                            width: '100%',
                            textAlign: 'center',
                            marginTop: '20px',
                            padding: '1em 1.5em',
                            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.25)',
                            borderRadius: '10px'
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