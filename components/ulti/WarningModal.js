import Modal from "antd/lib/modal"
import Button from "../input/Button"
import FlexRow from "../flex_box/FlexRow"
import { WarningOutlined } from "@ant-design/icons"
import { Checkbox } from "antd"
import { useState } from "react"

const WarningModal = ({ style, handleCreate, handleClose, handleCancel, showWarning, checked, setChecked }) => {
    const handleChange = (e) => {
        localStorage.setItem('not-show-warning', e.target.checked)
        setChecked(e.target.checked)
    }

    return (
        <Modal
            visible={showWarning}
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
                    <WarningOutlined style={{
                        color: '#faad14',
                        fontSize: '1.25rem'
                    }} /> Quick head up!
                </text>
                <div
                    style={{
                        margin: '10px 0'
                    }}
                >
                    Make sure to update all signature in prior pending transaction because signing multiple transactions can lead to unverified signature cause by mismatch sequence
                </div>
                <Checkbox
                    checked={checked}
                    onChange={handleChange}
                >
                    Don`t show this warning again
                </Checkbox>
                <FlexRow
                    components={[
                        <Button
                            text={'I Understand'}
                            style={{
                                ...style.button,
                                backgroundColor: 'black',
                                color: 'white'
                            }}
                            clickFunction={async () => {
                                handleClose()
                                await handleCreate()
                            }}
                        />,
                        <Button
                            text={'Cancel'}
                            style={{
                                ...style.button,
                                backgroundColor: '#808080',
                                color: 'white'
                            }}
                            clickFunction={handleCancel}
                        />
                    ]}
                    justifyContent={'space-between'}
                    style={{
                        marginTop: '20px'
                    }}
                />
            </div>
        </Modal>
    )
}

export default WarningModal