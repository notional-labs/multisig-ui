import { useState, useEffect, useContext, useMemo } from "react"
import { getAllMultisigOfAddress } from "../../libs/multisig"
import MultisigRowView from "../data_view/MultisigRowView"
import { ChainContext } from "../Context"

const MultisigList = ({ }) => {
    const [multisigs, setMultisigs] = useState([])
    const [params, setParams] = useState({
        page: 1,
        limit: 5,
        total: 0,
    })
    const [sortState, setSortState] = useState({
        createAt: '',
    })

    useEffect(() => {
        (async () => {
            const storeAccount = localStorage.getItem('account')
            const address = storeAccount ? JSON.parse(storeAccount)[0].address : ''
            if (address === '') return
            const res = await getAllMultisigOfAddress(address)
            setMultisigs([...res])
        })()
    }, [params,])

    return (
        <div
            style={{
                padding: '1em 3em'
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
                        multisigs.map((multisig, index) => {
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
        </div>
    )
}

export default MultisigList