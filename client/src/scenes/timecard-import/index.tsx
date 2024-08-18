import { useFormik } from 'formik';
import Box from '@mui/material/Box';
import { 
    TableContainer, Table, TableBody, TableFooter, 
    TableHead, TableRow, Paper, Snackbar, 
    SnackbarCloseReason, Tab, Tabs
} from '@mui/material/';
import { useState } from 'react';

import { UseTestData, testDataScen1 } from './testData';

import Topbar from '../../components/Topbar';
import TextFormInput from '../../components/TextFormInput';
import FormBox from '../../components/FormBox';
import SubmitButton from '../../components/SubmitButton';

import { parseCsv, parseAssignments, parseTimecards, buildRowsByAssignment } from './timecardHelpers';
import { StyledTableCell } from './tableComponents';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}
function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
}

function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
}

export const TimecardImport = () => {
    let tableHeader = <TableHead>
        <TableRow>
            <StyledTableCell>Assignment</StyledTableCell>
            <StyledTableCell>Sunday</StyledTableCell>
            <StyledTableCell>Monday</StyledTableCell>
            <StyledTableCell>Tuesday</StyledTableCell>
            <StyledTableCell>Wednesday</StyledTableCell>
            <StyledTableCell>Thursday</StyledTableCell>
            <StyledTableCell>Friday</StyledTableCell>
            <StyledTableCell>Saturday</StyledTableCell>
            <StyledTableCell>Total</StyledTableCell>
        </TableRow>
    </TableHead>;
    let [timeTableBody, updateTimeTableBody] = useState(
        [<TableRow></TableRow>]
    );
    let [notesTableBody, updateNotesTableNotes] = useState(
        [<TableRow></TableRow>]
    );
    let [footerRow, updateFooterRow] = useState([
        <TableRow>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell>0</StyledTableCell>
            <StyledTableCell>0</StyledTableCell>
            <StyledTableCell>0</StyledTableCell>
            <StyledTableCell>0</StyledTableCell>
            <StyledTableCell>0</StyledTableCell>
            <StyledTableCell>0</StyledTableCell>
            <StyledTableCell>0</StyledTableCell>
            <StyledTableCell>0</StyledTableCell>
        </TableRow>]);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(0);

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

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };


    // const [vertical, horizontal] = ['bottom', 'center'] as const;
    const formik = useFormik({
        initialValues: {
            csvInput: UseTestData ? testDataScen1.csvData : "",
            assignmentsInput: UseTestData ? testDataScen1.assignments : ""
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
            const [timeRows, notesRows, footerRow] = buildRowsByAssignment(assignments, timecards, handleClick);

            updateTimeTableBody(timeRows);
            updateNotesTableNotes(notesRows);
            updateFooterRow(footerRow);
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
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Time" {...a11yProps(0)} />
                    <Tab label="Notes" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}> 
                <TableContainer component={Paper}>
                    <Table>
                        {tableHeader}
                        <TableBody>{timeTableBody}</TableBody>
                        <TableFooter>{footerRow}</TableFooter>
                    </Table>
                </TableContainer>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <TableContainer component={Paper}>
                    <Table>
                        {tableHeader}
                        <TableBody>{notesTableBody}</TableBody>
                        <TableFooter>{footerRow}</TableFooter>
                    </Table>
                </TableContainer>
            </CustomTabPanel>
        </Box>
    );
}