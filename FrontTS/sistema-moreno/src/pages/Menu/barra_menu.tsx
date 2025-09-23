import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";



export default function Barra_Menu() {
  const navigate = useNavigate();

  // Função para navegar para a página Cartão Portaria
  // Isso será chamado quando o usuário clicar no item do menu
  // const handleCartaoPortariaClick = () => {

  //   navigate('/Portaria/CartaoPortaria');

  //   //!!!!!!!!ATIVAR ASSIM QUE ESTIVER TUDO PRONTO!!!!!!!!

  //   // const token  = localStorage.getItem('token');
  //   // if (token){
  //   //   navigate('/CartaoPortaria');
  //   // } else {
  //   //   alert('Você precisa estar logado para acessar esta página.');
  //   // }
  // }

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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className=" h-14 cursor-pointer hover:bg-red-500 text-3xl font-bold">Portaria</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel className="text-2xl">Portaria</DropdownMenuLabel>
            <DropdownMenuGroup>
              {/* <DropdownMenuItem className="Drop-Item" onClick={handleCartaoPortariaClick}>
                Cartão Portaria
              </DropdownMenuItem> */}

              <DropdownMenuItem className="Drop-Item" onClick={handlePortariaColaboradoresClick}>
                Colaboradores Moreno
              </DropdownMenuItem>

            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="w-80 h-14 cursor-pointer hover:bg-red-500 text-3xl font-bold">RH</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel className="text-2xl">RH</DropdownMenuLabel>
            <DropdownMenuGroup>
              <DropdownMenuItem className="Drop-Item" onClick={handleCadColaboradoresClick}>
                Cadastro de Colaboradores
              </DropdownMenuItem>
              <DropdownMenuItem className="Drop-Item" onClick={() => navigate('/rh/ConsultaEntradas')}>
                Consulta de Entradas
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>

      
    </div>
  )
}
