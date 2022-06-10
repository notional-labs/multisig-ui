const Button = ({style, type = 'function', text, clickFunction, className, url, index}) => {
    return type === 'function' && (
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
    )
}

export default Button