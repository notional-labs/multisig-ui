const FlexRow = ({ components, style, justifyContent = 'center', direction = 'row', className }) => {
    return (
        <div
            className={className}
            style={{
                ...style,
                display: 'flex',
                justifyContent: justifyContent,
                flexDirection: direction
            }}
        >
            {
                components !== null && components.map((component, index) => {
                    return (
                       component
                    )
                })
            }
        </div>
    )
}

export default FlexRow