import React, { useState, createContext} from 'react';


export const UserContext = createContext();


export const UserProvider = (props) => {

    const [loggedIn, setLoggedIn] = useState(false);

    return(
        <UserContext.Provider value={[loggedIn, setLoggedIn]}>
            {props.children}
        </UserContext.Provider>
    );
}