import { getValueFromDenom, getDisplayDenom } from "../../../libs/stringConvert"

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
                    {`${getValueFromDenom(tx.msgs[0].value.amount[0].denom, tx.msgs[0].value.amount[0].amount)} `} 
                    {getDisplayDenom(tx.msgs[0].value.amount[0].denom).toUpperCase()}
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