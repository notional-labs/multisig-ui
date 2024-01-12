import FlexRow from "../flex_box/FlexRow"
import { stringShortener } from "../../libs/stringConvert"
import Button from "../input/Button"
import { openLoadingNotification, openNotification } from "../ulti/Notification"
import Tooltip from "antd/lib/tooltip"
import { RetweetOutlined, DeleteOutlined } from "@ant-design/icons"
import { encode } from "uint8-to-base64"
import { getSequence } from "../../libs/keplrClient"
import { getCustomClient } from "../../libs/CustomSigner"
import { Any } from "cosmjs-types/google/protobuf/any";
import axios from "axios";

const SignerList = ({
    currentSignatures,
    account,
    style,
    chain,
    address,
    walletAccount,
    tx,
    setHasSigned,
    transactionID,
    removeSignature,
    editSignature,
}) => {
    const deleteSig = async (id) => {
        openLoadingNotification("open", "Deleting Signature")
        try {
            await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/signature/delete?id=${id}`);
            removeSignature(id)
            setHasSigned(false)
            openLoadingNotification("close")
            openNotification("success", "Successfully delete signature")
        }
        catch (e) {
            openLoadingNotification("close")
            openNotification("error", "Unsuccessfully delete signature " + e.message)
        }
    }

    const updateSig = async (id) => {
        openLoadingNotification("open", "Resigning Signature")
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

            const types = tx.msgs.map(msg => {
                return msg.typeUrl
            })

            // Quick patch for execute contract tx and gov submit
            const msgs = tx.msgs.map(msg => {
                if (msg.typeUrl === "/cosmwasm.wasm.v1.MsgExecuteContract") {
                    let newMsg = msg
                    const valueBase64 = btoa(JSON.stringify(newMsg.value.msg))
                    newMsg.value.msg = Uint8Array.from(Buffer.from(valueBase64, 'base64'))
                    if (!Array.isArray(newMsg.value.funds)) {
                        newMsg.value.funds = Object.values(newMsg.value.funds);
                    }
                    return newMsg
                }
                if (msg.typeUrl === "/cosmos.gov.v1beta1.MsgSubmitProposal") {
                    let newMsg = {...msg}
                    let obj = {}
                    obj.typeUrl = msg.value.content["@type"] ? msg.value.content["@type"] : msg.value.content["typeUrl"] ? msg.value.content["typeUrl"] : ""
                    obj.value = {...msg.value.content}
                    delete(obj.value["@type"])
                    let b = Buffer.from(JSON.stringify(obj.value));
                    obj.value = b.toString('base64')
                    newMsg.value.content = Any.fromJSON(obj)
                    return newMsg
                }
                return msg
            })

            const signingClient = await getCustomClient(types, offlineSigner);
            const signerData = {
                accountNumber: parseInt(signAccount.account_number, 10),
                sequence: parseInt(signAccount.sequence, 10),
                chainId: chain.chain_id,
            };

            const { bodyBytes, signatures } = await signingClient.sign(
                walletAccount.bech32Address,
                msgs,
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
                accountNumber: signAccount.account_number,
                sequence: signAccount.sequence,
                address: walletAccount.bech32Address,
            };

            const res = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/signature/update`, {
                signature,
                transactionID
            });
            res.data && res.data ? editSignature(res.data) : editSignature(signature)
            setHasSigned(true)
            openLoadingNotification("close")
            openNotification("success", "Successfully update signature")
        }
        catch (e) {
            openLoadingNotification("close")
            openNotification("error", "Unsuccessfully update signature " + e.message)
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
                                title={"Resigning signature"}
                            >
                                <RetweetOutlined />
                            </Tooltip>
                        )}
                        clickFunction={async () => await updateSig(id)}
                        style={{
                            border: "solid .5px black",
                            width: "50%",
                            borderRadius: "10px 0 0 10px",
                            backgroundColor: "transparent",
                            height: "30px",
                            margin: "auto 0"
                        }}
                    />,
                    <Button
                        text={(
                            <Tooltip
                                placement="top"
                                title={"Delete signature"}
                            >
                                <DeleteOutlined />
                            </Tooltip>
                        )}
                        clickFunction={async () => await deleteSig(id)}
                        style={{
                            border: "solid .5px black",
                            width: "50%",
                            borderRadius: "0 10px 10px 0",
                            backgroundColor: "transparent",
                            height: "30px",
                            margin: "auto 0"
                        }}
                    />
                ]}
                justifyContent={"space-between"}
                style={{
                    width: "100px"
                }}
            />
        )
    }

    const checkStatus = (key, value) => {
        return parseInt(account[key], 10) === value
    }

    const circle = (key, value) => {
        return (
            <Tooltip
                placement="left"
                title={
                    checkStatus(key, value) ? "sync" : "not sync"
                }>
                <span
                    style={{
                        width: "10px",
                        height: "10px",
                        backgroundColor: !checkStatus(key, value) ? "#D82D2C" : "#189A01",
                        borderRadius: "50%",
                        display: "inline-block",
                        position: "relative",
                        margin: "auto 10px auto 0"
                    }}
                />
            </Tooltip>
        )
    }

    return (
        <div
            style={{
                maxHeight: "200px",
                overflow: "auto",
                border: "solid 1px black",
                padding: ".5em 1em",
                borderRadius: "10px",
            }}
        >
            <table
                style={{
                    width: "100%",
                    borderSpacing: "0 1em",
                }}
            >
                <thead
                    style={{
                        borderBottom: "solid 1.25px black",
                        fontSize: "1rem"
                    }}
                >
                    <tr>
                        <th
                            style={{
                                width: "30%",
                                padding: ".5em 0",
                                textAlign: "left"
                            }}
                        >
                            Address
                        </th>
                        <th
                            style={{
                                width: "40%",
                                padding: ".5em",
                                textAlign: "left"
                            }}
                        >
                            Sig Info
                        </th>
                        <th
                            style={{
                                width: "10%",
                                padding: ".5em",
                                textAlign: "center"
                            }}
                        >
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        currentSignatures.length > 0 ? currentSignatures.map((sig, index) => {
                            return (
                                <tr
                                    key={index}
                                    style={{
                                        width: "100%",
                                        borderBottom: "solid .25px #d6d6d6",
                                    }}
                                >
                                    <td
                                        style={{
                                            width: "30%",
                                            padding: "1em 0"
                                        }}
                                    >
                                        <Tooltip
                                            placement="top"
                                            title={sig.address}
                                        >
                                            {stringShortener(sig.address)}
                                        </Tooltip>
                                    </td>
                                    <td
                                        style={{
                                            width: "40%",
                                            padding: "1em 0"
                                        }}
                                    >
                                        <FlexRow
                                            components={[
                                                circle("sequence", sig.sequence),
                                                <text>
                                                    Sequence:
                                                </text>,
                                                <text
                                                    style={style.value}
                                                >
                                                    {sig.sequence}
                                                </text>
                                            ]}
                                            justifyContent={"start"}
                                        />
                                    </td>
                                    <td
                                        style={{
                                            width: "10%",
                                            padding: "1em 0",
                                        }}
                                    >
                                        {
                                            walletAccount
                                                && walletAccount.bech32Address === sig.address
                                                ? actionButtons(sig._id) : "Not available"
                                        }
                                    </td>
                                </tr>
                            )
                        }) : (
                            <div
                                style={{
                                    padding: "1em 0"
                                }}
                            >
                                No signatures yet
                            </div>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default SignerList