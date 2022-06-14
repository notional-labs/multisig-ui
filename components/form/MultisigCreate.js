import { useState, useContext } from "react"
import Button from "../input/Button"
import Input from "../input/Input"
import { checkAddress } from "../../libs/checkTool"
import { getPubkey } from "../../libs/keplrClient"
import { ChainContext } from "../Context"
import FlexRow from "../flex_box/FlexRow"
import { InputNumber } from "antd"

const emptyKeyInput = () => {
    return {
        address: '',
        pubkey: '',
        error: ''
    }
}

const style = {
    inputNumberStyle: {
        borderRadius: '10px',
        padding: '.5em 1em',
        fontSize: '1.5rem',
        margin: '0 30px',
    }, 
    button: {
        backgroundColor: 'black',
        color: 'white',
        padding: '1em',
        width: '100%',
        borderRadius: '10px',
        marginTop: '20px'
    }
}

const MultisigCreate = ({ }) => {
    const { chain } = useContext(ChainContext)
    const [pubkeys, setPubkeys] = useState([
        emptyKeyInput(), emptyKeyInput()
    ])
    const [threshold, setThreshold] = useState(2)
    const [loading, setLoading] = useState(false)

    const handleKeyGroupChange = (e, index) => {
        let newPubkeys = [...pubkeys]
        newPubkeys[index].address = e.target.value
        setPubkeys([...newPubkeys])
    }

    const handleKeyBlur = async (e, index) => {
        let address = e.target.value;
        if (address.length > 0) {
            try {
                checkAddress(address, chain.prefix)
                const pubkey = await getPubkey(chain.rpc, address)
                let newPubkeys = [...pubkeys]
                newPubkeys[index].pubkey = pubkey;
                newPubkeys[index].error = "";
                setPubkeys([...newPubkeys])
            }
            catch (e) {
                let newPubkeys = [...pubkeys]
                newPubkeys[index].error = e.message;
                setPubkeys([...newPubkeys])
            }
        }
    }

    const handleAddAddress = () => {
        setPubkeys([...pubkeys, emptyKeyInput()])
    }

    const handleRemove = (index) => {
        let newPubkeys = pubkeys.filter((_, i) => i !== index)
        setPubkeys([...newPubkeys])
    }

    const handleChangeThreshold = (value) => {
        setThreshold(value)
    }

    const handleCreate = async () => {

    }

    return (
        <div
            style={{
                width: '60%',
                margin: 'auto',
                backgroundColor: '#ffffff',
                boxShadow: ' 0px 0px 20px 2px rgba(0, 0, 0, 0.25)',
                padding: '2em',
                borderRadius: '30px'
            }}
        >
            <h1
                style={{
                    textAlign: 'center'
                }}
            >
                Create Multisig
            </h1>
            <p
                style={{ marginBottom: '10px' }}
            >
                Add the addresses that will make up this multisig.
            </p>
            {
                pubkeys.map((pubkey, index) => {
                    return (
                        <div
                            style={{
                                marginBottom: '10px',
                                position: 'relative'
                            }}
                        >
                            {
                                pubkeys.length > 2 && (
                                    <Button
                                        text={'X'}
                                        clickFunction={() => handleRemove(index)}
                                        style={{
                                            borderRadius: '50%',
                                            border: 0,
                                            aspectRatio: '1/1',
                                            width: '30px',
                                            position: 'absolute',
                                            left: '97%',
                                            top: '10%',
                                        }}
                                    />
                                )
                            }
                            <Input
                                onChange={(e) => {
                                    handleKeyGroupChange(e, index);
                                }}
                                value={pubkey.address}
                                label="Address"
                                name="address"
                                placeholder="Address here"
                                onBlur={async (e) => {
                                    await handleKeyBlur(e, index);
                                }}
                                error={pubkey.error}
                            />
                        </div>
                    )
                })
            }
            <Button
                text={'ADD ANOTHER ADDRESS'}
                clickFunction={handleAddAddress}
                style={style.button}
            />
            <div
                style={{
                    marginTop: '30px'
                }}
            >
                <FlexRow
                    components={[
                        <InputNumber
                            min={1}
                            max={pubkeys.length}
                            defaultValue={2}
                            value={threshold}
                            onChange={handleChangeThreshold}
                            style={{
                                ...style.inputNumberStyle,
                                backgroundColor: '#F5F5F5'
                            }}
                        />,
                        <text
                            style={{
                                fontSize: '1.5rem',
                                position: 'absolute',
                                top: '10px'
                            }}
                        >
                            Of
                        </text>,
                        <InputNumber
                            value={pubkeys.length}
                            disabled={true}
                            style={style.inputNumberStyle}
                        />
                    ]}
                    style={{
                        position: 'relative'
                    }}
                />
            </div>
            <p
                style={{
                    marginTop: '20px',
                    fontSize: '.75rem'
                }}
            >
                {`This means that each transaction this multisig makes will require ${threshold} of the members to sign it for it to be accepted by the validators.`}
            </p>
            <Button
                text={'CREATE MULTISIG'}
                style={style.button}
                clickFunction={async () => await handleCreate()}
            />
        </div>
    )
}

export default MultisigCreate