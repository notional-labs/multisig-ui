import Input from "../../input/Input";
import Button from "../../input/Button";

const ShareForm = ({
    txBody,
    handleKeyGroupChange,
    handleCreate,
    chain,
    style,
    disabled
}) => {
    return (
        <>
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
                    backgroundColor: disabled ? '#808080' : 'black',
                    color: 'white',
                    padding: '1em',
                    width: '100%',
                    borderRadius: '10px',
                    marginTop: '20px',
                    border: 0
                }}
                clickFunction={async() => await handleCreate()}
                disable={disabled}
            />
        </>
    )
}

export default ShareForm