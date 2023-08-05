
import React, { ReactNode, createContext, useState } from 'react'

type UserData = {
    Username: string, 
    Password: string, 
    Email: string
}

export type UserContextType = {
    currentUserData: UserData
    setCurrentUserData: React.Dispatch<React.SetStateAction<UserData>>
}

export const UserContext = createContext<UserContextType>({
    currentUserData: {
        Username: '',
        Password: '',
        Email: ''
    },
    setCurrentUserData: () => {}
});

type AuthenticationProviderProps = {
    children: React.ReactNode; // Correctly typed children prop
};

export default function AuthenticationProvider({ children } : AuthenticationProviderProps) {

    const [currentUserData, setCurrentUserData] = useState({Username: '', Password: '', Email: ''})

    return (
        <UserContext.Provider value={{currentUserData, setCurrentUserData}}>
            {children}
        </UserContext.Provider>
    )
}