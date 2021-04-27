import React, {useEffect, useState} from 'react';
import axios from "axios";
import {BASE_URL, MESSAGES} from "../Constants";


function MailList() {
    const [mails, setMails] = useState([]);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('user')));

    useEffect(() => {
        setLoading(true);
        axios.get(`${BASE_URL}/get-to-know-lara-php-mahanna90/get-to-know-lara-backend/lara/public/api/mails/inbox`,  {
            withCredentials: true,
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Accepted": "application/json",
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            },
            params: {
                id: user.id,
            }
        })
            .then((res) => {
                console.log(res);
                setMails(prevMails => res.data)
                setLoading(false);
                console.log(mails);
            })
            .catch(function (error) {
                alert("Error: Cannot fetch emails!");
                // setMessage(MESSAGES.LOGIN_ERROR_MSG);
                // sessionStorage.clear();
            });

        return () => {
            console.log("unmounted mails/inbox useEffect")
        }
    }, []);


    return (
        <>
            {mails.map((mail, i) => (
                <h1 key={i}>{mail.subject}</h1>
            )) }
        </>
    );
}

export default MailList;