export type User = {
    name: string;
    email: string;
}

export type SignInRequest ={
    username: string
    password: string
}

export type ApiSigIn ={
    user: User;
    refresh: string
    access: string
}

