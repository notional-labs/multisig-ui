import { useState, useEffect, useContext } from "react"
import { ChainContext } from "../Context"
import ButtonList from "../input/ButtonList"
import { useRouter } from "next/router";
import { getTransactionsOfMultisig } from "../../libs/faunaClient"
import { openNotification } from "../ulti/Notification"
import { getMultisigFromAddress } from "../../libs/multisig"
import { prefixToId } from "../../data/chainData"
import { Skeleton } from "antd"
import axios from "axios";
import { timeStampHandler } from "../../libs/stringConvert";
import Link from 'next/link'

const TransactionList = ({ }) => {
    const [transactions, setTransactions] = useState([])
    const [viewTransactions, setViewTransactions] = useState([])
    const [loading, setLoading] = useState(false)
    const [params, setParams] = useState({
        page: 1,
        limit: 10,
        total: 0,
    })
    const { wrapper } = useContext(ChainContext)
    const router = useRouter()
    const { multisigID } = router.query

    const wrapSetParams = (index) => {
        setParams({ ...params, page: index })
    }

    useEffect(() => {
        (async () => {
            if (!multisigID) return
            setLoading(true)
            try {
                const multisigAccount = await getMultisigFromAddress(multisigID)
                const id = prefixToId[`${multisigAccount.prefix}`]
                wrapper(id)
                localStorage.setItem('current', id)
                const res = await axios.get(`/api/multisig/${multisigID}/all-transaction`)
                setTransactions([...res.data])
                setParams({
                    ...params,
                    total: res.data.length
                })
                setLoading(false)
            }
            catch (e) {
                openNotification('error', e.message)
            }
        })()
    }, [multisigID])

    useEffect(() => {
        setLoading(true)
        const pagingList = transactions.slice(params.page - 1, params.page - 1 + params.limit)
        setViewTransactions([...pagingList])
        setLoading(false)
    }, [params, transactions])

    const getType = (tx) => {
        const txInfo = JSON.parse(tx.dataJSON)
        const type = txInfo.msgs[0].typeUrl
        return type
    }

    return (
        <div
            style={{
                padding: '1em 2em',
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'column',
                backgroundColor: '#ffffff',
                minHeight: '70vh',
                width: '100%',
                marginLeft: '300px',
                borderRadius: '30px',
                position: 'relative',
                zIndex: 1,
                boxShadow: '0px 0px 20px 2px rgba(0, 0, 0, 0.25)',
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
                        fontSize: '1.25rem'
                    }}
                >
                    <tr>
                        <th
                            style={{
                                width: '30%',
                                padding: '.5em',
                                textAlign: 'left'
                            }}
                        >
                            ID
                        </th>
                        <th
                            style={{
                                width: '30%',
                                padding: '.5em',
                                textAlign: 'left'
                            }}
                        >
                            Type
                        </th>
                        <th
                            style={{
                                width: '20%',
                                padding: '.5em',
                                textAlign: 'center'
                            }}
                        >
                            Status
                        </th>
                        <th
                            style={{
                                width: '20%',
                                padding: '.5em',
                                textAlign: 'right'
                            }}
                        >
                            Created At
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        viewTransactions.map((transaction, index) => {
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
                                                        width: '30%',
                                                        paddingTop: '1em'
                                                    }}
                                                >
                                                    <Skeleton active rows={1} paragraph={{ rows: 0 }} />
                                                </td>
                                                <td
                                                    style={{
                                                        width: '30%',
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
                                        ) : transaction !== null && (
                                            <>
                                                <td
                                                    style={{
                                                        width: '30%',
                                                        fontSize: '1rem',
                                                        padding: '1em 0.5em'
                                                    }}
                                                >
                                                    <Link
                                                        href={`/multisig/${multisigID}/transaction/${transaction._id}`}
                                                    >
                                                        {transaction._id}
                                                    </Link>
                                                </td>
                                                <td
                                                    style={{
                                                        width: '30%',
                                                        fontSize: '1rem',
                                                        padding: '1em 0.5em',
                                                    }}
                                                >
                                                    {getType(transaction)}
                                                </td>
                                                <td
                                                    style={{
                                                        width: '20%',
                                                        padding: '1em 0.5em',
                                                        fontSize: '1rem',
                                                        textAlign: 'center'
                                                    }}
                                                >
                                                    {transaction.status}
                                                </td>
                                                <td
                                                    style={{
                                                        width: '20%',
                                                        textAlign: 'right',
                                                        fontSize: '1rem',
                                                        padding: '1em 0.5em'
                                                    }}
                                                >
                                                    {timeStampHandler(new Date(transaction.createdOn))}
                                                </td>
                                            </>
                                        )
                                    }
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>

            <ButtonList
                currentPage={params.page}
                total={Math.ceil(params.total / params.limit)}
                wrapSetParams={wrapSetParams}
            />
        </div>
    )
}

export default TransactionList