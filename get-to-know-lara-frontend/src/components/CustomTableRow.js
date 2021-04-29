import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {useHistory} from "react-router-dom";
import TableCell from "@material-ui/core/TableCell";
import IconButton from "@material-ui/core/IconButton";
import DraftsIcon from "@material-ui/icons/Drafts";
import MailIcon from "@material-ui/icons/Mail";
import DeleteIcon from "@material-ui/icons/Delete";
import TableRow from "@material-ui/core/TableRow";


const useStyles = makeStyles((theme) => ({
    row: {
        cursor: 'pointer',
        '&:hover': {
            boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
            background: '#e6f4f3',
        },
    },
    rowText: {
        color: "#00695f",
    },
    subjectRow: {
        fontSize: '17px',
        fontWeight: 'bold',
        margin: '0',
    },
    messageRow: {
        fontSize: '13px',
        margin: '0',
    },
}));

function CustomTableRow({mail, isInboxRow}) {
    const classes = useStyles();
    const history = useHistory();

    const showEmailDetails = (e) => {
        history.push(`/mails/view/${mail.id.toString()}`);
    }

    return (

        <TableRow key={mail.id} className={classes.row} onClick={showEmailDetails}>
            <TableCell align="center" component="th" scope="row">
                {mail.is_read ? <IconButton><DraftsIcon fontSize={"default"} color={"primary"}/></IconButton>
                    : <IconButton><MailIcon fontSize={"default"} color={"primary"}/></IconButton>}
            </TableCell>
            <TableCell align="left" className={classes.rowText}>{isInboxRow ? mail.sender.name : mail.target.name}</TableCell>
            <TableCell align="left" className={classes.rowText}>
                <p className={classes.subjectRow}>{mail.subject}</p>
                <p className={classes.messageRow}>{mail.message.slice(0, 100)}...</p></TableCell>
            <TableCell align="right" className={classes.rowText}>{mail.sent}</TableCell>
            <TableCell align="center">
                <IconButton><DeleteIcon fontSize={"default"} color={"primary"}/></IconButton></TableCell>
        </TableRow>

    )
}

export default CustomTableRow;

