const Feedback = ({feedback}) => {
    if(feedback === null) return null
    
    const feedbackStyles = {
        padding: '10px',
        maxWidth: '400px',
        border: 'black solid 2px',
        backgroundColor: '#3E7E57'
    }

    return (
        <div style={feedbackStyles}>
            {feedback}
        </div>
    )
}

export default Feedback