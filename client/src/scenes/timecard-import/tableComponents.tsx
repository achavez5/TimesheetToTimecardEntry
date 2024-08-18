import { TableCell, TableRow, tableCellClasses, styled } from '@mui/material/';

export const StyledTableCell = styled(TableCell)(({ theme }) => (
    {
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.primary.light,
            fontSize: 14,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
        [`&.${tableCellClasses.footer}`]: {
            backgroundColor: theme.palette.primary.light,
            fontSize: 14,
        },
        [`&.${tableCellClasses.body}:nth-of-type(2)`]: {
            backgroundColor: theme.palette.mode === 'light' ? theme.palette.grey[300] : theme.palette.grey[800],
        },
        [`&.${tableCellClasses.body}:nth-of-type(8)`]: {
            backgroundColor: theme.palette.mode === 'light' ? theme.palette.grey[300] : theme.palette.grey[800],
        }
    }
));

export const CopyStyledTableCell = ({index, elem, handleClick}: {index: number, elem: string, handleClick: () => void}) => {
    const writeCellToClipboard = (e: any) => {
        let cellText = e.currentTarget.textContent?.toString() || "";
        handleClick();
        navigator.clipboard.writeText(cellText);
    };
    const LocCopyStyledTableCell = styled(StyledTableCell)(() => ({}));

    return <LocCopyStyledTableCell id={`${index === 0 || elem === "" || index === elem.length - 1 ? "" : "myHighlight" }`} onClick={index === 0 || elem === "" || index === elem.length - 1 ? () => null : writeCellToClipboard}>{elem}</LocCopyStyledTableCell>
}

export const StyledTableRow = styled(TableRow)(({ theme }) => (
    {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.mode === "light" ? theme.palette.grey[100] : theme.palette.grey[900],
        },
        '& #myHighlight': {
            cursor: "copy",
            '&:hover': {backgroundColor: theme.palette.primary.light},
            '&:active': {backgroundColor: theme.palette.primary.dark, cursor: 'auto'},
        }
    }
));