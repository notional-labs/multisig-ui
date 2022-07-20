const DelegateMsg = ({ tx, style }) => {
    return (
        <>
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
                    {tx.msgs[0].value.amount.denom.split("u")[1].toUpperCase()}
                </div>
            </div>
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
        </>
    )
}

export default DelegateMsg