import { getValueFromDenom, getDisplayDenom } from "../../../libs/stringConvert"

const UndelegateMsg = ({ tx, style }) => {
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
                    {`${getValueFromDenom(tx.msgs[0].value.amount.denom, tx.msgs[0].value.amount.amount)} `}
                    {getDisplayDenom(tx.msgs[0].value.amount.denom).toUpperCase()}
                </div>
            </div>
            <div
                style={style.flexRow}
            >
                <label
                    style={style.label}
                >
                    Unbond from:
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

export default UndelegateMsg