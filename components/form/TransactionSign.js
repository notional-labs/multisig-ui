import { useState, useEffect, useCallback } from "react"
import Button from "../input/Button"
import { openNotification, openLoadingNotification } from "../ulti/Notification"
import { SigningStargateClient, } from "@cosmjs/stargate";
import { getAccount, getKey, getSequence } from "../../libs/keplrClient"
import { encode } from "uint8-to-base64";
import { multisigHasAddr } from "../../libs/checkTool";
import axios from "axios";
import { CheckOutlined } from '@ant-design/icons'
import AccountInfo from "../ulti/AccountInfo";
import FlexRow from "../flex_box/FlexRow";
import SignerList from "../list/SignerList";

const TransationSign = ({
    tx,
    transactionID,
    currentSignatures,
    addSignature,
    chain,
    multisig,
    multisigID,
    removeSignature,
    editSignature
}) => {
    const [hasSigned, setHasSigned] = useState(false)
    const [account, setAccount] = useState()
    const [accountError, setAccountError] = useState('')

    const keplrKeystorechangeHandler = useCallback(async (event) => {
        const currentAccount = await getKey(chain.chain_id)
        const hasSigned = currentSignatures.some(
            (sig) => sig.address === currentAccount.bech32Address
        );
        setHasSigned(hasSigned)
        setAccount(currentAccount)
    }, []);

    useEffect(() => {
        window.keplr && window.addEventListener("keplr_keystorechange", keplrKeystorechangeHandler)

        return () => {
            window.removeEventListener("keplr_keystorechange", keplrKeystorechangeHandler)
        }
    }, []);

    useEffect(() => {
        (async () => {
            try {
                const account = await getKey(chain.chain_id)
                const hasSigned = currentSignatures.some(
                    (sig) => sig.address === account.bech32Address
                );
                setAccount(account)
                setHasSigned(hasSigned)
            } catch (e) {
                console.log("enable err: ", e);
                openNotification('error', 'Failed to get account key')
            }
        })()
    }, [currentSignatures])

    useEffect(() => {
        if (checkAddrInMultisig()) {
            setAccountError('')
        }
        else {
            setAccountError('Your wallet account might be different from one that create the multisig! Make sure to switch to an appropriate account.')
        }
    }, [account])

    const checkAddrInMultisig = () => {
        if (!account) return false
        const pubkeys = JSON.parse(multisig.pubkeyJSON).value.pubkeys
        const check = multisigHasAddr(pubkeys, account.bech32Address, multisig.prefix)
        return check
    }

    const signTransaction = async () => {
        openLoadingNotification('open', 'Creating signature')
        try {
            window.keplr.defaultOptions = {
                sign: {
                    preferNoSetMemo: true,
                    preferNoSetFee: true,
                    disableBalanceCheck: true,
                },
            };
            const offlineSigner = window.getOfflineSignerOnlyAmino(
                chain.chain_id
            );
            const signAccount = await getAccount(chain.rpc, multisigID)

            const signingClient = await SigningStargateClient.offline(offlineSigner);
            const signerData = {
                accountNumber: parseInt(signAccount.accountNumber),
                sequence: parseInt(signAccount.sequence),
                chainId: chain.chain_id,
            };

            const { bodyBytes, signatures } = await signingClient.sign(
                account.bech32Address,
                tx.msgs,
                tx.fee,
                tx.memo,
                signerData
            );

            // check existing signatures
            const bases64EncodedSignature = encode(signatures[0]);
            const bases64EncodedBodyBytes = encode(bodyBytes);
            const prevSigMatch = currentSignatures.findIndex(
                (signature) => signature.signature === bases64EncodedSignature
            );

            if (prevSigMatch > -1) {
                throw new Error('This account has already signed')
            } else {
                const signature = {
                    bodyBytes: bases64EncodedBodyBytes,
                    signature: bases64EncodedSignature,
                    address: account.bech32Address,
                    accountNumber: signAccount.accountNumber,
                    sequence: signAccount.sequence
                };
                const res = await axios.post(
                    `/api/transaction/${transactionID}/signature`,
                    signature
                );
                addSignature(res.data);
                setHasSigned(true)
            }
            openLoadingNotification('close')
            openNotification('success', 'Sign successfully')
        } catch (e) {
            console.log("Error creating signature:", e.message);
            openLoadingNotification('close')
            openNotification('error', e.message)
        }
    }

    return (
        <div
            style={{
                boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.25)',
                borderRadius: '10px',
                padding: '2em',
                marginTop: '30px'
            }}
        >
            <h2>
                Sign Transaction
            </h2>
            {
                hasSigned ? (
                    <div
                        style={{
                            fontWeight: 'bold',
                            fontWeight: '1rem',
                            color: '#189A01'
                        }}
                    >
                        <CheckOutlined /> You have signed this transaction !
                    </div>
                ) : accountError !== '' ? (
                    <div
                        style={{
                            color: 'red'
                        }}
                    >
                        {accountError}
                    </div>
                ) : (
                    <Button
                        text={'Sign Transation'}
                        style={{
                            backgroundColor: 'black',
                            color: 'white',
                            padding: '1em',
                            width: '100%',
                            borderRadius: '10px',
                            marginTop: '20px',
                            border: 0
                        }}
                        clickFunction={signTransaction}
                    />
                )
            }
            <AccountInfo
                chain={chain}
                address={multisigID}
                currentSignatures={currentSignatures}
                tx={tx}
                transactionID={transactionID}
                walletAccount={account}
                setHasSigned={setHasSigned}
                removeSignature={removeSignature}
                editSignature={editSignature}
            />
        </div>
    )
}

export default TransationSign