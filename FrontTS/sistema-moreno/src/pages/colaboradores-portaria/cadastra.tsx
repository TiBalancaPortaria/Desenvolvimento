import { useEffect, useState, useRef } from "react";
import api from "@/axios/api";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { data } from "react-router-dom";

interface Funcionario {
  fun_chapa: string;
  fun_nome: string;
  fun_status?: string;
}

interface CadastroEntradaProps {
  onEntradaCadastrada: () => void;
}

export default function CadastroEntrada({ onEntradaCadastrada }: CadastroEntradaProps) {
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
  const [colaboradorSelecionado, setColaboradorSelecionado] = useState<Funcionario | null>(null);
  const [buscaColaborador, setBuscaColaborador] = useState("");
  const [tipo, setTipo] = useState("");
  const [horarioRegistrado, setHorarioRegistrado] = useState("");
  const [motivo, setMotivo] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const dropdownRef = useRef<HTMLUListElement>(null);

  // Fecha dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Buscar funcionários
  useEffect(() => {
  async function fetchFuncionarios() {
    if (buscaColaborador.trim().length < 1) {
      setFuncionarios([]);
      return;
    }
    try {
      const response = await api.get(`/api/rhfuncionarios/?nome=${buscaColaborador}`);
      console.log("response.data completa:", response.data);

      // A lista real está em response.data.results
      const dataArray = response.data.results || [];
      const ativos = dataArray.filter((f: Funcionario) => f.fun_status === "A");
      setFuncionarios(ativos);
    } catch (error) {
      console.error("Erro ao buscar funcionários:", error);
      setFuncionarios([]);
    }
  }
  fetchFuncionarios();
}, [buscaColaborador]);

  const handleSelectColaborador = (f: Funcionario) => {
    setColaboradorSelecionado(f);
    setBuscaColaborador(f.fun_nome);
    setShowDropdown(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!colaboradorSelecionado) return alert("Selecione um colaborador.");
    if (!tipo) return alert("Selecione um tipo de registro.");
    if (!horarioRegistrado) return alert("Informe o horário de registro.");

    try {
      await api.post("/api/portariaColaborador/", {
        rh_func_chapa: colaboradorSelecionado.fun_chapa,
        motivo,
        tipo,
        horario_registrado: new Date(horarioRegistrado).toISOString(),
      });

      alert("Registro salvo com sucesso!");
      setColaboradorSelecionado(null);
      setBuscaColaborador("");
      setMotivo("");
      setTipo("");
      setHorarioRegistrado("");
      onEntradaCadastrada();
    } catch (error: any) {
      console.error("Erro ao cadastrar:", error.response?.data || error);
      alert("Erro ao cadastrar entrada.");
    }
  };

  return (
    <>
      <DialogTrigger className="bg-blue-500 text-white px-4 py-2 rounded">
        Cadastrar Entrada
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cadastrar Entrada</DialogTitle>
          <DialogDescription>
            Preencha os campos abaixo para registrar a entrada ou saída de um colaborador.
          </DialogDescription>

          <form className="flex flex-col gap-4 mt-4" onSubmit={handleSubmit}>
            {/* Busca colaborador */}
            <label>Nome:</label>
            <div className="relative">
              <Input
                type="text"
                value={buscaColaborador}
                onChange={e => {
                  setBuscaColaborador(e.target.value);
                  setShowDropdown(true);
                  setColaboradorSelecionado(null);
                }}
                placeholder="Digite para buscar..."
                className="border px-3 py-2 rounded text-black dark:text-white dark:bg-gray-950"
              />
              {showDropdown && (
                <ul
                  ref={dropdownRef}
                  className="absolute z-10 bg-white dark:bg-gray-950 border w-full mt-1 max-h-40 overflow-auto rounded shadow"
                >
                  {funcionarios.length > 0 ? (
                    funcionarios.map(f => (
                      <li
                        key={f.fun_chapa}
                        className="px-3 py-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800"
                        onClick={() => handleSelectColaborador(f)}
                      >
                        {f.fun_nome} ({f.fun_chapa})
                      </li>
                    ))
                  ) : (
                    <li className="px-3 py-2 text-gray-500">Nenhum resultado</li>
                  )}
                </ul>
              )}
            </div>

            {/* Motivo */}
            <label>Motivo:</label>
            <Input
              type="text"
              value={motivo}
              onChange={e => setMotivo(e.target.value)}
              required
              className="border px-3 py-2 rounded text-black dark:text-white dark:bg-gray-950"
            />

            {/* Horário */}
            <label>Horário:</label>
            <Input
              type="datetime-local"
              value={horarioRegistrado}
              onChange={e => setHorarioRegistrado(e.target.value)}
              required
              className="border px-3 py-2 rounded text-black dark:text-white dark:bg-gray-950"
            />

            {/* Tipo */}
            <label>Tipo:</label>
            <select
              value={tipo}
              onChange={e => setTipo(e.target.value)}
              required
              className="border px-3 py-2 rounded text-black dark:text-white dark:bg-gray-950"
            >
              <option value="">Selecione um tipo</option>
              <option value="entrada">Entrada</option>
              <option value="saida">Saída</option>
            </select>

            <Button type="submit">Salvar</Button>
          </form>
        </DialogHeader>
      </DialogContent>
    </>
  );
}
