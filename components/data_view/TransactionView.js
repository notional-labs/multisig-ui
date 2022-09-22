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
import { decode } from "uint8-to-base64";
import { StargateClient, makeMultisignedTx } from "@cosmjs/stargate";
import { getAccount, getSequence } from "../../libs/keplrClient";
import axios from "axios";
import BroadcastButton from "../input/BroadcastButton";
import HashView from "./HashView";
import { TxRaw } from "cosmjs-types/cosmos/tx/v1beta1/tx"

const TransactionView = () => {
    const [currentSignatures, setCurrentSignatures] = useState([]);
    const [transactionHash, setTransactionHash] = useState("");
    const [txInfo, setTxInfo] = useState(null)
    const [multisig, setMultisig] = useState(null)
    const { chain, wrapper } = useContext(ChainContext)
    const router = useRouter()
    const { transactionID, multisigID } = router.query

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
                openNotification("error", "fail to retrieve transaction from database " + e.message)
            }
        })()
    }, [transactionID])

    useEffect(() => {
        (async () => {
            try {
                if (!multisigID) return
                const multisigInfo = await getMultisigFromAddress(multisigID)
                const id = prefixToId[`${multisigInfo.prefix}`]
                const current = localStorage.getItem("current")
                if (!current || current !== id) {
                    wrapper(id)
                    localStorage.setItem("current", id)
                }
                multisigInfo && setMultisig(multisigInfo)
            }
            catch (e) {
                openNotification("error", "fail to retrieve multisig from database " + e.message)
            }
        })()
    }, [multisigID])

    const addSignature = (signature) => {
        setCurrentSignatures([
            ...currentSignatures,
            signature
        ])
    }

    const removeSignature = (id) => {
        const filterSignatures = currentSignatures.filter(sig => sig._id !== id)
        setCurrentSignatures([...filterSignatures])
    }

    const editSignature = (signature) => {
        const editSignatures = currentSignatures.map((sig) => {
            if (sig._id === signature._id) {
                return signature
            }
            return sig
        })
        setCurrentSignatures([...editSignatures])
    }

    const broadcastTx = async () => {
        openLoadingNotification("open", "Broadcasting transaction")
        try {
            const signatures = new Map();
            currentSignatures.forEach((signature) => {
                signatures.set(signature.address, decode(signature.signature));
            });

            const bodyBytes = decode(currentSignatures[0].bodyBytes);
            const pubkey = JSON.parse(multisig.pubkeyJSON)
            const account = await getSequence(chain.api, multisigID)
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
            await axios.post(`/api/transaction/${transactionID}/update`, {
                txHash: result.transactionHash,
                multisigID: multisigID
            });
            setTransactionHash(result.transactionHash);
            openLoadingNotification("close")
            openNotification("success", "Broadcast successfully")
        } catch (e) {
            openLoadingNotification("close")
            openNotification("error", e.message)
        }
    }

    return (
        <div
            style={{
                backgroundColor: "#ffffff",
                boxShadow: " 0px 0px 20px 2px rgba(0, 0, 0, 0.25)",
                padding: "2em 3em",
                borderRadius: "30px",
                position: "relative",
                zIndex: 1,
                width: "100%"
            }}
        >
            <h1
                style={{
                    textAlign: "center"
                }}
            >
                {
                    transactionHash ? "Completed Transaction" : "In Progress Transaction"
                }
            </h1>
            {
                txInfo ? (
                    <TransactionInfo
                        tx={txInfo}
                        chain={chain}
                        txHash={transactionHash}
                    />
                ) : (
                    <div
                        style={{
                            width: "100%",
                            textAlign: "center",
                            marginTop: "20px"
                        }}
                    >
                        <Spin size="large" />
                    </div>
                )
            }
            {
                transactionHash ? (
                    <HashView
                        chain={chain}
                        txHash={transactionHash}
                    />
                ) : txInfo ? (
                    <JSONView
                        tx={txInfo}
                    />
                ) : (
                    <div
                        style={{
                            width: "100%",
                            textAlign: "center",
                            marginTop: "20px",
                            padding: "1em 1.5em",
                            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.25)",
                            borderRadius: "10px"
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
                            width: "100%",
                            textAlign: "center",
                            marginTop: "20px",
                            padding: "1em 1.5em",
                            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.25)",
                            borderRadius: "10px"
                        }}
                    >
                        <Spin size="large" />
                    </div>
                )
            }
            {
                !transactionHash 
                && multisig 
                && currentSignatures.length >= parseInt(JSON.parse(multisig.pubkeyJSON).value.threshold, 10) 
                && (
                    <BroadcastButton
                        broadcastTx={broadcastTx}
                        multisig={multisig}
                        chain={chain}
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
                        chain={chain}
                        multisig={multisig}
                        multisigID={multisigID}
                        removeSignature={removeSignature}
                        editSignature={editSignature}
                    />
                )
            }
        </div>
    )
}

export default TransactionView