import React, {useContext, useEffect, useState} from "react";
import { Route, Redirect } from "react-router-dom";
import axios from "axios";
import {BASE_URL} from "../Constants";
import {UserContext} from '../contexts/UserContext';

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const [tokenInfo, setTokenInfo] = useState({});
    const [loading, setLoading] = useState(false);
    const [loggedIn, setLoggedIn] = useContext(UserContext);

    // useEffect(() => {
    //     setLoading(true);
    //     axios.get(`${BASE_URL}/validate-jwt-token`).then((res) => {
    //         setTokenInfo(res.data);
    //         setLoading(false);
    //     });
    // }, [loggedIn]);

    if (!loading) {
        return (
            <Route
                {...rest}
                render={(props) => {
                    // if (!tokenInfo.isAuthenticated) {
                    if (!loggedIn) {
                        console.log("not logged in checked");
                        return <Redirect to={{ pathname: "/login" }} />;
                    } else {
                        // return <Redirect to={{ pathname: "/mails" }} />;
                        console.log("else block in protected");
                        return <Component {...props} />;
                    }
                    // if (!roles.includes(tokenInfo.role.authority)) {
                    //     if (tokenInfo.role.authority === "vendor") return <Redirect to={{ pathname: "/relocation" }} />;
                    //     else return <Redirect to={{ pathname: "/mails" }} />;
                    // }

                    // return <Component {...props} />;
                }}
            />
        );
    }
    else return "";
};

// <ProtectedRoute loggedIn={!loggedIn} path="/upload" component={UploadData} roles={["admin", "flotta"]} />
export default ProtectedRoute;