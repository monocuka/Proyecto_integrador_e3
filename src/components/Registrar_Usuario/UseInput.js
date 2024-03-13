import {useState} from 'react'

const useInput = (type) => {
    const [value, setValue] = useState('')

    const onChange = (event) => {
        setValue(event.target.value)
    }

    return { value, onChange, type }

}
export default useInput