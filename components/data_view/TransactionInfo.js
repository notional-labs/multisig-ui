import TransferMsg from "./transaction/TransferMsg"
import DelegateMsg from "./transaction/DelegateMsg"
import RedelegateMsg from "./transaction/RedelegateMsg"
import UndelegateMsg from "./transaction/UndelegateMsg"

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

    const msgInfo = {
        "/cosmos.bank.v1beta1.MsgSend": (
            <TransferMsg
                tx={tx}
                style={style}
            />
        ),
        "/cosmos.staking.v1beta1.MsgDelegate": (
            <DelegateMsg
                tx={tx}
                style={style}
            />
        ),
        "/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward": (
            <div></div>
        ),
        "/cosmos.staking.v1beta1.MsgBeginRedelegate": (
            <RedelegateMsg
                tx={tx}
                style={style}
            />
        ),
        "/cosmos.staking.v1beta1.MsgUndelegate": (
            <UndelegateMsg
                tx={tx}
                style={style}
            />
        )
    }

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
                msgInfo[`${tx.msgs[0].typeUrl}`]
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