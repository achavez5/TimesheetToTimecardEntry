
import { TableCell, TableRow } from '@mui/material/';

type timeEntry = {
    hours: number,
    notes: string
}

type timecardData = {
    data: Record<string, timeEntry>,
    csvData: string[]
}

export type timecardDayEntries = Record<string, timecardData>


export const parseCsv = (csvInput: string): timecardDayEntries | undefined => {
    if (csvInput === "") {
        alert("Please enter a string in tab delimited format.");
        return;
    }
    const timecardData: timecardDayEntries = {};
    const validHeaders = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const rows: string[] = csvInput.split("\n");
    const headers: string[] = rows[0].split("\t");

    for (let i = 1; i < rows.length; i++) {
        let rowEntries = rows[i].split("\t");
        if (rowEntries.length !== headers.length) {
            alert("Row " + i + " does not have the same number of columns as the header. Format invalid. Please fix to continue processing.");
            return;
        }
        for (let j = 0; j < rowEntries.length; j++) {
            let header = headers[j];
            if (validHeaders.indexOf(header) < 0) {
                // skipping invalid header
                continue;
            }

            if (timecardData[header] === undefined)
            {
                timecardData[header] = {
                    data: {},
                    csvData: []
                };
            }
            timecardData[header].csvData.push(rowEntries[j]);
        }
    }
    return timecardData;
};

export const parseAssignments = (assignmentsInput: string | undefined) => 
{
    if (assignmentsInput === "" || assignmentsInput === undefined) {
        alert("Please enter a string in tab delimited format.");
        return;
    }
    return assignmentsInput.split("\n");
};

export const parseTimecards = (timecards: timecardDayEntries | undefined, assignments: string[] | undefined) => {
    if (timecards === undefined || assignments === undefined) {
        return;
    }

    const days = Object.keys(timecards);
    for (let i = 0; i < days.length; i++)
    {
        const day = days[i];
        if (timecards[day]?.csvData.length < 0)
        {
            // no time for day or day does not exist (object prototype properties)
            continue;
        }

        const dayData = timecards[day].csvData;
        let currentAssignment = "";
        for (let j = 0; j < dayData.length; j++)
        {
            if (dayData[j] === "")
            {
                continue;
            }

            if (currentAssignment === "" || !dayData[j].includes(currentAssignment))
            {
                currentAssignment = findAssignment(dayData[j], assignments);
            }

            if (!currentAssignment)
            {
                continue;
            }

            if (timecards[day].data[currentAssignment] === undefined)
            {
                timecards[day].data[currentAssignment] = {
                    hours: 0,
                    notes: ""
                };
            }

            let timecardData = timecards[day].data[currentAssignment];
            timecardData.hours += 0.25;
            let note = dayData[j].substring(currentAssignment.length + 1 /** plus one to remove the space */);
            if (note && timecardData.notes.indexOf(note) < 0){
                let assignmentData = timecards[day].data[currentAssignment];
                assignmentData.notes += (assignmentData.notes.length > 0 ? ", " : "") + note;
            }
        }
    }
    return timecards;
};

const findAssignment = (currentEntry:string , assignments: string[]) => {
    for (let i = 0; i < assignments.length; i++) {
        if (currentEntry.includes(assignments[i])) {
            return assignments[i];
        }
    }
    return "";
};

export const buildRowsByAssignment = (assignments: string[], timecardData: timecardDayEntries) => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let rows = [];

    for (let i = 0; i < assignments.length; i++) {
        let row = [assignments[i]];
        let totalHours = 0;
        for (let j = 0; j < days.length; j++) {
            let dayData = timecardData[days[j]]?.data;
            if (dayData === undefined || dayData[assignments[i]] === undefined) {
                row.push("");
            } else {
                row.push(dayData[assignments[i]].hours + (dayData[assignments[i]].notes.length > 0 ? " (" + dayData[assignments[i]].notes + ")" : ""));
                totalHours += dayData[assignments[i]].hours;
            }
        }
        if (totalHours > 0) {
            row.push(totalHours.toString());
        } else {
            continue;
        }
        rows.push(<TableRow key={i+1}>{row.map(elem => <TableCell>{elem}</TableCell>)}</TableRow>);
    }
    return rows;
}