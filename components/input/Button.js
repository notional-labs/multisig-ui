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
    handleMouseEnter,
    handleMouseLeave,
    hoverText
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
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {text}
        </button>
    ) : type === 'link' ? (
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
    ) : (
        <a
            href={url}
            target={'_blank'}
            dataToggle={hoverText}
            rel="noreferrer"
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
        </a>
    )
}

export default Button