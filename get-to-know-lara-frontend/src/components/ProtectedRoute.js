import React, {useContext, useEffect, useState} from "react";
import { Route, Redirect } from "react-router-dom";
import axios from "axios";
import {BASE_URL, MESSAGES} from "../Constants";
import {MessageContext} from '../contexts/MessageContext';
import {useHistory} from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const history = useHistory();
    const [tokenInfo, setTokenInfo] = useState({});
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useContext(MessageContext);

    useEffect(() => {
        setLoading(true);
        axios.get(`${BASE_URL}/get-to-know-lara-php-mahanna90/get-to-know-lara-backend/lara/public/api/validate-token`, {
            withCredentials: true,
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Accepted": "application/json",
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            },
        })
            .then((res) => {
                console.log("successfully ran token validation axios fetch")
                setTokenInfo(res.data);
                setLoading(false);

        })
            .catch(function (error) {
                console.log("running and failing token validation axios fetch")
                alert("Token validation error: " + error);
                setMessage(MESSAGES.LOGIN_ERROR_MSG);
                sessionStorage.clear();
                history.push("/login");
            });
    }, []);

    if (!loading) {
        return (
            <Route
                {...rest}
                render={(props) => {
                    // if (!tokenInfo.isAuthenticated) {
                    if (tokenInfo) {
                        if (sessionStorage.getItem('token') && tokenInfo.isAuthenticated) {
                            // return <Redirect to={{ pathname: "/mails" }} />;
                            console.log("token authenticated");
                            return <Component {...props} />;
                        } else {
                            console.log("token not authenticated");
                            return <Redirect to={{ pathname: "/login" }} />;
                        }
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