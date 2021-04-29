import React, {useState, useContext, useEffect, useRef} from 'react';
import clsx from 'clsx';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import MailList from "./MailList";
import SentList from "./SentList";
import Login from "./Login";
import Button from "@material-ui/core/Button";
import {Route, Redirect, Switch} from 'react-router-dom';
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import Link from "@material-ui/core/Link";
import axios from "axios";
import {BASE_URL, MESSAGES} from "../Constants";
import {MessageContext} from "../contexts/MessageContext";
import { useHistory } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";
import SendIcon from "@material-ui/icons/Send";
import CreateIcon from '@material-ui/icons/Create';
import ComposeMail from "./ComposeMail";
import EmailDetails from "./EmailDetails";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    toolbarButtons: {
        display: 'flex',
        alignItems: 'center',
        position: 'absolute',
        right: '20px',
        justifyContent: 'right',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        marginTop: '50px',
    },
    link: {
        textDecoration: "none",
    }
}));

function Home() {
    const classes = useStyles();
    const history = useHistory();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useContext(MessageContext);


    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        if (message !== MESSAGES.DEFAULT_MSG && message !== MESSAGES.LOGIN_ERROR_MSG && MESSAGES.LOGIN_SUCCESS_MSG) {
            setLoading(false);
            history.push("/");
        }
    }, [message])

    function logOut(e) {
        setLoading(true);
        e.preventDefault();
        const token = sessionStorage.getItem('token');
        axios.post(`${BASE_URL}/get-to-know-lara-php-mahanna90/get-to-know-lara-backend/lara/public/api/logout`, {},{
            withCredentials: true,
            mode: "cors",
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
            .then((response) => {
                console.log("successfully logged out")
                sessionStorage.clear();
                setMessage(MESSAGES.LOGIN_WARNING_MSG);

            })
            .catch(function (error) {
                console.log("failed to log out")
                alert("Logout error");
            });
    }

    const goToMails = (e) => {
        if (sessionStorage.getItem('token')) {
            history.push("/mails")
        } else {
            history.push("/login")
        }
    }

    const goToSent = (e) => {
        if (sessionStorage.getItem('token')) {
            history.push("/mails/sent")
        } else {
            history.push("/login")
        }
    }

    const goToCompose = (e) => {
        if (sessionStorage.getItem('token')) {
            history.push("/mails/compose")
        } else {
            history.push("/login")
        }
    }

    return (
        <div className={classes.root}>
            <CssBaseline/>
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, {
                            [classes.hide]: open,
                        })}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        Dashboard
                    </Typography>
                    <Toolbar className={classes.toolbarButtons}>
                        <div key={message}>
                        {sessionStorage.getItem('token') && message === MESSAGES.LOGIN_SUCCESS_MSG ?
                            <>
                                <Button color="inherit">Profile</Button>
                                <Button onClick={logOut} color="inherit">Logout</Button>
                            </>
                            :
                            <>
                                <Button onClick={(e) => history.push("/login")} color="inherit">Login</Button>
                                <Button onClick={(e) => history.push("/register")} color="inherit">Register</Button>
                            </>
                        }
                        </div>
                    </Toolbar>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                }}
            >
                <div className={classes.toolbar}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
                    </IconButton>
                </div>
                <Divider/>
                <List>
                    <ListItem button key={"Inbox"} onClick={goToMails}>
                        <ListItemIcon><MailIcon /></ListItemIcon>
                        <ListItemText primary={"Inbox"}/>
                    </ListItem>
                    <ListItem button key={"Compose"} onClick={goToCompose}>
                        <ListItemIcon><CreateIcon /></ListItemIcon>
                        <ListItemText primary={"Compose"}/>
                    </ListItem>
                    <ListItem button key={"Sent"} onClick={goToSent}>
                        <ListItemIcon><SendIcon /></ListItemIcon>
                        <ListItemText primary={"Sent"}/>
                    </ListItem>
                </List>
                <Divider/>
                <List>
                    <ListItem button key={"Trash"}>
                        <ListItemIcon><DeleteIcon/></ListItemIcon>
                        <ListItemText primary={"Trash"}/>
                    </ListItem>
                </List>
            </Drawer>
            <main className={classes.content}>
                <Switch>
                    <Route exact path="/">
                        { !sessionStorage.getItem('token') ?  <Redirect to="/login"/> : <Redirect to="/mails" /> }
                    </Route>
                    <Route exact path="/register" component={Register}/>
                    <Route exact path="/login" component={Login}/>
                    <ProtectedRoute exact path="/mails" component={MailList}/>
                    <ProtectedRoute exact path="/mails/sent" component={SentList}/>
                    <ProtectedRoute exact path="/mails/compose" component={ComposeMail}/>
                    {/*<ProtectedRoute exact path="/mails/view/{id}" component={ComposeMail}/>*/}
                    <ProtectedRoute exact path="/mails/view/:id" component={EmailDetails} />
                </Switch>
            </main>
        </div>
    );
}

export default Home;
