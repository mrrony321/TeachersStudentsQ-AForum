import React from 'react';
import { TextField, MenuItem } from '@mui/material';
import { useField, useFormikContext } from 'formik';

const SelectWrapper = ({
    name,
    label,
    options,
    ...otherProps
}:{name: any,label: any, options: any}) =>{
    const {setFieldValue} = useFormikContext();
    const [field,meta] = useField(name)

    const handleChange = (event: any) =>{
        const {value} = event.target;
        setFieldValue(name,value)
    }
    
    const configSelect = {
        ...field,
        ...otherProps,
        label: label,
        error:false,
        select: true,
        fullWidth: true,
        helperText: '',
        onChange: handleChange
    }

    if(meta && meta.touched && meta.error){
        configSelect.error = true;
        configSelect.helperText = meta.error;
    }

    return (
        <TextField variant='outlined' {...configSelect}>
            {Object.keys(options).map((item,pos) => {
                return (
                    <MenuItem key={pos} value={item}>
                        {options[item]}
                    </MenuItem>
                )
            })}
        </TextField>
    )
}

export default SelectWrapper;