import { Image } from "antd"

const LoadingPage = ({}) => {
    return (
        <div
            style={{
                position: 'fixed',
                height: '100%',
                width: '100vw',
                backgroundColor: 'white',
                textAlign: 'center',
                zIndex: 10,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
            }}
        >
            <Image
                src={'/images/loading.gif'}
                style={{
                    width: '50vw',
                    margin: 'auto 0',
                }}
                preview={false}
            />
        </div>
    )
}

export default LoadingPage