export type User = {
    name: string;
    email: string;
}

export type SignInRequest ={
    email: string
    password: string
}

export type ApiSigIn ={
    user: User;
    refresh: string
    access: string
}

