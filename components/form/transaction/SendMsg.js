import { useState } from 'react';
import Button from '../../input/Button';
import Input from '../../input/Input'
import { isValidAddress } from '../../../libs/checkTool';
import axios from 'axios'
import { openLoadingNotification, openNotification } from '../../ulti/Notification';
import { createSendMsg } from '../../../libs/transaction';

const style = {
    input: {
        marginBottom: '10px',
        color: 'black'
    }
}

const SendMsgForm = ({ address, account, chain, router }) => {
    const [txBody, setTxBody] = useState({
        toAddress: '',
        amount: 0,
        gas: 20000,
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
                account.accountNumber,
                account.sequence,
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
            <Input
                onChange={(e) => {
                    handleKeyGroupChange(e);
                }}
                value={txBody.gas}
                label={`Set gas (${chain.denom.toUpperCase()})`}
                name="gas"
                type="number"
                placeholder="Gas Amount"
                style={style.input}
            />
            <Input
                onChange={(e) => {
                    handleKeyGroupChange(e);
                }}
                value={txBody.fee}
                label={`Set fee (${chain.denom.toUpperCase()})`}
                name="fee"
                type="number"
                placeholder="Fee Amount"
                style={style.input}
            />
            <Input
                onChange={(e) => {
                    handleKeyGroupChange(e);
                }}
                value={txBody.memo}
                label="Memo"
                name="memo"
                placeholder="Memo"
                style={style.input}
            />
            <Button
                text={'Create Transaction'}
                style={{
                    backgroundColor: disabled() ? '#808080' : 'black',
                    color: 'white',
                    padding: '1em',
                    width: '100%',
                    borderRadius: '10px',
                    marginTop: '20px',
                    border: 0
                }}
                clickFunction={handleCreate}
                disable={disabled()}
            />
        </div>
    )
}

export default SendMsgForm