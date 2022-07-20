import { useEffect, useState } from "react"
import { getTx } from "../../libs/queryClients"
import { CopyOutlined } from "@ant-design/icons"
import FlexRow from "../flex_box/FlexRow";
import Button from "../input/Button";
import CopyToClipboard from "react-copy-to-clipboard";
import { openNotification } from "../ulti/Notification";
import JSONInput from "react-json-editor-ajrm";
import locale from "react-json-editor-ajrm/locale/en";

const HashView = ({ chain, txHash }) => {
    const [tx, setTx] = useState()
    const [showJSON, setShowJSON] = useState(false)

    useEffect(() => {
        (async () => {
            try {
                const res = await getTx(chain.rpc, txHash)
                res && setTx(res.tx)
            }
            catch (e) {
                openNotification("error", e.message)
            }
        })()
    }, [])

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
                            text={JSON.stringify(tx, null, 2)}
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
                        placeholder={tx}
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

export default HashView