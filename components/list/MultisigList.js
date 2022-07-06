import { useState, useEffect, useContext, useRef, useCallback } from "react"
import { getAllMultisigOfAddress } from "../../libs/multisig"
import MultisigRowView from "../data_view/MultisigRowView"
import { ChainContext } from "../Context"
import { getKey } from "../../libs/keplrClient"
import ButtonList from "../input/ButtonList"
import { chainIdToId } from "../../data/chainData"
import { motion } from "framer-motion"

const MultisigList = ({ }) => {
    const [multisigs, setMultisigs] = useState([])
    const [viewMultsigi, setViewMultisig] = useState([])
    const [params, setParams] = useState({
        page: 1,
        limit: 5,
        total: 0,
    })
    const [loading, setLoading] = useState(false)
    const { chain } = useContext(ChainContext)

    const keplrKeystorechangeListener = useCallback(async(event) => {
        setLoading(true)
        const account = await getKey(chain.chain_id)
        const address = account.bech32Address
        const res = await getAllMultisigOfAddress(address)
        setMultisigs([...res])
        setLoading(false)
    }, []);

    const storageListener = useCallback(async (event) => {
        setLoading(true)
        const account = await getKey(chain.chain_id)
        const address = account.bech32Address
        const res = await getAllMultisigOfAddress(address)
        setMultisigs([...res])
        setLoading(false)
    }, []);

    const chainChangedListener = useCallback(async (event) => {
        setLoading(true)
            const currentId = localStorage.getItem('current')
            const chainId = chainIdToId[currentId]
            const account = await getKey(chainId)
            const address = account.bech32Address
            const res = await getAllMultisigOfAddress(address)
            setMultisigs([...res])
            setParams({ ...params, total: res.length })
            setLoading(false)
    }, []);

    useEffect(() => {
        window.keplr && window.addEventListener("keplr_keystorechange", keplrKeystorechangeListener)

        window.addEventListener('storage', storageListener)

        window.addEventListener('chain_changed', chainChangedListener)

        return () => {
            window.removeEventListener('keplr_keystorechange', keplrKeystorechangeListener)

            window.removeEventListener('storage', storageListener)

            window.removeEventListener('chain_changed', chainChangedListener)
        }
    }, []);

    useEffect(() => {
        (async () => {
            setLoading(true)
            const account = localStorage.getItem('account')
            const address = account && JSON.parse(account).bech32Address || ''
            if (!address && address === '') return
            const res = await getAllMultisigOfAddress(address)
            setMultisigs([...res])
            setParams({ ...params, total: res.length })
            setLoading(false)
        })()
    }, [])

    useEffect(() => {
        const pagingList = multisigs.slice(params.page - 1, params.page - 1 + params.limit)
        setViewMultisig([...pagingList])
    }, [params, multisigs])

    const wrapSetParams = (index) => {
        setParams({ ...params, page: index })
    }

    return (
        <div
            style={{
                padding: '1em 2em',
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'column',
                position: 'absolute',
                height: '100%',
                width: '100%',
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
                                width: '40%',
                                padding: '.5em',
                                textAlign: 'left'
                            }}
                        >
                            Address
                        </th>
                        <th
                            style={{
                                width: '20%',
                                padding: '.5em',
                                textAlign: 'left'
                            }}
                        >
                            Components
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
                <motion.tbody
                    animate={{
                        transition: {
                            staggerChildren: 0.1
                        }
                    }}
                >
                    {
                        !loading && (
                            viewMultsigi.map((multisig, index) => {
                                return (
                                    <MultisigRowView
                                        address={multisig.address}
                                        index={index}
                                    />
                                )
                            })
                        )
                    }
                </motion.tbody >
            </table>
            <ButtonList
                currentPage={params.page}
                total={Math.ceil(params.total / params.limit)}
                wrapSetParams={wrapSetParams}
            />
        </div>
    )
}

export default MultisigList