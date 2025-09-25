
export type signUp = {
   username : string;
   name: string;
   email: string;
   password: string;
}


export type SignUpData = {
   username: string;
   nome: string;
   email: string;
   password: string;
};

export interface UserCadastro {
   id: number;
   username: string;
   nome: string;
   email: string;
   password?: string;
}