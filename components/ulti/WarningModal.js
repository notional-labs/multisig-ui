import Modal from "antd/lib/modal"
import Button from "../input/Button"
import FlexRow from "../flex_box/FlexRow"
import { WarningOutlined } from "@ant-design/icons"

const WarningModal = ({style, handleCreate, handleClose, handleCancel, showWarning}) => {
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
                        <WarningOutlined  style={{
                            color: '#faad14',
                            fontSize: '1.25rem'
                        }}/> Quick head up!
                    </text>
                    <div
                        style={{
                            marginTop: '10px'
                        }}
                    >
                        Make sure to update all signature in prior pending transaction because signing multiple transactions can lead to unverified signature cause by mismatch sequence
                    </div>
                    <FlexRow
                        components={[
                            <Button
                                text={'I Understand'}
                                style={{
                                    ...style.button,
                                    backgroundColor: 'black',
                                    color: 'white'
                                }}
                                clickFunction={async() => await handleCreate()}
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