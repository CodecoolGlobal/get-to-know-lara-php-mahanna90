import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {useHistory} from "react-router-dom";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import SendIcon from "@material-ui/icons/Send";
import axios from "axios";
import {BASE_URL, MESSAGES} from "../Constants";


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
        display: 'flex',
        flexFlow: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    submit: {
        margin: "24px auto",
    },
}));

function ComposeMail() {
    const classes = useStyles();
    const history = useHistory();

    const [loading, setLoading] = useState(false);
    const [subject, setSubject] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('user')));


    const sendEmail = (e) => {
        setLoading(true);
        e.preventDefault();
        if (sessionStorage.getItem('token')) {
            axios.post(`${BASE_URL}/get-to-know-lara-php-mahanna90/get-to-know-lara-backend/lara/public/api/mails/compose`, {
                subject,
                email,
                message,
                id_user_from: user.id
            }, {
                withCredentials: true,
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "Accepted": "application/json",
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                },
            })
                .then((response) => {
                    console.log("response after email sending");
                    console.log(response);
                    setLoading(false);
                    history.push("/mails/sent");
                })
                .catch(function (error) {
                    console.log("Error when sending mail: " + error.message);
                    alert("Email sending error: " + error);
                });
        } else {
            console.log("no session token yet");
        }
    }

    return (

        <Container component="main" maxWidth="md">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" color={"primary"} variant="h5">
                    New email
                </Typography>
                <form className={classes.form} noValidate onSubmit={sendEmail}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="subject"
                                name="subject"
                                variant="outlined"
                                required
                                fullWidth
                                id="subject"
                                label="Subject"
                                autoFocus
                                onChange={(e) => setSubject(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                type={email}
                                id="email"
                                label="Send to (email)"
                                name="email"
                                autoComplete="email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                multiline={true}
                                rows={15}
                                fullWidth
                                id="message"
                                label="Message"
                                name="message"
                                autoComplete="message"
                                onChange={(e) => setMessage(e.target.value)}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        size={"large"}
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        endIcon={<SendIcon/>}
                    >
                        Send
                    </Button>
                </form>
            </div>
        </Container>

    )
}

export default ComposeMail;

