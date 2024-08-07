type csvDayEntry = {
    index: number,
    data: string[]
}

type csvData = Record<string, csvDayEntry>

type timeEntry = {
    assignment: string,
    hours: number,
    notes: string
}

type timecardData = {
    index: number,
    data: timeEntry[]
}

type timecardDayEntries = Record<string, timecardData>


export const parseCsv = (csvInput: string) => {
    if (csvInput === "") {
        alert("Please enter a string in tab delimited format.");
        return;
    }
    const csvData: csvData = {
        "Sunday": {
            index: -1,
            data: []
        },
        "Monday": {
            index: -1,
            data: []
        },
        "Tuesday": {
            index: -1,
            data: []
        },
        "Wednesday": {
            index: -1,
            data: []
        },
        "Thursday": {
            index: -1,
            data: []
        },
        "Friday": {
            index: -1,
            data: []
        },
        "Saturday": {
            index: -1,
            data: []
        }
    };

    const rows: string[] = csvInput.split("\n");
    const headers: string[] = rows[0].split("\t");
    
    for (let i = 0; i < headers.length; i++) {
        let header = headers[i];
        if (csvData[header] === undefined) {
            alert("Invalid header: " + header);
            return;
        }
        csvData[header].index = i;
    }

    for (let i = 1; i < rows.length; i++) {
        let row = rows[i].split("\t");
        if (row.length !== headers.length) {
            alert("Row " + i + " does not have the same number of columns as the header. Format invalid. Please fix to continue processing.");
            return;
        }
        for (let j = 0; j < row.length; j++) {
            csvData[headers[j]].data.push(row[j]);
        }
    }
    return csvData;
};

export const parseAssignments = (assignmentsInput: string | undefined) => 
{
    if (assignmentsInput === "" || assignmentsInput === undefined) {
        alert("Please enter a string in tab delimited format.");
        return;
    }
    return assignmentsInput.split("\n");
};

export const parseTimecards = (csvData: csvData, assignments: string[] | undefined) => {
    if (csvData === undefined || assignments === undefined) {
        return;
    }

    let timecards: timecardDayEntries = {
        "Sunday": {
            index: 0,
            data: []
        },
        "Monday": {
            index: 1,
            data: []
        },
        "Tuesday": {
            index: 2,
            data: []
        },
        "Wednesday": {
            index: 3,
            data: []
        },
        "Thursday": {
            index: 4,
            data: []
        },
        "Friday": {
            index: 5,
            data: []
        },
        "Saturday": {
            index: 6,
            data: []
        }
    };

    let days = Object.keys(timecards);
    for (let i = 0; i < days.length; i++)
    {
        let day = days[i];
        if (csvData[day]?.index < 0)
        {
            // no time for day or day does not exist (object prototype properties)
            continue;
        }

    }   
};