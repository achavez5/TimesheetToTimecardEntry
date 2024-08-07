import { useFormik } from 'formik';
import Box from '@mui/material/Box';

import Topbar from '../../components/Topbar';
import TextFormInput from '../../components/TextFormInput';
import FormBox from '../../components/FormBox';
import SubmitButton from '../../components/SubmitButton';

import { parseCsv, parseAssignments, parseTimecards } from './timecardHelpers';

export const TimecardImport = () => {
    const formik = useFormik({
        initialValues: {
            csvInput: `Sunday	Monday	Tuesday	Wednesday	Thursday	Friday
					
					
					
			INT33000 Ethos story w/Brandon	INT63000 Laptop update	PRO13000 FDN Hypercare
	PRO13000 FDN Hypercare	PRO13000 FDN Hypercare	PRO13000 FDN Hypercare call	PRO53000 T&M BKO prep	PRO13000 FDN
	PRO13000 FDN	PRO13000 FDN	PRO13000 FDN	PRO13000 FDN Hypercare	PRO13000 FDN
	PRO13000 FDN	PRO53000 T&M Communications	INT53000 S2P sprint review	PRO13000 FDN	PRO13000 FDN AM Invoicing party meeting
	PRO13000 FDN Scrum	PRO13000 FDN Scrum	INT53000	PRO13000 FDN Scrum	PRO13000 FDN
	PRO13000 FDN Hypercare	PRO13000 FDN	PRO73000 T&M R&D issue	PRO53000 T&M BKO	PRO13000 FDN Scrum
	INT23000 PST Load/save tools	PRO13000 FDN Hypercare	PRO73000 T&M	PRO53000 T&M	PRO53000 T&M Investigation
	INT23000	PRO13000 FDN	INT53000 S2P planning	PRO53000 T&M	PRO53000 T&M Meeting
	INT23000	PRO13000 FDN	PRO13000 FDN Scrum	PRO53000 T&M	PRO53000 T&M
	INT23000	PRO13000 FDN	PRO13000 FDN Hypercare	PRO53000 T&M	PRO53000 T&M
	INT23000	PRO13000 FDN	PRO73000 T&M R&D issue	PRO83000 T&M Meeting prep	PRO53000 T&M
	INT23000	PRO13000 FDN	PRO73000 T&M	PRO83000 T&M Phase 2 BKO	PRO53000 T&M
	INT23000	PRO13000 FDN	PRO73000 T&M	PRO83000 T&M	INT63000 Jean-Michele Q2 video
	INT23000	PRO13000 FDN	PRO73000 T&M	PRO83000 T&M Investigation	INT53000 General office hours
	INT23000	PRO53000 T&M Communications	PRO33000 CO-02 T&M PRO33000-VM09	PRO83000 T&M Setup	INT53000
	Lunch	PRO53000 T&M			
					
	INT63000 Break	INT63000 Break	INT63000 Break	INT63000 Break	INT63000 Break
	INT63000	INT63000	INT63000	INT63000	INT63000
	INT23000 PST Load/save tools	PRO53000 T&M Communications	PRO13000 FDN Hypercare	PRO53000 T&M Investigation	INT53000 Lamarr planning
	INT23000	PRO53000 T&M	PRO13000 FDN	PRO53000 T&M	PRO13000 FDN Planning
	INT23000	PRO83000 FDN Investigation	PRO73000 T&M Update to 307	PRO53000 T&M	PRO53000 T&M Planning
	INT23000	PRO83000 FDN	PRO73000 T&M	PRO53000 T&M Communications	PRO33000 CO-02 T&M Planning
	INT23000	PRO83000 FDN	PRO73000 T&M	PRO53000 T&M	INT53000 Lamarr planning
	INT23000	PRO83000 FDN	PRO83000 FDN Investigation	PRO73000 T&M QA update	PRO53000 T&M Communications
	INT23000	INT53000 Brandon user story	PRO83000 FDN	PRO53000 T&M Billing separation	PRO53000 T&M Billing separation
	INT23000	INT53000	PRO13000 FDN Payee issue	PRO53000 T&M	PRO53000 T&M
	INT23000	PRO33000 CO-02 T&M PRO33000-VM09	PRO83000 FDN Investigation	PRO53000 T&M	PRO53000 T&M
	INT23000	PRO33000 CO-02 T&M	PRO83000 FDN Communications	PRO53000 T&M	PRO53000 T&M
	INT23000	PRO33000 CO-02 T&M	INT63000 Timecards	INT53000 Lamarr retro	INT63000 Timecards
	INT23000	INT53000 Fix Brandon's build		INT53000	PRO13000 FDN Hypercare
	INT23000	INT53000		INT53000	PRO73000 T&M QA update
	INT23000			INT53000	
	INT23000			INT53000	
				INT53000	
					
					
					
					
					
					
					
					
					
					
PRO13000 FDN Hypercare	PRO13000 FDN Hypercare	PRO53000 T&M Generate QA logo, communications	PRO13000 FDN Hypercare	PRO53000 T&M Investigation	
PRO13000 FDN	PRO13000 FDN	PRO13000 FDN Hypercare	PRO33000 CO-02 T&M PRO33000-VM09	PRO53000 T&M	
PRO13000 FDN Hypercare call	PRO13000 FDN Hypercare call	PRO13000 FDN Hypercare call	PRO13000 FDN Hypercare call	PRO13000 FDN Hypercare call	
PRO13000 FDN Hypercare	PRO13000 FDN Hypercare	PRO13000 FDN Hypercare	PRO33000 CO-02 T&M PRO33000-VM09	PRO13000 FDN Hypercare	
PRO13000 FDN	PRO13000 FDN	PRO13000 FDN	PRO33000 CO-02 T&M	PRO53000 T&M Billing separation	
PRO13000 FDN	PRO13000 FDN	PRO33000 CO-02 T&M PRO33000-VM09	PRO73000 T&M Update to 307	PRO53000 T&M	
PRO13000 FDN	PRO13000 FDN	PRO33000 CO-02 T&M	PRO33000 CO-02 T&M PRO33000-VM09	PRO53000 T&M	
PRO13000 FDN	PRO13000 FDN	PRO33000 CO-02 T&M	PRO33000 CO-02 T&M	PRO53000 T&M	
					`,
            assignmentsInput: `PRO13000 FDN
PRO13000 CO16 T&M
PRO23000 FDN
PRO33000 VM FDN
PRO33000 CO-02 T&M
PRO43000 T&M
PRO53000 T&M
PRO63000 FDN
PRO63000 T&M
PRO73000 T&M
PRO83000 FDN
PRO83000 T&M
PRO83001 T&M
PRO93000 FDN
PRO93000 T&M
PRO03000 T&M
INT13000
INT23000
INT33000
INT43000
INT53000
INT63000
INT73000`
        },
        onSubmit: values => {
            let csvInput = parseCsv(values.csvInput);
            let assignments = parseAssignments(values.assignmentsInput);

            console.log(csvInput);
            console.log(assignments);
            let timecards = parseTimecards(csvInput, assignments);
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
        </Box>
    );
}