import { useState } from "react";
import { ChainProvider } from "../components/Context";
import { getCustomAminoConverter } from "../libs/CustomSigner";
import Page from "../components/layout/Page";
import Button from "../components/input/Button";
import FlexRow from "../components/flex_box/FlexRow";
import { motion } from "framer-motion";
import Input from "antd/lib/input";
import SupportMsg from "../components/list/SupportMsg";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons"

const style = {
    component: {
        marginTop: "1em",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        marginBottom: "20px"
    }
}

export default function Check() {
    const [type, setType] = useState('')
    const [suggest, setSuggest] = useState(null)
    const [check, setCheck] = useState(false)

    const handleChange = (e) => {
        setType(e.target.value)
    }

    const checkType = () => {
        if (type === '') return
        const aminoConverter = getCustomAminoConverter(type)
        if (aminoConverter) {
            setSuggest(aminoConverter)
            if (aminoConverter[`${type}`]) {
                setCheck(true)
            }
            else {
                setCheck(false)
            }
        }
        else {
            setSuggest(null)
            setCheck(false)
        }
    }

    return (
        <ChainProvider>
            <Page
                checkType={true}
            >
                <motion.div
                    initial={{ opacity: 0, x: 60 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -60 }}
                    transition={{ duration: .6 }}
                    className="page-container"
                    style={{
                        backgroundColor: "#ffffff",
                        boxShadow: " 0px 0px 20px 2px rgba(0, 0, 0, 0.25)",
                        margin: "12em 20em 6em 20em",
                        padding: "1em 3em 2em 3em",
                        borderRadius: "30px",
                        position: "relative",
                        zIndex: 1,
                    }}
                >
                    <h1
                        style={{
                            ...style.component,
                            textAlign: "center"
                        }}
                    >
                        Check message type
                    </h1>
                    <div
                        style={style.component}
                    >
                        <FlexRow
                            components={[
                                <Input
                                    style={{
                                        borderRadius: "10px",
                                        padding: "1em",
                                        width: "84%"
                                    }}
                                    placeholder={"Enter a message type"}
                                    onBlur={handleChange}
                                />,
                                <Button
                                    text={"Check"}
                                    style={{
                                        borderRadius: "10px",
                                        width: "15%",
                                        border: 0,
                                        fontSize: "1.2em",
                                        fontWeight: "bold",
                                        backgroundColor: "#ed4e4e",
                                        color: "white"
                                    }}
                                    clickFunction={checkType}
                                />
                            ]}
                            justifyContent="space-between"
                        />
                    </div>
                    {
                        <div
                            style={style.component}
                        >
                            {
                                check ? (
                                    <div
                                        style={{
                                            fontWeight: "bold",
                                            fontSize: "1rem",
                                            color: "#189A01"
                                        }}
                                    >
                                        <CheckOutlined />  This message type is supported by multisig ui.
                                    </div>
                                ) : type !== '' && (
                                    <div
                                        style={{
                                            fontWeight: "bold",
                                            fontSize: "1rem",
                                            color: "red"
                                        }}
                                    >
                                        <CloseOutlined />  This message type is not supported by multisig ui yet!
                                    </div>
                                )
                            }
                        </div>
                    }
                    <div
                        style={{
                            ...style.component,
                            backgroundColor: "#ffffff",
                            boxShadow: " 0px 0px 20px 2px rgba(0, 0, 0, 0.25)",
                            padding: "1em 3em 2em 3em",
                            borderRadius: "10px",
                            position: "relative",
                            zIndex: 1,
                        }}
                    >
                        <h3
                            style={{
                                marginBottom: "10px"
                            }}
                        >
                            Suggested message types that are supported
                        </h3>
                        {
                            suggest && (
                                <SupportMsg
                                    aminoConverter={suggest}
                                />
                            )
                        }
                    </div>
                </motion.div>
            </Page >
        </ChainProvider >
    )
}
