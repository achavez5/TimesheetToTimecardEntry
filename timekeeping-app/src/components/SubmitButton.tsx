import { Button, useTheme } from "@mui/material";

type SubmitProps = {
    label: string,
    scrollToId?: string, 
};

const SubmitButton = ({label, scrollToId=""}: SubmitProps) => {
        
    return (
        <Button 
            variant="contained" 
            sx={{width:"100%"}}
            type="submit"
        >
            {label}
        </Button>
    )
}

export default SubmitButton; 