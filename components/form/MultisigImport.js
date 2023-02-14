import { useState } from "react";
import Input from "../input/Input"
import Button from "../input/Button"
import { getMultisigAccountByAPI } from "../../libs/keplrClient";
import { openLoadingNotification, openNotification } from "../ulti/Notification"

const style = {
    inputNumberStyle: {
        borderRadius: "10px",
        padding: ".5em 1em",
        fontSize: "1.5rem",
        margin: "0 30px",
    },
    button: {
        backgroundColor: "black",
        color: "white",
        padding: "1em",
        width: "100%",
        borderRadius: "10px",
        marginTop: "20px",
        border: 0
    }
}

const MultisigImport = ({ chain }) => {
    const [address, setAddress] = useState("")
    const [err, setErr] = useState("")
    const handleOnBlur = async (e) => {
        try {
            if (!address || address === "") {
                setErr("Address must not be empty")
                return
            }
            const acc = await getMultisigAccountByAPI(chain.api, address)
            openLoadingNotification("open", "Importing multisig")
            router.push(`/multisig/${multisigAddress}`);
            openLoadingNotification("close")
            openNotification("success", "Import successfully")
        }
        catch (e) {
            openLoadingNotification("close")
            openNotification("error", e.message)
        }
    }

    const handleOnChange = (e) => {
        setAddress(e.targe.value)
    }

    const handleImport = async () => {

    }

    const checkDisable = () => {
        if (address === "") {
            return true
        }

        return false
    }

    return (
        <>
            <Input
                onChange={handleOnChange}
                value={address}
                label="Multisig Address"
                name="address"
                placeholder="Address here"
                onBlur={async (e) => {
                    await handleOnBlur(e);
                }}
                error={err}
            />
            <Button
                text={"IMPORT MULTISIG"}
                style={{
                    ...style.button,
                    backgroundColor: checkDisable() ? "#D9D9D9" : "black"
                }}
                clickFunction={async () => await handleImport()}
            />
        </>
    )
}

export default MultisigImport