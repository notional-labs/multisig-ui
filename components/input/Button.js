import Link from 'next/link'

const Button = ({ 
    style, 
    type = 'function', 
    text, 
    clickFunction, 
    className, 
    url, 
    index, 
    disable, 
}) => {
    return type === 'function' ? (
        <button
            key={index}
            style={{
                ...style,
                cursor: 'pointer'
            }}
            onClick={clickFunction}
            disabled={disable}
            className={className}
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
                className={className}
            >
                {text}
            </button>
        </Link>
    )
}

export default Button