import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {useHistory} from "react-router-dom";
import {Paper} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import {BASE_URL} from "../Constants";


const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        justifyContent: 'center',
    },
    paper: {
        margin: '30px',
        padding: '40px',
        display: 'flex',
        flexDirection: 'column',
        // maxWidth: '80%',
        width: '70%',
    },
    subject: {
        marginBottom: '20px'
    },
    message: {
        marginTop: '20px',
        marginBottom: '20px'
    },
    from: {

    },
    to: {

    },
    sent: {

    },
}));

function EmailDetails() {
    const classes = useStyles();
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState({});

    const getEmailId = () => {
        const url = window.location.href;
        const urlArr = url.split("/");
        const emailId = urlArr[urlArr.length-1];
        console.log("emailId is: " + emailId);
        return parseInt(emailId);
    }

    useEffect(() => {
        setLoading(true);
        const emailId = getEmailId();
        if (sessionStorage.getItem('token')) {
            axios.get(`${BASE_URL}/get-to-know-lara-php-mahanna90/get-to-know-lara-backend/lara/public/api/mails/view/${emailId}`, {
                withCredentials: true,
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "Accepted": "application/json",
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                },
            })
                .then((res) => {
                    console.log(res);
                    setEmail(prevMails => res.data)
                    setLoading(false);
                })
                .catch(function (error) {
                    alert("Error: Cannot fetch this email! " + error.message);
                });
        } else {
            console.log("no session token yet");
        }
    }, []);

    return (

        <div className={classes.container}>
            <Paper className={classes.paper}>
                <Typography color={"primary"} variant="h4" className={classes.subject}>{email.subject}</Typography>
                <Typography color={"secondary"} variant="subtitle1" className={classes.from}>From: {email.sender ? email.sender.name : ""} - {email.sender ? email.sender.email : ""}</Typography>
                <Typography color={"secondary"} variant="subtitle1" className={classes.to}>To: {email.target ? email.target.name : ""} - {email.target ? email.target.email : ""}</Typography>
                <Typography color={"secondary"} variant="subtitle1" className={classes.sent}>Sent: {email.sent}</Typography>
                <Typography color={"primary"} variant="h6" className={classes.message}>{email.message}</Typography>

            </Paper>
        </div>

    )
}

export default EmailDetails;

