import { useState, useEffect } from "react"
import { getMultisigFromAddress } from "../../libs/multisig"
import ComponentRow from "./ComponentRow"
import { Skeleton } from "antd"
import Link from "next/link"
import { addressShortener } from "../../libs/stringConvert"
import { motion } from "framer-motion"

const MultisigRowView = ({ address, index, loadingRow = false, chain }) => {
    const [multisig, setMultisg] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        (async () => {
            if(loadingRow) return
            setLoading(true)
            const res = await getMultisigFromAddress(address)
            setMultisg(res)
            setLoading(false)
        })()
    }, [address])

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
            {
                loading || loadingRow ? (
                    <>
                        <td
                            style={{
                                width: "50%",
                                paddingTop: "1em"
                            }}
                        >
                            <Skeleton active rows={1} paragraph={{ rows: 0 }} />
                        </td>
                        <td
                            style={{
                                width: "30%",
                                paddingTop: "1em"
                            }}
                        >
                            <Skeleton active rows={1} paragraph={{ rows: 0 }} />
                        </td>
                        <td
                            style={{
                                width: "20%",
                                paddingTop: "1em",
                                textAlign: "center"
                            }}
                        >
                            <Skeleton active rows={1} paragraph={{ rows: 0 }} />
                        </td>
                    </>
                ) : multisig !== null && (
                    <>
                        <td
                            style={{
                                width: "40%",
                                fontSize: "1rem",
                                padding: ".5em"
                            }}
                        >
                            <Link
                                href={`/multisig/${address}`}
                            >
                                {addressShortener(address, 20, 10)}
                            </Link>
                        </td>
                        <td
                            style={{
                                width: "100%",
                                padding: ".5em",
                                overflow: "auto",
                                maxHeight: "70px",
                                display: "inline-block",
                                textAlign: "center"
                            }}
                        >
                            {<ComponentRow
                                pubkeys={multisig.pubkeyJSON}
                                prefix={multisig.prefix}
                                chain={chain}
                            />}
                        </td>
                        <td
                            style={{
                                width: "40%",
                                fontSize: "1rem",
                                padding: ".5em",
                                textAlign: "center"
                            }}
                        >
                            {
                                JSON.parse(multisig.pubkeyJSON).value.threshold
                            }
                        </td>
                    </>
                )
            }
        </motion.tr>
    )
}

export default MultisigRowView