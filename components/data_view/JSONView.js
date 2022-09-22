import { addressAmino, addressConversion } from "../../libs/stringConvert";
import { useState } from "react";
import Button from "../input/Button";
import { CopyOutlined } from "@ant-design/icons"
import FlexRow from "../flex_box/FlexRow";
import CopyToClipboard from "react-copy-to-clipboard";
import { openNotification } from "../ulti/Notification";
import JSONInput from "react-json-editor-ajrm";
import locale from "react-json-editor-ajrm/locale/en";

const convertKelprTransaction = (transaction) => {
    const cosmos_tx = {};
    const body = {};
    const auth_info = {};
    const msgs = transaction.msgs
    // msgValue["@type"] = msg["typeUrl"]

    const newMsgs = msgs.map(msg => {
        const msgValue = {};
        msgValue["@type"] = msg["typeUrl"]

        for (const key in msg.value) {
            if (key === "type") continue;
            msgValue[key] = msg.value[key];
    
            for (let i = 0; i < addressAmino.length; i++) {
                if (!(addressConversion[i] == key)) continue;
                msgValue[addressAmino[i]] = msgValue[addressConversion[i]];
    
                delete msgValue[addressConversion[i]];
            }
        }
        return msgValue
    })

   
<<<<<<< HEAD
    body["messages"] = [...msgs];
=======
    body["messages"] = [...newMsgs];
>>>>>>> 862ecad4b2e45570259ee4c6e1ae3b3f28597fd5
    body["memo"] = transaction.memo;
    body["timeout_height"] = "0";
    body["extension_options"] = [];
    body["non_critical_extension_options"] = [];

    auth_info["signer_infos"] = [];
    auth_info["fee"] = {}
    auth_info["fee"]["amount"] = transaction.fee.amount;
    auth_info["fee"]["gas_limit"] = transaction.fee.gas;
    auth_info["fee"]["payer"] = "";
    auth_info["fee"]["granter"] = "";

    cosmos_tx["body"] = body;
    cosmos_tx["auth_info"] = auth_info;
    cosmos_tx["signatures"] = [];

    return cosmos_tx
}

const JSONView = ({ tx }) => {
    const [showJSON, setShowJSON] = useState(false)

    const handleShowJSON = () => {
        setShowJSON(!showJSON)
    }

    return (
        <div
            style={{
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.25)",
                borderRadius: "10px",
                padding: "2em",
                marginTop: "30px",
                position: "relative",
                zIndex: 1,
            }}
        >
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between"
                }}
            >
                <FlexRow
                    components={[
                        <h2>
                            Transaction JSON
                        </h2>,
                        <CopyToClipboard
                            text={JSON.stringify(convertKelprTransaction(tx), null, 1)}
                            onCopy={() => {
                                openNotification("success", "Copy to clipboard !")
                            }}
                            style={{
                                marginTop: "10px",
                                marginLeft: "10px"
                            }}
                        >
                            <CopyOutlined />
                        </CopyToClipboard>
                    ]}
                    justifyContent={"start"}
                />
                <Button
                    clickFunction={handleShowJSON}
                    text={"Show"}
                    style={{
                        border: 0,
                        fontStyle: "italic",
                        textDecoration: "underline",
                        position: "relative",
                        backgroundColor: "transparent",
                        top: "-5px"
                    }}
                />
            </div>
            {
                showJSON && tx && (
                    <JSONInput
                        id="json_view"
                        placeholder={(convertKelprTransaction(tx))}
                        locale={locale}
                        height="500px"
                        width={"100%"}
                        viewOnly={true}
                        style={{
                            body: {
                                fontSize: "1rem",
                                borderRadius: "10px",
                                padding: ".5em"
                            },
                        }}
                    />
                )
            }
        </div>
    )
}

export default JSONView