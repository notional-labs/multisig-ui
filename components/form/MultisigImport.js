import { useState } from "react";
import Input from "../input/Input"
import Button from "../input/Button"
import { getMultisigAccountByAPI } from "../../libs/keplrClient";
import { openLoadingNotification, openNotification } from "../ulti/Notification"
import { importMultisigFromPubkeys } from "../../libs/multisig";
const { toBech32, fromHex } = require("@cosmjs/encoding");
import { motion } from "framer-motion"

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
    const handleOnBlur = async () => {
        try {
            if (!address || address === "") {
                setErr("Address must not be empty")
                return
            }
            const acc = await getMultisigAccountByAPI(chain.api, address)
            let components = []
            setPubkeys([...acc.pub_key.public_keys])
            pubkeys.forEach(
                (item) => {
                    const addrUint8Array = fromHex(item.key);
                    const addr = toBech32(prefix, addrUint8Array);
                    components.push(addr)
                }
            );
            setComponents([...components])
            setThreshold(acc.pub_key.threshold)
        }
        catch (e) {
            openLoadingNotification("close")
            openNotification("error", e.message)
        }
    }

    const handleOnChange = (e) => {
        setAddress(e.targe.value)
    }

    const handleImport = async () => {
        try {
            if (!address || address === "") {
                setErr("Address must not be empty")
                return
            }
            let components = []
            const compressedPubkeys = pubkeys.map(
                (item) => {
                    const addrUint8Array = fromHex(item.key);
                    const addr = toBech32(prefix, addrUint8Array);
                    components.push(addr)
                    return item.key
                }
            );

            openLoadingNotification("open", "Creating multisig")
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
                onChange={handleOnChange}
                value={address}
                label="Multisig Address"
                name="address"
                placeholder="Address here"
                onBlur={async () => {
                    await handleOnBlur();
                }}
                error={err}
            />
            <div>
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
                                Type
                            </th>
                            <th
                                style={{
                                    width: "60%",
                                    padding: ".5em",
                                    textAlign: "left"
                                }}
                            >
                                Pubkeys
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
                            pubkeys.length > 0 && pubkeys.map((pub, index) => {
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
                                                textAlign: "center"
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
            </div>
            <Button
                text={"IMPORT MULTISIG"}
                style={{
                    ...style.button,
                    backgroundColor: checkDisable() ? "#D9D9D9" : "black"
                }}
                clickFunction={async () => await handleImport()}
            />
        </>
    )
}

export default MultisigImport