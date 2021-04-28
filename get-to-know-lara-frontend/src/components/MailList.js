import React, {useEffect, useState} from 'react';
import axios from "axios";
import {BASE_URL, MESSAGES} from "../Constants";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import {useHistory} from "react-router-dom";
import {Paper} from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import MailIcon from '@material-ui/icons/Mail';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";


const useStyles = makeStyles((theme) => ({
    paper: {
        margin: '30px',
        padding: '30px',
        display: 'flex',
        flexDirection: 'column',
        // alignItems: 'center',
    },
    title: {
        margin: '10px',
    },
    table: {
        minWidth: 650,
    },
    row: {
        cursor: 'pointer',
        '&:hover': {
            boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
            background: '#e6f4f3',
        },
    },
    tableHeader: {
        background: '#e0f2f1',
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
    rowText: {
        color: "#00695f",
    },
    unreadHeader: {
        maxWidth: '110px',
        fontWeight: 'bold',
        fontSize: '18px',
        color: "#00695f",
    },
    fromHeader: {
        minWidth: '130px',
        fontWeight: 'bold',
        fontSize: '18px',
        color: "#00695f",
    },
    subjectHeader: {
        fontWeight: 'bold',
        fontSize: '18px',
        color: "#00695f",
    },
    sentHeader: {
        fontWeight: 'bold',
        fontSize: '18px',
        color: "#00695f",
    },
    deleteHeader: {
        fontWeight: 'bold',
        fontSize: '18px',
        color: "#00695f",
    }
}));


function MailList() {
    const classes = useStyles();
    const history = useHistory();

    const [mails, setMails] = useState([]);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('user')));

    useEffect(() => {
        setLoading(true);
        if (sessionStorage.getItem('token')) {
            axios.get(`${BASE_URL}/get-to-know-lara-php-mahanna90/get-to-know-lara-backend/lara/public/api/mails/inbox`, {
                withCredentials: true,
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "Accepted": "application/json",
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                },
                params: {
                    id: user.id,
                }
            })
                .then((res) => {
                    console.log(res);
                    setMails(prevMails => res.data)
                    setLoading(false);
                })
                .catch(function (error) {
                    alert("Error: Cannot fetch emails!");
                    // setMessage(MESSAGES.LOGIN_ERROR_MSG);
                    // sessionStorage.clear();
                });
        } else {
            console.log("no session token yet");
        }

        // return () => {
        //     console.log("unmounted mails/inbox useEffect")
        // }
    }, []);


    // const fetchSenderName = (senderId) => {
    //     setLoading(true);
    //     let sender = null;
    //     if (mails !== []) {
    //         axios.get(`${BASE_URL}/get-to-know-lara-php-mahanna90/get-to-know-lara-backend/lara/public/api/user/${senderId}`, {
    //             withCredentials: true,
    //             mode: "cors",
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 "Accepted": "application/json",
    //                 'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    //             },
    //         })
    //             .then((res) => {
    //                 console.log(res);
    //                 sender = res.data;
    //             })
    //             .catch(function (error) {
    //                 alert("Error: Cannot fetch user!");
    //             });
    //     }
    //     return sender;
    // }

    // useEffect(() => {
    //     setLoading(true);
    //
    //     const fetchSenders = async () => {
    //         axios.get(`${BASE_URL}/get-to-know-lara-php-mahanna90/get-to-know-lara-backend/lara/public/api/user/${senderId}`, {
    //             withCredentials: true,
    //             mode: "cors",
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 "Accepted": "application/json",
    //                 'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    //             },
    //         })
    //             .then(response => {
    //                 loading(false);
    //                 setSprites(response.data.sprites);
    //                 const result = checkCatched();
    //                 if (result) {
    //                     setIsCaught(true);
    //                 }
    //             })
    //             .catch((error) => console.log(error))
    //     }
    //
    //     fetchSenders();
    //
    // } , [mails])

    return (
        <>
            {/*{mails.map((mail, i) => (*/}
            {/*    <h1 key={i}>{mail.subject}</h1>*/}
            {/*))}*/}
            <Paper elevation={3} className={classes.paper}>
                <Typography color={"primary"} variant="h4" id="tableTitle" component="div" className={classes.title}>
                    Inbox
                </Typography>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow className={classes.tableHeader}>
                                <TableCell align="center" className={classes.unreadHeader}>Mark unread</TableCell>
                                <TableCell align="left" className={classes.fromHeader}>Sent from</TableCell>
                                <TableCell align="left" className={classes.subjectHeader}>Subject</TableCell>
                                <TableCell align="right" className={classes.sentHeader}>Date and time</TableCell>
                                <TableCell align="center" className={classes.deleteHeader}>Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {mails.map((mail) => (
                                <TableRow key={mail.id} className={classes.row}>
                                    <TableCell align="center" component="th" scope="row">
                                        {mail.is_read ? <IconButton><DraftsIcon fontSize={"default"} color={"primary"}/></IconButton>
                                            : <IconButton><MailIcon fontSize={"default"} color={"primary"}/></IconButton>}
                                    </TableCell>
                                    <TableCell align="left" className={classes.rowText}>{mail.sender.name}</TableCell>
                                    <TableCell align="left" className={classes.rowText}>
                                        <p className={classes.subjectRow}>{mail.subject}</p>
                                        <p className={classes.messageRow}>{mail.message}</p></TableCell>
                                    <TableCell align="right" className={classes.rowText}>{mail.sent}</TableCell>
                                    <TableCell align="center">
                                        <IconButton><DeleteIcon fontSize={"default"} color={"primary"}/></IconButton></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>


            </Paper>
        </>
    );
}

export default MailList;