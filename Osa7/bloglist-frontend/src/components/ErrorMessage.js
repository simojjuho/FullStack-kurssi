const ErrorMessage = ({ errorMsg }) => {
  const errorStyle = {
    backgroundColor: '#FF7777',
    border: 'grey 2px solid',
    padding: '10px 5px 10px 5px',
    textAlign: 'center',
    maxWidth: '150px',
  }

  if (errorMsg) {
    return <p style={errorStyle}>{errorMsg}</p>
  }

  return null
}

export default ErrorMessage
