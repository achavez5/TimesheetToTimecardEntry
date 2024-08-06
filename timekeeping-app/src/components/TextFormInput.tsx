import { TextField } from "@mui/material";
import React from "react";

type TextFormInputProps = {
    id: string,
    type: "number" | "text",
    label: string,
    adornment?: {
        position: "start" | "end" | "",
        text: string | "",
    },
    fieldProps?: any,
    margin?: string,
    multiline?: boolean,
};

const TextFormInput = ({id, type, label, fieldProps, multiline=false}: TextFormInputProps) => {
    
    return (multiline ? 
    <TextField
        id={id}
        type={type}
        label={label}
        InputLabelProps={{
            shrink: true,
        }}
        multiline
        sx={{width: "100%", borderRadius: "4px", padding: "0"}}
        {...fieldProps}
        /> : 
        <TextField
        id={id}
        type={type}
        label={label}
        InputLabelProps={{
            shrink: true,
        }}
        sx={{width: "100%", borderRadius: "4px", padding: "0"}}
        {...fieldProps}
    />)
};

export default TextFormInput;