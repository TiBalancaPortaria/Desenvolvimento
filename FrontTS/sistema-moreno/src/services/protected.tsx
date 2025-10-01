import { ReactNode } from "react";
import { useUser } from "@/context/UserContext";

interface ProtectedProps {
  permission: string;
  children: ReactNode;
}

export const Protected = ({ permission, children }: ProtectedProps) => {
  const { groups, loading } = useUser();

  if (loading) return null; // ou um loader
  if (!groups.includes(permission.toUpperCase())) return null;

  return <>{children}</>;
};
