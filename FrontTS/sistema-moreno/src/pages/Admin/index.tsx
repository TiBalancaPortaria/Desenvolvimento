import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { memo, useEffect, useState } from "react";
import CadUser from "./CadUser";
import ListaDeCadastros from "./listaCad";
import type { UserCadastro } from "@/@types/types-cadastro";
import api from "@/axios/api";


const Admin = () => {
  const [usuarios, setUsuarios] = useState<UserCadastro[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Adiciona novo usuário à lista
  const handleAddUser = (user: UserCadastro) => {
    setUsuarios((prev) => [...prev, user]);
  };


 const fetchUsuarios = async () => {
  try {
    setLoading(true);
    const response = await api.get("/user/users");

    
    setUsuarios(Array.isArray(response.data.users) ? response.data.users : []);
  } catch (err) {
    console.error(err);
    setError("Erro ao carregar usuários.");
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    fetchUsuarios();
  }, []);

  const handleClickVoltar = () => {
    window.history.back(); // Volta para a página anterior
  };

  if (loading) return <p className="p-4">Carregando usuários...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <main>
      <nav className="bg-gray-400 dark:bg-slate-700 p-4 flex relative justify-center items-center h-16">
        <div className="absolute left-5">
          <ModeToggle />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-red-600 ">Usuários</h1>
        </div>
        <div className="absolute right-5">
          <Button
            onClick={handleClickVoltar}
            className="bg-white text-black hover:underline dark:bg-black dark:text-white hover:bg-gray-200"
          >
            Voltar
          </Button>
        </div>
      </nav>

      <div className="p-4">
        <Dialog>
          <CadUser onCadastroSucesso={handleAddUser} />
        </Dialog>
      </div>

      <div className="p-4">
        <ListaDeCadastros ListaCad={usuarios} />
      </div>
    </main>
  );
};

export default memo(Admin);
