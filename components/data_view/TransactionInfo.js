const style = {
    label: {
        backgroundColor: '#000000',
        padding: '1em 1.5em',
        borderRadius: '10px 0 0 10px',
        display: 'block',
        color: 'white',
        fontSize: '1rem',
        width: '20%',
        textAlign: 'center'
    },
    value: {
        backgroundColor: '#D9D9D9',
        padding: '1em 1.5em',
        borderRadius: '0px 10px 10px 0px',
        display: 'block',
        color: '#000000',
        fontSize: '1rem',
        width: '80%',
        textAlign: 'left'
    },
    flexRow: {
        display: 'flex',
        justifyContent: 'start',
        marginBottom: '20px'
    }
}

const TransactionInfo = ({ tx }) => {
    console.log(tx)
    return (
        <div
            style={{
                width: '100%'
            }}
        >
            <div
                style={style.flexRow}
            >
                <label
                    style={style.label}
                >
                    Msg:
                </label>
                <div
                    style={style.value}
                >
                    {tx.msgs[0].typeUrl}
                </div>
            </div>
            {
                tx.msgs[0].typeUrl === '/cosmos.staking.v1beta1.MsgDelegate' ? (
                    <div
                        style={style.flexRow}
                    >
                        <label
                            style={style.label}
                        >
                            Amount:
                        </label>
                        <div
                            style={style.value}
                        >
                            {`${(tx.msgs[0].value.amount.amount / 1000000).toFixed(3)} `} 
                            {tx.msgs[0].value.amount.denom.split('u')[1].toUpperCase().toUpperCase()}
                        </div>
                    </div>
                ) : (
                    <div
                        style={style.flexRow}
                    >
                        <label
                            style={style.label}
                        >
                            Amount:
                        </label>
                        <div
                            style={style.value}
                        >
                            {`${(tx.msgs[0].value.amount[0].amount / 1000000).toFixed(3)} `} 
                            {tx.msgs[0].value.amount[0].denom.split('u')[1].toUpperCase()}
                        </div>
                    </div>
                )
            }
            {
                tx.msgs[0].typeUrl === '/cosmos.staking.v1beta1.MsgDelegate' ? (
                    <div
                        style={style.flexRow}
                    >
                        <label
                            style={style.label}
                        >
                            To:
                        </label>
                        <div
                            style={style.value}
                        >
                            {tx.msgs[0].value.validatorAddress}
                        </div>
                    </div>
                ) : (
                    <div
                        style={style.flexRow}
                    >
                        <label
                            style={style.label}
                        >
                            To:
                        </label>
                        <div
                            style={style.value}
                        >
                            {tx.msgs[0].value.toAddress}
                        </div>
                    </div>

                )
            }
            <div
                style={style.flexRow}
            >
                <label
                    style={style.label}
                >
                    Gas:
                </label>
                <div
                    style={style.value}
                >
                    {tx.fee.gas}
                </div>
            </div>
            <div
                style={style.flexRow}
            >
                <label
                    style={style.label}
                >
                    Memo:
                </label>
                <div
                    style={style.value}
                >
                    {tx.memo}
                </div>
            </div>
        </div>
    )
}

export default TransactionInfo