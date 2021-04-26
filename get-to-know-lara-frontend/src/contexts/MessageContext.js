import React, { useState, createContext} from 'react';


export const MessageContext = createContext();


export const MessageProvider = (props) => {

    const [message, setMessage] = useState("");

    return(
        <MessageContext.Provider value={[message, setMessage]}>
            {props.children}
        </MessageContext.Provider>
    );
}