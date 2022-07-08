import { useState } from 'react';
import Button from '../../input/Button';
import Input from '../../input/Input'
import { isValidAddress } from '../../../libs/checkTool';
import axios from 'axios'
import { openLoadingNotification, openNotification } from '../../ulti/Notification';
import { createSendMsg } from '../../../libs/transaction';
import ShareForm from './ShareForm';

const style = {
    input: {
        marginBottom: '10px',
        color: 'black'
    }
}

const SendMsgForm = ({ address, chain, router }) => {
    const [txBody, setTxBody] = useState({
        toAddress: '',
        amount: 0,
        gas: 200000,
        fee: 0,
        memo: '',
    })
    const [addrError, setAddrError] = useState('')

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
                handleCreate={handleCreate}
                chain={chain}
                style={style}
                disabled={disabled()}
            />
        </div>
    )
}

export default SendMsgForm