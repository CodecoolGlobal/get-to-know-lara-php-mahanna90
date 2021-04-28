import React from "react";
import {createMuiTheme, makeStyles, ThemeProvider} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {useHistory} from "react-router-dom";
import {deepOrange, teal} from "@material-ui/core/colors";
import {Paper} from "@material-ui/core";
// import {DataGrid} from '@material-ui/data-grid';

// const columns = [
//     {field: 'id', headerName: 'ID', width: 70},
//     {field: 'user_from', headerName: 'Sender', width: 130},
//     {field: 'subject', headerName: 'Subject', width: 200},
//     {
//         field: 'sent',
//         headerName: 'Sent date',
//         type: 'datetime',
//         width: 130,
//     },
//     {
//         field: 'read',
//         headerName: 'Read',
//         type: 'boolean',
//         sortable: false,
//         width: 70,
//     },
//     {
//         field: 'delete',
//         headerName: 'Delete',
//         sortable: false,
//         width: 70,
//     },
// ];
//
// const rows = [
//     {id: 1, user_from: 'Jon Snow', subject: 'alert', sent: Date.now()},
//     {id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42},
//     {id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45},
//     {id: 4, lastName: 'Stark', firstName: 'Arya', age: 16},
//     {id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null},
//     {id: 6, lastName: 'Melisandre', firstName: null, age: 150},
//     {id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44},
//     {id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36},
//     {id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65},
// ];


const useStyles = makeStyles((theme) => ({
    div: {
        width: '100%',
        backgroundColor: theme.palette.primary,
        height: '60px',
        borderRadius: '5px',
        '&:hover': {
            background: 'lightgreen',
            boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
        },
        cursor: 'pointer',
        display: 'flex',
        flexFlow: 'row',
        gap: '5px'
    },
    from: {
        border: '1px solid black',
        width: '20%',
    },
    subject: {
        border: '1px solid black',
    },
    message: {
        border: '1px solid black',
    },
    date: {
        border: '1px solid black',
        width: '15%',
    },
    unread: {
        border: '1px solid black',
        width: '5%',
    },
    delete: {
        border: '1px solid black',
        width: '5%',
    },
    mailBody: {
        display: 'flex',
        flexFlow: 'column',
        border: '1px solid black',
        width: '55%',
    }
}));

function EmailRow() {
    const classes = useStyles();
    const history = useHistory();


    return (

            <div className={classes.div}>
                <div id="unread" className={classes.unread}>Mark unread</div>
                <div id="from" className={classes.from}>Sent from</div>
                <div className={classes.mailBody}>
                    <div id="subject" className={classes.subject}>Subject</div>
                    <div id="message" className={classes.message}>Message</div>
                </div>
                <div id="date" className={classes.date}>Date</div>
                <div id="delete" className={classes.delete}>Delete</div>
            </div>

            // <div style={{height: 400, width: '100%'}}>
            //     <DataGrid rows={rows} columns={columns} pageSize={5} />
            // </div>
    )
}

export default EmailRow;

