import FlexRow from "../flex_box/FlexRow"
import { addressShortener } from "../../libs/stringConvert"
import Button from "../input/Button"
import { deleteSignature, updateSignature } from "../../libs/faunaClient"
import { openLoadingNotification, openNotification } from "../ulti/Notification"
import Tooltip from "antd/lib/tooltip"
import { RetweetOutlined, DeleteOutlined } from "@ant-design/icons"
import { SigningStargateClient } from "@cosmjs/stargate/build/signingstargateclient"
import { encode } from "uint8-to-base64"

const SignerList = ({
    currentSignatures,
    account,
    style,
    chain,
    address,
    walletAccount,
    tx,
    addSignature,
    setHasSigned,
    transactionID
}) => {

    const deleteSig = async (id) => {
        openLoadingNotification('open', 'Deleting Signature')
        try {
            await deleteSignature(id)
            openLoadingNotification('close')
            openNotification('success', 'Successfully delete signature')
        }
        catch (e) {
            openLoadingNotification('close')
            openNotification('error', 'Unsuccessfully delete signature ' + e.message)
        }
    }

    const updateSig = async (id) => {
        openLoadingNotification('open', 'Resigning Signature')
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
            const signAccount = await getSequence(chain.api, address)

            const signingClient = await SigningStargateClient.offline(offlineSigner);
            const signerData = {
                accountNumber: parseInt(signAccount.account_number),
                sequence: parseInt(signAccount.sequence),
                chainId: chain.chain_id,
            };

            const { bodyBytes, signatures } = await signingClient.sign(
                walletAccount.bech32Address,
                tx.msgs,
                tx.fee,
                tx.memo,
                signerData
            );

            // check existing signatures
            const bases64EncodedSignature = encode(signatures[0]);
            const bases64EncodedBodyBytes = encode(bodyBytes);
            const signature = {
                id: id,
                bodyBytes: bases64EncodedBodyBytes,
                signature: bases64EncodedSignature,
                address: account.bech32Address,
                accountNumber: signAccount.account_number,
                sequence: signAccount.sequence
            };

            addSignature(signature);
            setHasSigned(true)
            await updateSignature(signature, transactionID)
            openLoadingNotification('close')
            openNotification('success', 'Successfully update signature')
        }
        catch (e) {
            openLoadingNotification('close')
            openNotification('error', 'Unsuccessfully update signature ' + e.message)
        }
    }

    const actionButtons = (id) => {
        return (
            <FlexRow
                components={[
                    <Button
                        text={(
                            <Tooltip
                                placement="top"
                                title={'Resigning signature'}
                            >
                                <RetweetOutlined />
                            </Tooltip>
                        )}
                        clickFunction={async () => await updateSig(id)}
                        style={{
                            border: 0,
                            color: 'white',
                            width: '45%',
                            borderRadius: '10px',
                            backgroundColor: 'black',
                            height: '30px',
                            margin: 'auto 0'
                        }}
                    />,
                    <Button
                        text={(
                            <Tooltip
                                placement="top"
                                title={'Delete signature'}
                            >
                                <DeleteOutlined />
                            </Tooltip>
                        )}
                        clickFunction={async () => await deleteSig(id)}
                        style={{
                            border: 0,
                            backgroundColor: '#ff384f',
                            color: 'white',
                            width: '45%',
                            borderRadius: '10px',
                            height: '30px',
                            margin: 'auto 0'
                        }}
                    />
                ]}
                justifyContent={'space-between'}
                style={{
                    width: '100px'
                }}
            />
        )
    }

    const checkStatus = (key, value) => {
        return parseInt(account[key]) === value
    }

    const circle = (key, value) => {
        return (
            <span
                style={{
                    width: '10px',
                    height: '10px',
                    backgroundColor: !checkStatus(key, value) ? '#D82D2C' : '#189A01',
                    borderRadius: '50%',
                    display: 'inline-block',
                    position: 'relative',
                    margin: 'auto 10px auto 0'
                }}
            />
        )
    }

    return (
        <div
            style={{
                maxHeight: '200px',
                overflow: 'hidden',
                border: 'solid 1px black',
                padding: '.5em 1em',
                borderRadius: '10px',
            }}
        >
            <table
                style={{
                    width: '100%',
                    borderSpacing: '0 1em',
                }}
            >
                <thead
                    style={{
                        borderBottom: 'solid 1.25px black',
                        fontSize: '1rem'
                    }}
                >
                    <tr>
                        <th
                            style={{
                                width: '30%',
                                padding: '.5em 0',
                                textAlign: 'left'
                            }}
                        >
                            Address
                        </th>
                        <th
                            style={{
                                width: '40%',
                                padding: '.5em',
                                textAlign: 'left'
                            }}
                        >
                            Sig Info
                        </th>
                        <th
                            style={{
                                width: '10%',
                                padding: '.5em',
                                textAlign: 'center'
                            }}
                        >
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        currentSignatures.map((sig, index) => {
                            return (
                                <tr
                                    key={index}
                                >
                                    <td
                                        style={{
                                            width: '30%',
                                            paddingTop: '1em'
                                        }}
                                    >
                                        <Tooltip
                                            placement="top"
                                            title={sig.address}
                                        >
                                            {addressShortener(sig.address)}
                                        </Tooltip>
                                    </td>
                                    <td
                                        style={{
                                            width: '40%',
                                            paddingTop: '1em'
                                        }}
                                    >
                                        <FlexRow
                                            components={[
                                                circle('accountNumber', sig.accountNumber),
                                                <text>
                                                    Account Number:
                                                </text>,
                                                <text
                                                    style={style.value}
                                                >
                                                    {sig.accountNumber}
                                                </text>
                                            ]}
                                            justifyContent={'start'}
                                        />
                                        <FlexRow
                                            components={[
                                                circle('sequence', sig.sequence),
                                                <text>
                                                    Sequence:
                                                </text>,
                                                <text
                                                    style={style.value}
                                                >
                                                    {sig.sequence}
                                                </text>
                                            ]}
                                            justifyContent={'start'}
                                        />
                                    </td>
                                    <td
                                        style={{
                                            width: '10%',
                                            paddingTop: '1em',
                                        }}
                                    >
                                        {
                                            actionButtons(sig._id)
                                        }
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default SignerList