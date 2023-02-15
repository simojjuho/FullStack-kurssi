const Notification = ({ notification }) => {
    
    const getStyle = () => {
    if(notification) {
        return {
        border: 'solid 2px black',
        maxWidth: '400px',
        backgroundColor: 'lightGreen',
        marginTop: '10px',
        padding: '5px'
    }
    } else {
        return {
            display: 'hidden'
        }
    }}

    return (
        <div style={getStyle()}>
            {notification}
        </div>
    )
}

export default Notification