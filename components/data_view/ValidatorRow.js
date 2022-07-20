import { useEffect, useState } from "react"
import { getValidator } from "../../libs/queryClients"
import Skeleton from "antd/lib/skeleton"

const ValidatorRow = ({ chain, address }) => {
    const [validator, setValidator] = useState()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        (async () => {
            try {
                setLoading(true)
                const res = await getValidator(chain.rpc, address)
                res.validator && setValidator(res.validator)
                setLoading(false)
            }
            catch (e) {
                console.log(e.message)
            }
        })()
    }, [address])

    return (
        <div>
            {
                loading ? (
                    <Skeleton active rows={1} paragraph={{ rows: 0 }} />
                ) : validator ? validator.description.moniker : address
            }
        </div>
    )
}

export default ValidatorRow