import { useState } from 'react';
import { useFormik } from 'formik';
import Box from '@mui/material/Box';

import Topbar from '../../components/Topbar';
import TextFormInput from '../../components/TextFormInput';
import FormBox from '../../components/FormBox';

export const TimecardImport = () => {
    const formik = useFormik({
        initialValues: {
            csvInput: "",
            assignmentsInput: ""
        },
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
    });
    return (
        <Box>
            <Topbar title="Timecard Import" />
            <Box display="flex" marginTop={"1rem"}>   
                 <FormBox handleSubmit={formik.handleSubmit}>
                    <TextFormInput 
                        id="csvInput" 
                        type="text" 
                        label="Input timesheet" 
                        multiline={true}
                        fieldProps={formik.getFieldProps("csvInput")}
                    />
                    <TextFormInput
                        id="assignmentsInput"
                        type="text"
                        label="Input assignments" 
                        multiline={true}
                        fieldProps={formik.getFieldProps("assignmentsInput")}
                    />
                </FormBox>
            </Box>
        </Box>
    );
}