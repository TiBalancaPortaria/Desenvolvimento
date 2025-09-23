import { Dialog } from "@/components/ui/dialog";
import CadastroEntrada from "./cadastra";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface NavProps {
  onEntradaCadastrada: () => void;
  filtro: string;
  setFiltro: (filtro: string) => void;
}

export default function Nav({ onEntradaCadastrada, filtro, setFiltro }: NavProps) {
  const handleVoltar = () => {
    window.history.back();
  };

  return (
    <nav className="bg-gray-400 dark:bg-slate-700 p-4 flex relative justify-center items-center h-16">
      {/* Botão de cadastro */}
      <div className="absolute left-5">
        <Dialog>
          <CadastroEntrada onEntradaCadastrada={onEntradaCadastrada} />
        </Dialog>
      </div>

      {/* Campo de pesquisa */}
      <div className="flex-1 flex justify-center">
        <Input
          placeholder="Pesquisar entradas..."
          className="w-96"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
        />
      </div>

      {/* Botão de voltar */}
      <div className="absolute right-5">
        <Button
          className="bg-white text-dark dark:bg-black dark:text-white"
          onClick={handleVoltar}
        >
          Voltar
        </Button>
      </div>
    </nav>
  );
}
