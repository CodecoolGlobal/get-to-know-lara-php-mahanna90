import React, {useContext, useEffect, useRef, useState} from 'react';
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {BASE_URL, MESSAGES} from "../Constants";
import {MessageContext} from "../contexts/MessageContext";
import { useHistory } from "react-router-dom";
import {Alert, AlertTitle} from "@material-ui/lab";


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
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    alert: {
        marginTop: '10px',
        marginBottom: '10px',
        width: '100%',
    },
}));

function Register() {
    const classes = useStyles();
    const history = useHistory();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [inputError, setInputError] = useState(false);
    const [message, setMessage] = useContext(MessageContext);

    useEffect(() => {
        if ( message === MESSAGES.REG_SUCCESS_MSG && !inputError) {
            setLoading(false);
            history.push("/login");
        }
    }, [message, inputError])

    const submit = (e) => {
        setLoading(true);
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match");
        } else {
            axios.post(`${BASE_URL}/get-to-know-lara-php-mahanna90/get-to-know-lara-backend/lara/public/api/register`, {
                name,
                email,
                password,
            }, {
                withCredentials: true,
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "Accepted": "application/json",
                },
            })
                .then((response) => {
                    console.log(response.data.message);
                    setInputError(false);
                    setMessage(MESSAGES.REG_SUCCESS_MSG);
                })
                .catch(function (error) {
                    console.log("Couldn't validate data on the backend: " + error)
                    setMessage(MESSAGES.REG_ERROR_MSG);
                    setInputError(true);
                    // alert("Invalid credentials: " + error);
                });
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                {message === MESSAGES.REG_ERROR_MSG ?
                <Alert severity="error" className={classes.alert}>
                    <AlertTitle>Error</AlertTitle>
                    <strong>{MESSAGES.REG_ERROR_MSG}</strong>
                </Alert> : "" }
                <form className={classes.form} onSubmit={submit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="name"
                                label="Name"
                                name="name"
                                type="text"
                                autoComplete="name"
                                error={inputError === true}
                                helperText={inputError === true ? 'Incorrect entry' : ' '}
                                onChange={(e) => {
                                    setName(e.target.value);
                                    setInputError(false);
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                type="email"
                                name="email"
                                autoComplete="email"
                                error={inputError === true}
                                helperText={inputError === true ? 'Incorrect entry' : ' '}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    setInputError(false);
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                error={inputError === true}
                                helperText={inputError === true ? 'Incorrect entry' : ' '}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setInputError(false);
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="confirm"
                                label="Confirm password"
                                type="password"
                                id="password"
                                error={inputError === true}
                                helperText={inputError === true ? 'Incorrect entry' : ' '}
                                onChange={(e) => {
                                    setConfirmPassword(e.target.value);
                                    setInputError(false);
                                }}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign Up
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href={"/login"} variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}

export default Register;