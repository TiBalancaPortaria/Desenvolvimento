
import type { SignInRequest, ApiSigIn } from "@/@types/auth";
import api from "@/axios/api";

export const signInRequest = async (data: SignInRequest): Promise<ApiSigIn> => {
  console.log("Enviando dados para login:", data); // <- resposta no console (temporario)

  const response = await api.post("/user/signin/", data);

  console.log("Resposta da API:", response.data); // <- resposta no console 

  return {
    user: {
      name: response.data.name,
      email: response.data.email,
    },
    access: response.data.access,
    refresh: response.data.refresh,
  };
};
