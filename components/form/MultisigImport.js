import { useState } from "react";
import Input from "../input/Input"
import Button from "../input/Button"
import { getMultisigAccountByAPI } from "../../libs/keplrClient";
import { openLoadingNotification, openNotification } from "../ulti/Notification"
import { importMultisigFromPubkeys } from "../../libs/multisig";
const { toBech32, fromBase64 } = require("@cosmjs/encoding");
import { rawSecp256k1PubkeyToRawAddress } from "@cosmjs/tendermint-rpc"
import { motion } from "framer-motion"
import FlexRow from "../flex_box/FlexRow"
import { InputNumber } from "antd"
import { useRouter } from "next/router"

const style = {
    inputNumberStyle: {
        borderRadius: "10px",
        padding: ".5em 1em",
        fontSize: "1.5rem",
        margin: "0 30px",
    },
    button: {
        backgroundColor: "black",
        color: "white",
        padding: "1em",
        width: "100%",
        borderRadius: "10px",
        marginTop: "20px",
        border: 0
    }
}

const MultisigImport = ({ chain }) => {
    const [address, setAddress] = useState("")
    const [err, setErr] = useState("")
    const [pubkeys, setPubkeys] = useState([])
    const [components, setComponents] = useState([])
    const [threshold, setThreshold] = useState(0)
    const router = useRouter()

    const fetchData = async (address) => {
        const acc = await getMultisigAccountByAPI(chain.api, address)
        let componentsAddr = []
        acc.pub_key.public_keys.map(
            (item) => {
                const addrUint8Array = fromBase64(item.key)
                const rawAddr = rawSecp256k1PubkeyToRawAddress(addrUint8Array)
                const addr = toBech32(chain.prefix, rawAddr)
                componentsAddr.push(addr)
            }
        );

        return {
            componentsAddr,
            publicKeys: acc.pub_key.public_keys,
            thres: acc.pub_key.threshold
        }
    }

    const handleOnBlur = async () => {
        try {
            if (!address || address === "") {
                setErr("Address must not be empty")
                return
            }
            setErr("")
            const {componentsAddr, publicKeys, thres} = await fetchData(address)
            setPubkeys([...publicKeys])
            setComponents([...componentsAddr])
            setThreshold(thres)
        }
        catch (e) {
            openLoadingNotification("close")
            openNotification("error", e.message)
        }
    }

    const handleOnChange = (e) => {
        setAddress(e.target.value)
    }

    const handleImport = async () => {
        try {
            if (!address || address === "") {
                setErr("Address must not be empty")
                return
            }
            setErr("")
            if (pubkeys.length > 0) {
                const compressedPubkeys = pubkeys.map(
                    (item) => {
                        return item.key
                    }
                );
    
                openLoadingNotification("open", "Importing multisig")
                const multisigAddress = await importMultisigFromPubkeys(
                    compressedPubkeys,
                    parseInt(threshold, 10),
                    chain.prefix,
                    components,
                    address
                );
                router.push(`/multisig/${multisigAddress}`);
                openLoadingNotification("close")
                openNotification("success", "Import successfully")
            }
            else {
                const {componentsAddr, publicKeys, thres} = await fetchData(address)
                const compressedPubkeys = publicKeys.map(
                    (item) => {
                        return item.key
                    }
                );
    
                openLoadingNotification("open", "Importing multisig")
                const multisigAddress = await importMultisigFromPubkeys(
                    compressedPubkeys,
                    parseInt(thres, 10),
                    chain.prefix,
                    componentsAddr,
                    address
                );
                router.push(`/multisig/${multisigAddress}`);
                openLoadingNotification("close")
                openNotification("success", "Import successfully")
            }
        }
        catch (e) {
            openLoadingNotification("close")
            openNotification("error", e.message)
        }
    }

    const checkDisable = () => {
        if (address === "") {
            return true
        }

        return false
    }

    return (
        <>
            <Input
                onChange={(e) => {
                    handleOnChange(e);
                }}
                value={address}
                label="Multisig Address"
                name="address"
                placeholder="Address here"
                onBlur={async () => {
                    await handleOnBlur();
                }}
                error={err}
            />
            {
                pubkeys.length > 0 && <div>
                    <h2
                        style={{
                            marginTop: "20px",
                        }}
                    >
                        Components
                    </h2>
                    <table
                        style={{
                            width: "100%",
                            borderSpacing: "0 1em",
                        }}
                    >
                        <thead
                            style={{
                                borderBottom: "solid 1.25px black",
                                fontSize: "1.25rem"
                            }}
                        >
                            <tr>
                                <th
                                    style={{
                                        width: "40%",
                                        padding: ".5em",
                                        textAlign: "left"
                                    }}
                                >
                                    Address
                                </th>
                                <th
                                    style={{
                                        width: "60%",
                                        padding: ".5em",
                                        textAlign: "left"
                                    }}
                                >
                                    Pubkey
                                </th>
                            </tr>
                        </thead>
                        <motion.tbody
                            animate={{
                                transition: {
                                    staggerChildren: 0.1
                                }
                            }}
                        >
                            {
                                pubkeys.map((pub, index) => {
                                    return (
                                        <motion.tr
                                            initial={{
                                                y: 60,
                                                opacity: 0,
                                                transition: { duration: .6, ease: [0.6, -0.05, 0.01, 0.99] }
                                            }}
                                            animate={{
                                                y: 0,
                                                opacity: 1,
                                                transition: {
                                                    duration: .6,
                                                    ease: [0.6, -0.05, 0.01, 0.99]
                                                }
                                            }}
                                            whileHover={{ scale: 1.009 }}
                                            whileTap={{ scale: 0.95 }}
                                            key={index}
                                            style={{
                                                width: "100%",
                                                borderBottom: "solid .25px #d6d6d6",
                                            }}
                                        >
                                            <td
                                                style={{
                                                    width: "40%",
                                                    fontSize: "1rem",
                                                    padding: ".5em"
                                                }}
                                            >
                                                {
                                                    components[index]
                                                }
                                            </td>
                                            <td
                                                style={{
                                                    width: "60%",
                                                    fontSize: "1rem",
                                                    padding: ".5em",
                                                    textAlign: "left"
                                                }}
                                            >
                                                {
                                                    pub.key
                                                }
                                            </td>
                                        </motion.tr>
                                    )
                                })
                            }
                        </motion.tbody >
                    </table>
                    <FlexRow
                        components={[
                            <InputNumber
                                disabled={true}
                                value={threshold}
                                style={{
                                    ...style.inputNumberStyle,
                                    backgroundColor: "#F5F5F5"
                                }}
                            />,
                            <text
                                style={{
                                    fontSize: "1.5rem",
                                    position: "absolute",
                                    top: "10px"
                                }}
                            >
                                Of
                            </text>,
                            <InputNumber
                                value={pubkeys.length}
                                disabled={true}
                                style={style.inputNumberStyle}
                            />
                        ]}
                        style={{
                            position: "relative",
                            marginTop: "20px"
                        }}
                    />
                </div>
            }
            <Button
                text={"IMPORT MULTISIG"}
                style={{
                    ...style.button,
                    backgroundColor: checkDisable() ? "#D9D9D9" : "black"
                }}
                disable={checkDisable()}
                clickFunction={async () => await handleImport()}
            />
        </>
    )
}

export default MultisigImport