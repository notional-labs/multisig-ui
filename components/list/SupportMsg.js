import { useEffect, useState } from "react"

const SupportMsg = ({aminoConverter}) => {
    const [msgs, setMsgs] = useState([])

    useEffect(() => {
        let list = []
        for (var key in aminoConverter) {
            list.push({
                type: key,
                aminoType: aminoConverter[`${key}`].aminoType
            })
        }
        setMsgs([...list])
    }, [aminoConverter])

    return (
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
                        fontSize: "1rem"
                    }}
                >
                    <tr>
                        <th
                            style={{
                                width: "60%",
                                padding: ".5em 0",
                                textAlign: "left"
                            }}
                        >
                            TypeUrl
                        </th>
                        <th
                            style={{
                                width: "40%",
                                padding: ".5em",
                                textAlign: "left"
                            }}
                        >
                            Amino Type
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        msgs.length > 0 ? msgs.map((msg, index) => {
                            return (
                                <tr
                                    key={index}
                                    style={{
                                        width: "100%",
                                        borderBottom: "solid .25px #d6d6d6",
                                    }}
                                >
                                    <td
                                        style={{
                                            width: "60%",
                                            padding: "1em 0"
                                        }}
                                    >
                                       {msg.type}
                                    </td>
                                    <td
                                        style={{
                                            width: "40%",
                                            padding: "1em 0"
                                        }}
                                    >
                                       {msg.aminoType}
                                    </td>
                                </tr>
                            )
                        }) : (
                            <div
                                style={{
                                    padding: "1em 0"
                                }}
                            >
                                No suggestion 
                            </div>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default SupportMsg