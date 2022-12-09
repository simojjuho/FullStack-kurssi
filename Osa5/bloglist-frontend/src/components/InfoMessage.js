const InfoMessage = ({ infoMsg }) => {
    const infoStyle = {
        backgroundColor: '#77FF77',
        border: 'grey 2px solid',
        padding: '10px 5px 10px 5px',
        textAlign: 'center',
        maxWidth: '150px'
    }
    
    if (infoMsg) {
        return (
            <p style={infoStyle}>{infoMsg}</p>
    )}

    return null
}

export default InfoMessage