import React, {useContext, useEffect, useState} from "react";
import axios from 'axios';
import {makeStyles} from "@material-ui/core/styles";
import {
    Avatar,
    Checkbox,
    Container,
    CssBaseline,
    FormControlLabel,
    Grid,
    Link,
    Paper,
    TextField
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {Alert, AlertTitle} from "@material-ui/lab";
import {BASE_URL, MESSAGES} from "../Constants";
import {MessageContext} from "../contexts/MessageContext";
import {useHistory} from "react-router-dom";


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
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    alert: {
        marginTop: '10px',
        marginBottom: '10px',
        width: '100%',
    }
}));

function Login() {
    const classes = useStyles();
    const history = useHistory();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [inputError, setInputError] = useState(false);
    const [message, setMessage] = useContext(MessageContext);

    useEffect(() => {
        if (message === MESSAGES.LOGIN_SUCCESS_MSG) {
            setLoading(false);
            history.push("/mails");
        }
    }, [message])


    const submit = (e) => {
        setLoading(true);
        e.preventDefault();
        axios.post(`${BASE_URL}/get-to-know-lara-php-mahanna90/get-to-know-lara-backend/lara/public/api/login`, {
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
                sessionStorage.setItem("user", JSON.stringify(response.data.user));
                sessionStorage.setItem("token", response.data.token);
                setInputError(false);
                setMessage(MESSAGES.LOGIN_SUCCESS_MSG);

            })
            .catch(error => {
                console.log(error);
                setMessage(MESSAGES.LOGIN_ERROR_MSG);
                setInputError(true);
                // alert("Invalid credentials: " + error);
            });
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                {message === MESSAGES.DEFAULT_MSG ||  message === MESSAGES.LOGIN_WARNING_MSG ?
                    <Alert severity="warning" className={classes.alert}>
                        <AlertTitle>Warning</AlertTitle>
                        <strong>{MESSAGES.LOGIN_WARNING_MSG}</strong>
                    </Alert>
                    : message === MESSAGES.LOGIN_ERROR_MSG ?
                        <Alert severity="error" className={classes.alert}>
                            <AlertTitle>Error</AlertTitle>
                            <strong>{MESSAGES.LOGIN_ERROR_MSG}</strong>
                        </Alert>
                        : message === MESSAGES.REG_SUCCESS_MSG ?
                            <Alert severity="success" className={classes.alert}>
                                <AlertTitle>Success</AlertTitle>
                                <strong>{MESSAGES.REG_SUCCESS_MSG}</strong>
                            </Alert>
                            :
                            <Alert severity="warning" className={classes.alert}>
                                <AlertTitle>Warning</AlertTitle>
                                <strong>{MESSAGES.LOGIN_WARNING_MSG}</strong>
                            </Alert>
                }
                <form className={classes.form} onSubmit={submit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        error={inputError === true}
                        helperText={inputError === true ? 'Incorrect entry' : ' '}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setInputError(false);
                        }}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
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
                    {/*<FormControlLabel*/}
                    {/*    control={<Checkbox value="remember" color="primary" />}*/}
                    {/*    label="Remember me"*/}
                    {/*/>*/}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href={"/register"} variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>

            </div>
        </Container>

    )
}

export default Login;

