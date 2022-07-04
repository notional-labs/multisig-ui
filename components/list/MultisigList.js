import { useState, useEffect, useContext, useMemo } from "react"
import { getAllMultisigOfAddress } from "../../libs/multisig"
import MultisigRowView from "../data_view/MultisigRowView"
import { ChainContext } from "../Context"
import { getKey } from "../../libs/keplrClient"
import ButtonList from "../input/ButtonList"

const MultisigList = ({ }) => {
    const [multisigs, setMultisigs] = useState([])
    const [viewMultsigi, setViewMultisig] = useState([])
    const [params, setParams] = useState({
        page: 1,
        limit: 5,
        total: 0,
    })
    const { chain } = useContext(ChainContext)

    useEffect(() => {
        window.keplr && window.addEventListener("keplr_keystorechange", async () => {
            const account = await getKey(chain.chain_id)
            const address = account.bech32Address
            if (!address && address === '') return
            const res = await getAllMultisigOfAddress(address)
            setMultisigs([...res])
        })

        window.addEventListener('storage', async () => {
            const account = localStorage.getItem('account')
            console.log(account)
            const address = account && JSON.parse(account).bech32Address || ''
            const res = await getAllMultisigOfAddress(address)
            setMultisigs([...res])
            setParams({ ...params, total: res.length })
        })

        window.removeEventListener("keplr_keystorechange", () => {
            console.log('close event listener')
        })

        window.removeEventListener("storage", () => {
            console.log('close event listener')
        })
    }, []);

    useEffect(() => {
        (async () => {
            const account = localStorage.getItem('account')
            const address = account && JSON.parse(account).bech32Address || ''
            if (!address && address === '') return
            const res = await getAllMultisigOfAddress(address)
            setMultisigs([...res])
            setParams({ ...params, total: res.length })
        })()
    }, [chain])

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
                width: '100%'
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
                <tbody>
                    {
                        viewMultsigi.map((multisig, index) => {
                            return (
                                <MultisigRowView
                                    address={multisig.address}
                                    index={index}
                                />
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

export default MultisigList