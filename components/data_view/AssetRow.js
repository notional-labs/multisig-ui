import { useEffect, useState } from "react"
import { getDenom } from "../../libs/stringConvert"

const AssetRow = ({ chain, ibcDenom }) => {
    const [name, setName] = useState('')

    useEffect(() => {
        (async () => {
            if (ibcDenom.substring(0, 3) === 'ibc') {
                const res = await getDenom(chain.api, ibcDenom.substring(4))
                console.log(res)
                setName(res)
            }
            else {
                setName(ibcDenom)
            }
        })()
    }, [ibcDenom])

    return (
        <div
            style={{
                fontWeight: 'bold'
            }}
        >
            {
                name !== 'unknown' && name !== '' ? name.substring(1).toUpperCase() : name.toUpperCase()
            }
        </div>
    )
}

export default AssetRow