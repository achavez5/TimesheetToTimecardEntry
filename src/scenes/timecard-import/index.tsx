import { useFormik } from 'formik';
import Box from '@mui/material/Box';
import { TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Paper, Snackbar, SnackbarCloseReason, Button } from '@mui/material/';
import { useState } from 'react';

import { Debug, testDataScen1 } from './testData';

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
    </TableHead>;
    let [tableBody, updateTableBody] = useState(
        [<TableRow></TableRow>]
    );
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (
        event: React.SyntheticEvent | Event,
        reason?: SnackbarCloseReason,
    ) => {
        if (reason === 'clickaway') {
        return;
        }

        setOpen(false);
    };


    // const [vertical, horizontal] = ['bottom', 'center'] as const;
    const formik = useFormik({
        initialValues: {
            csvInput: Debug ? testDataScen1.csvData : "",
            assignmentsInput: Debug ? testDataScen1.assignments : ""
        },
        onSubmit: values => {
            let csvInput = parseCsv(values.csvInput);
            let assignments = parseAssignments(values.assignmentsInput);

            if (csvInput === undefined || assignments === undefined) {
                return;    
            }

            let timecards = parseTimecards(csvInput, assignments);
            if (timecards === undefined) {
                return;
            }
            const rows = buildRowsByAssignment(assignments, timecards, handleClick);

            updateTableBody(rows);
        },
    });
    return (
        <Box>
            <Snackbar
                open={open}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                autoHideDuration={2000}
                onClose={handleClose}
                message="Copied ✅"
            />
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