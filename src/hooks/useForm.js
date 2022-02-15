import { useState } from "react"

export const useForm = ( initialState = {} ) => {
    
    const [values, setValues] = useState(initialState);


    const reset = ( newFormState = initialState) => {
        setValues( newFormState );
    }

    const handleInputChange = ({ target }) => {
        // console.log(target)
        // console.log(values)
        setValues({
            ...values, 
            [ target.name ]: target.value
            
        });

    }

    return [ values , handleInputChange, reset ];


}