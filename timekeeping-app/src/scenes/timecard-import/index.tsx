import { useFormik } from 'formik';
import Box from '@mui/material/Box';
import { TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@mui/material/';
import { useState } from 'react';

import Topbar from '../../components/Topbar';
import TextFormInput from '../../components/TextFormInput';
import FormBox from '../../components/FormBox';
import SubmitButton from '../../components/SubmitButton';

import { parseCsv, parseAssignments, parseTimecards, buildRowsByAssignment } from './timecardHelpers';

export const TimecardImport = () => {
    let tableHeader = <TableHead>
        <TableRow>
            <TableCell>Assignment</TableCell>
            <TableCell>Sunday</TableCell>
            <TableCell>Monday</TableCell>
            <TableCell>Tuesday</TableCell>
            <TableCell>Wednesday</TableCell>
            <TableCell>Thursday</TableCell>
            <TableCell>Friday</TableCell>
            <TableCell>Saturday</TableCell>
            <TableCell>Total</TableCell>
        </TableRow>
    </TableHead>
    let [tableBody, updateTableBody] = useState(
        [<TableRow></TableRow>]
    );
    const formik = useFormik({
        initialValues: {
            csvInput: "",
            assignmentsInput: ""
        },
        onSubmit: values => {
            let csvInput = parseCsv(values.csvInput);
            let assignments = parseAssignments(values.assignmentsInput);

            console.log(csvInput);
            console.log(assignments);

            if (csvInput === undefined || assignments === undefined) {
                alert("Invalid input. Please check your input and try again.");
                return;    
            }

            let timecards = parseTimecards(csvInput, assignments);
            if (timecards === undefined) {
                alert("Invalid input. Please check your input and try again.");
                return;
            }
            const rows = buildRowsByAssignment(assignments, timecards);

            updateTableBody(rows);
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
                    <SubmitButton label="Submit" />
                </FormBox>
            </Box>
            <TableContainer component={Paper}>
                <Table>
                    {tableHeader}
                    <TableBody>{tableBody}</TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}