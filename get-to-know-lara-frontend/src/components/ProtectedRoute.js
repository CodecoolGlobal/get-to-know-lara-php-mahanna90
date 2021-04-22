import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import axios from "axios";

const ProtectedRoute = ({ component: Component, loggedIn, roles, ...rest }) => {
    const [tokenInfo, setTokenInfo] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        axios.get(`${basisUrl}/validate-jwt-token`).then((res) => {
            setTokenInfo(res.data);
            setLoading(false);
        });
    }, [loggedIn]);

    if (!loading) {
        return (
            <Route
                {...rest}
                render={(props) => {
                    if (!tokenInfo.isAuthenticated) {
                        return <Redirect to={{ pathname: "/login" }} />;
                    } else {
                        return <Redirect to={{ pathname: "/mails" }} />;
                    }
                    // if (!roles.includes(tokenInfo.role.authority)) {
                    //     if (tokenInfo.role.authority === "vendor") return <Redirect to={{ pathname: "/relocation" }} />;
                    //     else return <Redirect to={{ pathname: "/mails" }} />;
                    // }

                    return <Component {...props} />;
                }}
            />
        );
    } else return "";
};

// <ProtectedRoute loggedIn={!loggedIn} path="/upload" component={UploadData} roles={["admin", "flotta"]} />
export default ProtectedRoute;