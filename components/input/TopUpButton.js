import Button from "./Button"
import { UpOutlined } from "@ant-design/icons"
import { useEffect, useState } from "react";

const TopUpButton = ({ }) => {
    const [showTopBtn, setShowTopBtn] = useState(false)

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 40) {
                setShowTopBtn(true);
            } else {
                setShowTopBtn(false);
            }
        });
    }, []);

    const scrollUp = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    } 

    return (
        <Button
            text={(
                <UpOutlined
                    style={{
                        color: 'white'
                    }}
                />
            )}
            style={{
                backgroundColor: 'black',
                aspectRatio: '1/1',
                width: '50px',
                borderRadius: '10px',
                position: 'fixed',
                zIndex: 2,
                left: '95%',
                top: '95%',
                display: showTopBtn ? 'block' : 'none'
            }}
            clickFunction={scrollUp}
        />
    )
}

export default TopUpButton