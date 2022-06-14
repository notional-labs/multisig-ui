import { chainData } from "../../data/chainData"
import Button from "./Button"
import FlexRow from "../flex_box/FlexRow"
import { Image } from "antd"
import { ChainContext } from "../Context"
import { useContext, useState } from "react"

const SelectChain = ({ }) => {
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
                                    width={'20px'}
                                    preview={false}
                                />
                            ), (
                                <span
                                    style={{
                                        marginLeft: '10px',
                                        fontSize: '1rem',
                                    }}
                                >
                                    {chain.name.toUpperCase()}
                                </span>
                            )
                        ]}
                    />
                ), (
                    <Image
                        src={'/images/selectButton.png'}
                        width={'20px'}
                        preview={false}
                    />
                )
            ]}
            justifyContent={'space-between'}
        />
    )

    const handleSelect = (index) => {
        wrapper(index)
        setShowDropDown(false)
    }

    const getGridButton = (chain, index) => {
        return (
            <Button
                index={index}
                text={
                    <FlexRow
                        components={[
                            (
                                <Image
                                    src={chain.logo}
                                    width={'20px'}
                                    preview={false}
                                />
                            ), (
                                <text
                                    style={{
                                        margin: '0 0 0 .25em',
                                        position: 'relative',
                                        fontSize: '1rem',
                                        color: '#000000'
                                    }}
                                >
                                    {chain.name.toUpperCase()}
                                </text>
                            )
                        ]}
                        justifyContent={'start'}
                    />
                }
                style={{
                    border: 'solid 1px black',
                    borderRadius: '10px',
                    padding: '.5em',
                }}
                clickFunction={() => handleSelect(index)}
            />
        )
    }

    const handleShow = () => {
        setShowDropDown(!showDropDown)
    }

    return (
        <div
            style={{
                position: 'relative',
                color: '#000000',
            }}
        >
            <Button
                text={buttonText}
                clickFunction={handleShow}
                style={{
                    border: 0,
                    borderRadius: showDropDown ? '10px 10px 0 0' : '10px',
                    backgroundColor: '#FFFFFF',
                    padding: '1em',
                    width: '200px'
                }}
            />
            {
                showDropDown && (
                    <div
                        style={{
                            backgroundColor: '#ffffff',
                            position: 'absolute',
                            width: '200%',
                            borderRadius: showDropDown ? '10px 0 10px 10px' : '10px',
                            left: '-100%',
                            padding: '1em',
                        }}
                    >
                        <text
                            style={{
                                fontWeight: 'bold',
                            }}
                        >
                            Select a chain
                        </text>
                        <div
                            style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(3, 1fr)',
                                gridRowGap: '10px',
                                gridColumnGap: '10px',
                                marginTop: '10px'
                            }}
                        >
                            {
                                chainData.map((chain, index) => {
                                    return (
                                        getGridButton(chain, index)
                                    )
                                })
                            }
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default SelectChain