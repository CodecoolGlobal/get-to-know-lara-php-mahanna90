import React, {useState} from "react";
import axios from 'axios';
import Spinner from "react-spinner-material";

function Login() {
    const load = { position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" };

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const submit = (e) => {
        setLoading(true);
        e.preventDefault();
        axios.post('/api/login', {
                headers: {
                    "Content-Type": "application/json",
                    "Accepted": "application/json",
                },
                email,
                password,
            })
            .then((response) => {
                setLoading(false);
                sessionStorage.setItem("user", JSON.stringify(response.data.user));
                sessionStorage.setItem("token", response.data.token);
                window.location.href = '/';
            })
            .catch(function (error) {
                alert("Invalid credentials");
            });
    };

    if (loading)
        return (
            <div style={load}>
                <Spinner
                    size={120}
                    spinnerColor={"#333"}
                    spinnerWidth={2}
                    visible={true}
                    color={'black'}/>
            </div>
        );


    return (
        <>

        </>
    )
}

export default Login;

