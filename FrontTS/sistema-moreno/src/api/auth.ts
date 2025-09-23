import type { ApiSigIn, SignInRequest } from "@/@types/auth";
import api from "@/axios/api";

export const signIn = async (data: SignInRequest): Promise<ApiSigIn> => {
    const response = await api.post('/user/signin/', data);
    return response.data
}