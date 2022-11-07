const Input = ({inputText, handleInputTextChange}) => {
    return(
    <input
        value = {inputText} 
        onChange={handleInputTextChange}
    />)
}

export default Input