import React, { useState, createContext} from 'react';
import {MESSAGES} from "../Constants";


export const MessageContext = createContext();


export const MessageProvider = (props) => {

    const [message, setMessage] = useState(MESSAGES.DEFAULT_MSG);

    return(
        <MessageContext.Provider value={[message, setMessage]}>
            {props.children}
        </MessageContext.Provider>
    );
}