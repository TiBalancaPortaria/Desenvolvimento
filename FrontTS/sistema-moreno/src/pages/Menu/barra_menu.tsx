import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useUser } from "@/context/UserContext";
import { Protected } from "@/services/protected";
import { useNavigate } from "react-router-dom";



export default function Barra_Menu() {
  const navigate = useNavigate();
  const { groups, loading } = useUser(); // opcional se quiser usar direto

  const handleCadColaboradoresClick = () => {
    navigate('/rh/CadColaboradores');
  }

  const handlePortariaColaboradoresClick = () => {
    const token = localStorage.getItem("access_token");
    if (token) {
      navigate("/Portaria/Colaboradores");
    } else {
      navigate("/", { state: { message: "Você precisa estar logado." } });
    }
  };

  return (
    <div>
      <nav className="flex flex-col gap-4">
        {/* Portaria - só usuários com grupo 'Portaria' */}
        <Protected permission="Portaria">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="h-14 cursor-pointer hover:bg-red-500 text-3xl font-bold">
                Portaria
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel className="text-2xl">Portaria</DropdownMenuLabel>
              <DropdownMenuGroup>
                {/* <DropdownMenuItem onClick={handleCartaoPortariaClick}>
                  Cartão Portaria
                </DropdownMenuItem> */}
                <DropdownMenuItem onClick={handlePortariaColaboradoresClick}>
                  Colaboradores Moreno
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </Protected>

        {/* RH - só usuários com grupo 'RH' */}
        <Protected permission="RH">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="w-80 h-14 cursor-pointer hover:bg-red-500 text-3xl font-bold">RH</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel className="text-2xl">RH</DropdownMenuLabel>
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={handleCadColaboradoresClick}>
                  Cadastro de Colaboradores
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/rh/ConsultaEntradas')}>
                  Consulta de Entradas
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </Protected>

        {/* Admin - só usuários com grupo 'Admin' */}
        <Protected permission="ADMINISTRADOR">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="w-80 h-14 cursor-pointer hover:bg-red-500 text-3xl font-bold">Admin</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel className="text-2xl">Admin</DropdownMenuLabel>
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => navigate('/admin/cadusuarios')}>
                  Cadastro de Usuários
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </Protected>
      </nav>
    </div>
  );
}

