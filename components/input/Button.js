import Link from 'next/link'

const Button = ({ style, type = 'function', text, clickFunction, className, url, index }) => {
    return type === 'function' ? (
        <button
            key={index}
            style={{
                ...style,
                cursor: 'pointer'
            }}
            onClick={clickFunction}
        >
            {text}
        </button>
    ) : type === 'link' && (
        <Link
            href={url}
        >
            <button
                key={index}
                style={{
                    ...style,
                    cursor: 'pointer'
                }}
            >
                {text}
            </button>
        </Link>
    )
}

export default Button