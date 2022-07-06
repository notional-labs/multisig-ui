import Button from "../input/Button"
import { CloseOutlined } from '@ant-design/icons'

const TransactionImport = ({ multisigID, chain, router, wrapSetClose }) => {
    return (
        <div
            style={{
                backgroundColor: '#ffffff',
                boxShadow: ' 0px 0px 20px 2px rgba(0, 0, 0, 0.25)',
                padding: '2em 3em',
                borderRadius: '10px',
                position: 'relative',
                zIndex: 1,
                width: '100%',
                marginTop: '50px'
            }}
        >
            <h1
                style={{
                    marginBottom: 0,
                    textAlign: 'left'
                }}
            >
                Import Transaction
            </h1>
            <Button
                text={(
                    <CloseOutlined />
                )}
                style={{
                    position: 'absolute',
                    left: '90%',
                    top: '35px',
                    border: 0,
                    backgroundColor: 'transparent',
                    fontWeight: 'bold',
                    fontSize: '1.25rem'
                }}
                clickFunction={wrapSetClose}
            />

        </div>
    )
}

export default TransactionImport