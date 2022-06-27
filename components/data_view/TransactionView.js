import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { getTransactionById } from "../../libs/transaction";
import { getMultisigFromAddress } from "../../libs/multisig";
import { openNotification, openLoadingNotification } from "../ulti/Notification";
import TransactionInfo from "./TransactionInfo";
import ThresholdInfo from "./ThresholdInfo";
import JSONView from "./JSONView";
import { Spin } from "antd";
import { ChainContext } from "../Context";
import { prefixToId } from "../../data/chainData";
import TransationSign from "../form/TransactionSign";
import Button from "../input/Button";
import { decode } from "uint8-to-base64";
import { StargateClient, makeMultisignedTx } from "@cosmjs/stargate";
import { TxRaw } from "@cosmjs/stargate/build/codec/cosmos/tx/v1beta1/tx";
import { getAccount } from "../../libs/keplrClient";
import axios from "axios";

const TransactionView = ({ }) => {
    const [currentSignatures, setCurrentSignatures] = useState([]);
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
                multisig && setMultisig(multisig)
            }
            catch (e) {
                openNotification('error', 'fail to retrieve multisig from database ' + e.message)
            }
        })()
    }, [multisigID])

    const broadcastTx = async () => {
        openLoadingNotification('open', 'Broadcasting transaction')
        try {
            const signatures = new Map();
            currentSignatures.forEach((signature) => {
                signatures.set(signature.address, decode(signature.signature));
            });

            const bodyBytes = decode(currentSignatures[0].bodyBytes);
            const pubkey = JSON.parse(multisig.pubkeyJSON)
            const account = await getAccount(chain.rpc, multisigID)
            const signedTx = makeMultisignedTx(
                pubkey,
                account.sequence,
                txInfo.fee,
                bodyBytes,
                signatures
            );
            const broadcaster = await StargateClient.connect(chain.rpc);
            const result = await broadcaster.broadcastTx(
                Uint8Array.from(TxRaw.encode(signedTx).finish())
            );
            console.log(result);
            const res = await axios.post(`/api/transaction/${transactionID}/update`, {
                txHash: result.transactionHash,
            });
            setTransactionHash(result.transactionHash);
            openLoadingNotification('close')
            openNotification('sucess', 'Broadcast successfully')
        } catch (e) {
            openLoadingNotification('close')
            openNotification('error', e.message)
        }
    }

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
                transactionHash ? (
                    <div></div>
                ) : multisig && txInfo ? (
                    <ThresholdInfo
                        signatures={currentSignatures}
                        threshold={JSON.parse(multisig.pubkeyJSON).value.threshold}
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
                !transactionHash && multisig && currentSignatures.length >= parseInt(JSON.parse(multisig.pubkeyJSON).value.threshold) && (
                    <Button
                        text={'Broadcast transaction'}
                        style={{
                            backgroundColor: 'black',
                            color: 'white',
                            padding: '1em',
                            width: '100%',
                            borderRadius: '10px',
                            marginTop: '20px',
                            border: 0
                        }}
                        clickFunction={async () => {
                            await broadcastTx()
                        }}
                    />
                )
            }
            {
                !transactionHash && txInfo && multisig && (
                    <TransationSign
                        tx={txInfo}
                        transactionID={transactionID}
                        currentSignatures={currentSignatures}
                        addSignature={addSignature}
                        chainId={chain.chain_id}
                        rpc={chain.rpc}
                        multisig={multisig}
                        multisigID={multisigID}
                    />
                )
            }
        </div>
    )
}

export default TransactionView