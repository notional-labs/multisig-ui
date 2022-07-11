import { chainData } from "../../data/chainData"
import Button from "./Button"
import FlexRow from "../flex_box/FlexRow"
import { Image, Modal } from "antd"
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
                                    width={'25px'}
                                    preview={false}
                                />
                            ), enableSelectChain && (
                                <span
                                    style={{
                                        marginLeft: '10px',
                                        fontSize: '1rem',
                                        position: 'relative',
                                    }}
                                >
                                    {chain.name.toUpperCase()}
                                </span>
                            )
                        ]}
                        style={{
                            margin: 'auto 0'
                        }}
                    />
                ), enableSelectChain && (
                    <Image
                        src={'/images/selectButton.png'}
                        width={'15px'}
                        preview={false}
                        style={{
                            position: 'relative',
                            top: '1px',
                        }}
                    />
                )
            ]}
            justifyContent={'space-between'}
        />
    )

    const handleSelect = (index) => {
        wrapper(index)
        localStorage.setItem('current', index)
        setShowDropDown(false)
        window.dispatchEvent(new Event('chain_changed'))
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
                                    width={'30px'}
                                    preview={false}
                                />
                            ), (
                                <text
                                    style={{
                                        margin: '0 0 0 .25em',
                                        position: 'relative',
                                        fontSize: '1rem',
                                        color: '#000000',
                                        position: 'relative',
                                        top: '3px'
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

    const handleClose = () => {
        setShowDropDown(false)
    }

    return (
        <div
            style={{
                position: 'relative',
                color: '#000000',
                margin: 'auto 15px',
                height: '100%'
            }}
        >
            <Button
                text={buttonText}
                clickFunction={handleShow}
                style={{
                    border: 'solid 1px white',
                    borderRadius: enableSelectChain ? '10px' : '50%',
                    backgroundColor: '#FFFFFF',
                    padding:  enableSelectChain ? '.75em 1em' : '.75em',
                    width: enableSelectChain && '170px',
                    height: '100%'
                }}
                disable={!enableSelectChain}
            />
            <Modal
                visible={showDropDown}
                footer={null}
                closable={false}
                onCancel={handleClose}
            >
                <div
                    style={{
                        backgroundColor: '#ffffff',
                        borderRadius: '10px',
                        padding: '.05em',
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
            </Modal>
        </div>
    )
}

export default SelectChain