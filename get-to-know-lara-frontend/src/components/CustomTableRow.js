import React, {useEffect, useRef, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {useHistory} from "react-router-dom";
import TableCell from "@material-ui/core/TableCell";
import IconButton from "@material-ui/core/IconButton";
import DraftsIcon from "@material-ui/icons/Drafts";
import MailIcon from "@material-ui/icons/Mail";
import DeleteIcon from "@material-ui/icons/Delete";
import TableRow from "@material-ui/core/TableRow";
import axios from "axios";
import {BASE_URL, MESSAGES} from "../Constants";


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
        fontWeight: email => email.is_read ? 'bold' : 'normal',
    },
    subjectRow: {
        fontSize: '17px',
        margin: '0',
    },
    messageRow: {
        fontSize: '13px',
        margin: '0',
    },
    read: {
        // fontWeight: props => props.mail && props.mail.is_read ? 'bold' : 'normal',
        fontWeight: 'bold',
    }
}));

function CustomTableRow({mail, isInboxRow}) {
    const classes = useStyles();
    const history = useHistory();

    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState(mail);

    const showEmailDetails = (e) => {
        history.push(`/mails/view/${mail.id.toString()}`);
    }

    const toggleIsRead = (e) => {
        setLoading(true);
        e.preventDefault();
        axios.put(`${BASE_URL}/get-to-know-lara-php-mahanna90/get-to-know-lara-backend/lara/public/api/mails/mark-as-unread/${mail.id.toString()}`, {},{
            withCredentials: true,
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Accepted": "application/json",
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            },
        })
            .then((response) => {
                console.log(response);
                setEmail(prevMails => response.data);
                setLoading(false);
            })
            .catch(error => {
                console.log(error);
                alert("Cannot update mail: " + error);
            });
    }


    return (

        <TableRow key={email.id} className={classes.row} >
            <TableCell align="center" component="th" scope="row">
                {email.is_read ? <IconButton onClick={toggleIsRead}><DraftsIcon fontSize={"default"} color={"primary"}/></IconButton>
                    : <IconButton onClick={toggleIsRead}><MailIcon fontSize={"default"} color={"primary"}/></IconButton>}
            </TableCell>
            <TableCell align="left" className={classes.rowText} onClick={showEmailDetails}>{isInboxRow ? email.sender.name : email.target.name}</TableCell>
            <TableCell align="left" className={classes.rowText} onClick={showEmailDetails}>
                <p className={classes.subjectRow}>{email.subject}</p>
                <p className={classes.messageRow}>{email.message.slice(0, 100)}...</p></TableCell>
            <TableCell align="right" className={classes.rowText} onClick={showEmailDetails}>{email.sent ? email.sent.slice(0, -8) : ""}</TableCell>
            <TableCell align="center">
                <IconButton><DeleteIcon fontSize={"default"} color={"primary"}/></IconButton></TableCell>
        </TableRow>

    )
}

export default CustomTableRow;

