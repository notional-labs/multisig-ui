const TransferMsg = ({ tx, style }) => {
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
                    {`${(tx.msgs[0].value.amount[0].amount / 1000000).toFixed(3)} `} {tx.msgs[0].value.amount[0].denom.split("u")[1].toUpperCase()}
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
                    {tx.msgs[0].value.toAddress}
                </div>
            </div>
        </>
    )
}

export default TransferMsg