const ThresholdInfo = ({ signatures, threshold }) => {
    return (
        <div
            style={{
                boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.25)',
                borderRadius: '10px',
                padding: '2em',
                marginTop: '30px'
            }}
        >
            <h2>
                Threshold
            </h2>
            <text>
                Once the number of required signatures have been created this transaction will be ready to broadcast
            </text>
            <div
                style={{
                    padding: '.5em 1em',
                    backgroundColor: '#D9D9D9',
                    borderRadius: '10px',
                    textAlign: 'center',
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    marginTop: '20px'
                }}
            >
                {`${signatures.length} of ${threshold} signatures complete`}
            </div>
        </div>
    )
}

export default ThresholdInfo