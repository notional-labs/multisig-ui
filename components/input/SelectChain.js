import { chainData } from "../../data/chainData"
import Button from "./Button"
import FlexRow from "../flex_box/FlexRow"
import { Image, Modal, Tooltip } from "antd"
import { ChainContext } from "../Context"
import { useContext, useState } from "react"

const SelectChain = ({ enableSelectChain }) => {
    const [showDropDown, setShowDropDown] = useState(false)
    const { chain, wrapper } = useContext(ChainContext)

    const buttonText = (
        <FlexRow
            components={[
                (
                    <FlexRow
                        components={[
                            (
                                <Image
                                    src={chain.logo}
                                    alt="app_logo"
                                    width={"25px"}
                                    preview={false}
                                />
                            ), enableSelectChain && (
                                <span
                                    style={{
                                        marginLeft: "10px",
                                        fontSize: "1rem",
                                        position: "relative",
                                    }}
                                >
                                    {chain.name.toUpperCase()}
                                </span>
                            )
                        ]}
                        style={{
                            margin: "auto 0"
                        }}
                    />
                ), 
            ]}
            justifyContent={"space-between"}
        />
    )

    const handleSelect = (index) => {
        wrapper(index)
        localStorage.setItem("current", index)
        setShowDropDown(false)
        window.dispatchEvent(new Event("chain_changed"))
    }

    const checkDisable = (id) => {
        if (id === 'evmos_9001-2') {
            return true
        }
        return false
    }

    const getGridButton = (chainInfo, index) => {
        return (
            <Button
                disable={checkDisable(chainInfo.chain_id)}
                index={index}
                text={
                    <>
                        <FlexRow
                            components={[
                                (
                                    <Image
                                        src={chainInfo.logo}
                                        alt="chain_logo"
                                        width={"30px"}
                                        preview={false}
                                    />
                                ), (
                                    <text
                                        style={{
                                            margin: "0 0 0 .25em",
                                            fontSize: "1rem",
                                            color: "#000000",
                                            position: "relative",
                                            top: "3px",
                                            maxWidth: "200px"
                                        }}
                                    >
                                        {chainInfo.name.toUpperCase()}
                                    </text>
                                )
                            ]}
                            justifyContent={"start"}
                        />
                        {
                            checkDisable(chainInfo.chain_id) ?
                                <div
                                    style={{
                                        textAlign: "left",
                                        color: "red"
                                    }}
                                >
                                    Currently disable for maintainance
                                </div> : <div
                                    style={{
                                        textAlign: "left"
                                    }}
                                >
                                    <a
                                        href={chainInfo.hyperLink || "#"}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        {chainInfo.hyperLink}
                                    </a>
                                </div>
                        }
                    </>
                }
                style={{
                    border: "solid 1px black",
                    borderRadius: "10px",
                    padding: ".5em",
                    overFlow: "hidden",
                    opacity: checkDisable(chainInfo.chain_id) && 0.5
                }}
                clickFunction={() => handleSelect(index)}
            />
        )
    }

    const handleShow = () => {
        setShowDropDown(!showDropDown)
    }

    const handleClose = () => {
        setShowDropDown(false)
    }

    return (
        <div
            style={{
                position: "relative",
                color: "#000000",
                margin: "auto 15px",
                height: "100%"
            }}
        >
            <Button
                text={buttonText}
                clickFunction={handleShow}
                style={{
                    border: "solid 1px white",
                    borderRadius: enableSelectChain ? "10px" : "50%",
                    backgroundColor: "#FFFFFF",
                    padding: enableSelectChain ? ".75em 1em" : ".75em",
                    width: enableSelectChain && "auto",
                    height: "100%",
                    overFlow: "hidden"
                }}
                disable={!enableSelectChain}
            />
            <Modal
                visible={showDropDown}
                footer={null}
                closable={false}
                onCancel={handleClose}
                width={"50%"}
            >
                <div
                    style={{
                        backgroundColor: "#ffffff",
                        borderRadius: "10px",
                        padding: ".05em",
                        width: '100%'
                    }}
                >
                    <text
                        style={{
                            fontWeight: "bold",
                        }}
                    >
                        Select a chain
                    </text>
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                            gridRowGap: "10px",
                            gridColumnGap: "10px",
                            marginTop: "10px"
                        }}
                    >
                        {
                            chainData.map((chainObj, index) => {
                                return (
                                    getGridButton(chainObj, index)
                                )
                            })
                        }
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default SelectChain