const Error = ({errorMsg}) => {
    if(errorMsg === null) return null
    
    const feedbackStyles = {
        padding: '10px',
        maxWidth: '400px',
        border: 'black solid 2px',
        backgroundColor: '#EA8D79'
    }

    return (
        <div style={feedbackStyles}>
            {errorMsg}
        </div>
    )
}

export default Error