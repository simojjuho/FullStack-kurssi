import { useState } from "react"

//Learning custom hooks.

export const useField = (type) => {
    const [value, setValue] = useState('')

    const onChange = (event) => {
        setValue(event.target.value)
    }

    const onReset = () => {
        setValue('')
    }

    return {
        type,
        value,
        onChange,
        onReset
    }
}