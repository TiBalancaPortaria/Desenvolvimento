import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import api from "@/axios/api";

interface UserContextType {
  groups: string[];
  loading: boolean;
}

const UserContext = createContext<UserContextType>({ groups: [], loading: true });

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [groups, setGroups] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  api.get("/user/me/")
    .then(res => {
      // normalize para maiúsculas sem espaços extras
      setGroups(res.data.groups.map((g: string) => g.trim().toUpperCase()));
      setLoading(false);
    })
    .catch(err => {
      console.error("Erro ao buscar usuário:", err);
      setGroups([]);
      setLoading(false);
    });
}, []);



  return (
    <UserContext.Provider value={{ groups, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
