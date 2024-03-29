import { useEffect, useState } from "react"
import axios from 'axios'

export const useField = (type) => {
    const [value, setValue] = useState('')
  
    const onChange = (event) => {
      setValue(event.target.value)
    }
  
    return {
      type,
      value,
      onChange
    }
  }
  
  export const useCountry = (name) => {
    const [country, setCountry] = useState(null)
  
    useEffect(() => {
        if(name) {
        axios.get(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
            .then(country => {
                setCountry({
                    ...country,
                    found: true})
            })
        }
    }, [name])
  
    return country
  }