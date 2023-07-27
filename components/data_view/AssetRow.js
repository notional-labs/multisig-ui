import { useEffect, useState } from "react"
import { getDenom, getValueFromDenom, getDisplayDenom, stringShortener} from "../../libs/stringConvert"

const AssetRow = ({ chain, ibcDenom, balance, index }) => {
    const [name, setName] = useState("")
    const [viewDenom, setViewDenom] = useState("")

    useEffect(() => {
        (async () => {
            if (ibcDenom.substring(0, 3) === "ibc") {
                const res = await getDenom(chain.api, ibcDenom.substring(4))
                if (res.length < 20) {
                    setViewDenom(getDisplayDenom(denom))

                }
                else {
                    setViewDenom(stringShortener(res, 10, 10))
                } 
                setName(res)
            }
            else if (ibcDenom.substring(0, 4) === "gamm") {
                setName(ibcDenom)
                setViewDenom(ibcDenom)
            }   
            else {
                if (ibcDenom.length < 20) {
                    setViewDenom(getDisplayDenom(ibcDenom))

                }
                else {
                    setViewDenom(stringShortener(ibcDenom, 15, 15))
                } 
                setName(ibcDenom)
            }
        })()
    }, [ibcDenom, index])

    return (
        <tr
            key={index}
            style={{
                borderBottom: "solid .25px #d6d6d6",
            }}
        >
            <td
                style={{
                    width: "50%",
                    padding: "1em 0",
                    fontWeight: "bold"
                }}
            >
                {
                    viewDenom.toUpperCase()
                }
            </td>
            <td
                style={{
                    width: "20%",
                    padding: "1em 0",
                }}
            >
                {
                    getValueFromDenom(name, balance.amount).toFixed(6)
                }
            </td>
        </tr>
    )
}

export default AssetRow