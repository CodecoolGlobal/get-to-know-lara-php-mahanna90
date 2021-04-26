import React, {useContext, useState} from "react";
import axios from 'axios';
import Spinner from "react-spinner-material";
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
import {BASE_URL} from "../Constants";
import {UserContext} from '../contexts/UserContext';
// import cookie from 'react-cookie';
// import {withCookies} from 'react-cookie';
// import { Cookies } from 'react-cookie';
// import Cookies from 'js-cookie';
import cookie from 'react-cookies';



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

    const load = {position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)"};

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [loggedIn, setLoggedIn] = useContext(UserContext);


    const submit = (e) => {
        setLoading(true);
        e.preventDefault();
        // axios.get(`${BASE_URL}/get-to-know-lara-php-mahanna90/get-to-know-lara-backend/lara/sanctum/csrf-cookie`, {
        //     withCredentials: true,
        //     mode: "cors",
        // })
        //     .then((response) => {
        //         console.log("sanctum csrf response");
        //         console.log(response);
        //         cookie.save(response);
        //
        //     });
        console.log("email");
        console.log(email);
        console.log("password");
        console.log(password);
        axios.post(`${BASE_URL}/get-to-know-lara-php-mahanna90/get-to-know-lara-backend/lara/api/login`, {
            withCredentials: true,
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Accepted": "application/json",
            },
            email,
            password,
        })
            .then((response) => {
                console.log("login response");
                console.log(response);
                setLoading(false);
                sessionStorage.setItem("user", JSON.stringify(response.data.user));
                sessionStorage.setItem("token", response.data.token);
                setLoggedIn(!loggedIn);
                console.log(loggedIn);
                window.location.href = '/mails';
            })
            .catch(function (error) {
                alert("Invalid credentials");
            });

    };

    // if (loading)
    //     return (
    //         <div style={load}>
    //             <Spinner
    //                 size={120}
    //                 spinnerColor={"#333"}
    //                 spinnerWidth={2}
    //                 visible={true}
    //                 color={'black'}/>
    //         </div>
    //     );


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
                <Alert severity="warning" className={classes.alert}>
                    <AlertTitle>Warning</AlertTitle>
                    <strong>Please sign in to check your mails!</strong>
                </Alert>
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
                        onChange={(e) => setEmail(e.target.value)}
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
                        onChange={(e) => setPassword(e.target.value)}
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

