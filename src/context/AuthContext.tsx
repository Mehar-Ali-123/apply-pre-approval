// packages block
import React, { createContext, FC, useEffect, useState } from "react";
//others block
import { AuthContextProps, ChildrenType } from "../interfaceTypes";
import { getToken } from "../utils";
import { Loader } from "../components/common/Loader";

export const AuthContext = createContext<AuthContextProps>({
    currentUser: null,
    isLoggedIn: !!getToken(),
    isLoading: false,
    setIsLoggedIn: () => { },
    setCurrentUser: () => { }
});

export const AuthContextProvider: FC<ChildrenType> = ({ children }): JSX.Element => {
    const [loading, setLoading] = useState(false)
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!getToken());



    const hasToken = getToken();



    return (
        <AuthContext.Provider value={{ currentUser, isLoggedIn, isLoading: loading, setCurrentUser, setIsLoggedIn }}>
            {loading ? <Loader /> : children}
        </AuthContext.Provider>
    );
};
