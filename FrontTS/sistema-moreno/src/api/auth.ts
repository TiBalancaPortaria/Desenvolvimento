import type { ApiSigIn, SignInRequest } from "@/@types/auth";
import type { UserCadastro } from "@/@types/types-cadastro";
import api from "@/axios/api";

export const signIn = async (data: SignInRequest): Promise<ApiSigIn> => {
    const response = await api.post('/user/signin/', data);
    return response.data
}

export const signUp = async (
   data: Omit<UserCadastro, "id">
): Promise<UserCadastro> => {
   const response = await api.post("/user/signup", data);
   return response.data.user
};
