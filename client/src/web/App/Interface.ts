export interface displayProps {
    changeDisplay: (val: string) => void
}

export interface UserProperties {
    Username: string,
    Email: string,
    Password: string,
}

export interface LoginProps extends React.HTMLAttributes<HTMLFormElement> {
    userInfo: UserProperties[]
}

export interface RegisterProps extends React.HTMLAttributes<HTMLFormElement> {
    userInfo: UserProperties[]
}