import { getValueFromDenom } from "../../../libs/stringConvert"

const RedelegateMsg = ({ tx, style }) => {
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
                    {tx.msgs[0].value.amount.denom.substring(1).toUpperCase()}
                </div>
            </div>
            <div
                style={style.flexRow}
            >
                <label
                    style={style.label}
                >
                    From:
                </label>
                <div
                    style={style.value}
                >
                    {tx.msgs[0].value.validatorSrcAddress}
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
                    {tx.msgs[0].value.validatorDstAddress}
                </div>
            </div>
        </>
    )
}

export default RedelegateMsg