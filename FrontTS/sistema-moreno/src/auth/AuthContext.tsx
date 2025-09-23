import type { SignInRequest, User } from "@/@types/auth";
import { signInRequest } from "@/services/auth";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type AuthContextData = {
  user: User | null;
  isAuthenticated: boolean;
  signIn: (data: SignInRequest) => Promise<void>;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const isAuthenticated = !!user;

  useEffect(() => {
    // Carrega user do localStorage
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("access_token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
    }

    setLoading(false);
  }, []);

  const signIn = async (data: SignInRequest) => {
    const response = await signInRequest(data);

    setUser(response.user);

    localStorage.setItem("access_token", response.access);
    localStorage.setItem("refresh_token", response.refresh);
    localStorage.setItem("user", JSON.stringify(response.user));
    localStorage.setItem("lastLoginTime", Date.now().toString());
  };

  const signOut = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
