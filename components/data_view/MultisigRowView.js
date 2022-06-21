import { useState, useEffect } from "react"
import { getMultisigFromAddress } from "../../libs/multisig"
import ComponentRow from "./ComponentRow"
import { Skeleton } from "antd"
import Link from 'next/link'
import { addressShortener, timeStampHandler } from "../../libs/stringConvert"

const MultisigRowView = ({ address, index }) => {
    const [multisig, setMultisg] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        (async () => {
            setLoading(true)
            const res = await getMultisigFromAddress(address)
            setMultisg(res)
            setLoading(false)
        })()
    }, [address])

    return (
        <tr
            key={index}
            style={{
                width: '100%',
                borderBottom: 'solid .5px #b5b5b5',
                marginBottom: '5px'
            }}
        >
            {
                loading ? (
                    <>
                        <td
                            style={{
                                width: '40%',
                                paddingTop: '1em'
                            }}
                        >
                            <Skeleton active rows={1} paragraph={{ rows: 0 }} />
                        </td>
                        <td
                            style={{
                                width: '20%',
                                paddingTop: '1em'
                            }}
                        >
                            <Skeleton active rows={1} paragraph={{ rows: 0 }} />
                        </td>
                        <td
                            style={{
                                width: '20%',
                                paddingTop: '1em'
                            }}
                        >
                            <Skeleton active rows={1} paragraph={{ rows: 0 }} />
                        </td>
                    </>
                ) : multisig !== null && (
                    <>
                        <td
                            style={{
                                width: '40%',
                                fontSize: '1rem',
                                padding: '.5em'
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
                                width: '100%',
                                padding: '.5em',
                                overflow: 'auto',
                                maxHeight: '100px',
                                display: 'inline-block'
                            }}
                        >
                            {<ComponentRow
                                pubkeys={multisig.pubkeyJSON}
                                prefix={multisig.prefix}
                            />}
                        </td>
                        <td
                            style={{
                                width: '20%',
                                textAlign: 'right',
                                fontSize: '1rem',
                                padding: '.5em'
                            }}
                        >
                            {timeStampHandler(new Date(multisig.createdOn))}
                        </td>
                    </>
                )
            }
        </tr>
    )
}

export default MultisigRowView