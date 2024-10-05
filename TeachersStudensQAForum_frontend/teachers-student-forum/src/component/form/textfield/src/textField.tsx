import React from "react";
import { TextField } from "@mui/material";
import {useField} from 'formik';

const TextfieldWrapper = ({
    name,
    Placeholder,
    type,
    inputprop,
    ...otherProps
}:{name: string, Placeholder: string, type:any, inputprop:any}) => {
    const [field, meta] = useField(name);

    const configTextfield: any = {
        ...field,
        ...otherProps,
        placeholder: Placeholder,
        type: type,
        InputProps: inputprop,
        fullWidth: true,
        variant: 'outlined'
    }

    if(meta && meta.touched && meta.error){
        configTextfield.error = true;
        configTextfield.helperText = meta.error;
        
    }
    return(
        <TextField {...configTextfield}/>
    )
}

export default TextfieldWrapper;