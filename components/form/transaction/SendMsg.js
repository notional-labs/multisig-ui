import { useState } from 'react';
import Input from '../../input/Input'
import { isValidAddress } from '../../../libs/checkTool';
import axios from 'axios'
import { openLoadingNotification, openNotification } from '../../ulti/Notification';
import { createSendMsg, checkIfHasPendingTx } from '../../../libs/transaction';
import WarningModal from '../../ulti/WarningModal';
import ShareForm from './ShareForm';

const style = {
    input: {
        marginBottom: '10px',
        color: 'black'
    },
    button: {
        border: 0,
        borderRadius: '10px',
        width: '40%',
        padding: '.5em 1em'
    }
}

const SendMsgForm = ({ address, chain, router, checked, setChecked }) => {
    const [txBody, setTxBody] = useState({
        toAddress: '',
        amount: 0,
        gas: 200000,
        fee: 0,
        memo: '',
    })
    const [addrError, setAddrError] = useState('')
    const [showWarning, setShowWarning] = useState(false)

    const invalidForm = () => {
        for (let key in txBody) {
            if (key !== 'memo' && txBody[key] === '') return true
            else if (key === 'amount' && txBody[key] === 0) return true
        }
        return false
    }

    const disabled = () => {
        if (invalidForm() || addrError !== '') {
            return true
        }
        return false
    }

    const handleCreate = async () => {
        openLoadingNotification('open', 'Creating transaction')
        try {
            const tx = createSendMsg(
                address,
                txBody.toAddress,
                txBody.amount * 1000000,
                txBody.gas,
                chain.denom,
                txBody.memo,
                chain.chain_id,
                txBody.fee,

            );
            const dataJSON = JSON.stringify(tx);
            const data = {
                dataJSON,
                createBy: address,
                status: 'PENDING'
            }
            const res = await axios.post("/api/transaction/create", data);
            const { _id } = res.data;
            router.push(`/multisig/${address}/transaction/${_id}`)
            openLoadingNotification('close')
            openNotification('success', 'Created successfully')
        }
        catch (e) {
            openLoadingNotification('close')
            openNotification('error', e.message)
        }
    }

    const handleKeyGroupChange = (e) => {
        if(e.target.name === 'amount' || e.target.name === 'fee' || e.target.name === 'gas' ) {
            setTxBody({
                ...txBody,
                [e.target.name]: parseFloat(e.target.value)
            })
        }
        else {
            setTxBody({
                ...txBody,
                [e.target.name]: e.target.value
            })
        }
    }

    const handleKeyBlur = (e) => {
        if (e.target.name === 'toAddress' && !isValidAddress(e.target.value, chain.prefix)) {
            setAddrError('Invalid Address')
        }
        else {
            setAddrError('')
        }
    }

    const handleClose = () => {
        setShowWarning(false)
    }

    const handleProcced = async () => {
        const check = await checkIfHasPendingTx(address)
        if (check && !checked) {
            setShowWarning(true)
        }
        else {
            await handleCreate()
        }
    }

    const handleCancel = () => {
        setShowWarning(false)
        openNotification('error', 'Cancel create transaction')
    }

    return (
        <div>
            <Input
                onChange={(e) => {
                    handleKeyGroupChange(e);
                }}
                value={txBody.toAddress}
                label="Send To"
                name="toAddress"
                placeholder="Address here"
                error={addrError}
                onBlur={handleKeyBlur}
                style={style.input}
            />
            <Input
                onChange={(e) => {
                    handleKeyGroupChange(e);
                }}
                value={txBody.amount}
                label={`Amount (${chain.denom.split('u')[1].toUpperCase()})`}
                name="amount"
                type="number"
                placeholder="Amount"
                style={style.input}
            />
            <ShareForm
                txBody={txBody}
                handleKeyGroupChange={(e) => {
                    handleKeyGroupChange(e);
                }}
                handleCreate={handleProcced}
                chain={chain}
                style={style}
                disabled={disabled()}
            />
            <WarningModal
                style={style}
                handleClose={handleClose}
                handleCreate={handleCreate}
                showWarning={showWarning}
                handleCancel={handleCancel}
                checked={checked}
                setChecked={setChecked}
            />
        </div>
    )
}

export default SendMsgForm