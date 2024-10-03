export interface AuthContextProps {
    currentUser: User | null;
    setCurrentUser: Dispatch<React.SetStateAction<Maybe<User>>>;
    setIsLoggedIn: Dispatch<SetStateAction<boolean>>
    isLoggedIn: boolean
    isLoading: boolean
}

export interface ChildrenType {
    children?: ReactNode;
    setToggle?: Dispatch<SetStateAction<boolean>>
}