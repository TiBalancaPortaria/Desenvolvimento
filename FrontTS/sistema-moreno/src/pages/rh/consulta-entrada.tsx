import { useEffect, useState, useCallback } from "react";
import api from "@/axios/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { parseISO, format } from "date-fns";
import { ModeToggle } from "@/components/mode-toggle";
import * as XLSX from "xlsx";
import type { Entrada } from "@/@types/types-entrada";

interface ListaDeEntradasProps {
  entradas: Entrada[];
}

export default function ConsultaEntradas({ entradas: entradasProp }: ListaDeEntradasProps) {
  const [entradas, setEntradas] = useState<Entrada[]>(entradasProp || []);
  const [buscaNome, setBuscaNome] = useState("");
  const [dataFiltro, setDataFiltro] = useState("");
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [temMais, setTemMais] = useState(true);
  const [carregando, setCarregando] = useState(false);

  // Função para buscar entradas com filtros e paginação
  const fetchEntradas = useCallback(async (pagina = 1, reset = false) => {
    try {
      setCarregando(true);

      const params: any = { page: pagina, page_size: 15 };

      // Enviar nome como query param
      if (buscaNome.trim()) params.nome = buscaNome.trim();

      // Enviar data como query param
      if (dataFiltro) params.data = dataFiltro;

      const response = await api.get("/api/portariaColaborador/", { params });
      const dados = response.data.results;

      if (reset) setEntradas(dados);
      else setEntradas((prev) => [...prev, ...dados]);

      setTemMais(Boolean(response.data.next));
      setPaginaAtual(pagina);
    } catch (error) {
      console.error("Erro ao buscar entradas:", error);
    } finally {
      setCarregando(false);
    }
  }, [buscaNome, dataFiltro]);

  // Debounce para atualizar tabela ao digitar nome ou escolher data
  useEffect(() => {
    const delay = setTimeout(() => {
      fetchEntradas(1, true);
    }, 500);

    return () => clearTimeout(delay);
  }, [fetchEntradas]);

  const loadMore = () => {
    if (temMais && !carregando) fetchEntradas(paginaAtual + 1);
  };

  const handleVoltar = () => window.history.back();

  const exportarExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      entradas.map((e) => ({
        Crachá: e.rh_func_chapa,
        Nome: e.colaborador ?? "Desconhecido",
        Motivo: e.motivo,
        Tipo: e.tipo,
        Data: e.horario_registrado ? format(parseISO(e.horario_registrado), "dd/MM/yyyy") : "—",
        Hora: e.horario_registrado ? format(parseISO(e.horario_registrado), "HH:mm") : "—",
        "Data Registro": e.data_registro ? format(parseISO(e.data_registro), "dd/MM/yyyy HH:mm") : "—",
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Entradas");
    XLSX.writeFile(workbook, "entradas.xlsx");
  };

  return (
    <div className="bg-slate-300 dark:bg-gray-800">
      <nav className="flex justify-center items-center p-4 bg-gray-200 dark:bg-gray-700 relative">
        <h1 className="text-4xl font-bold mb-4 text-red-500">Consulta de Entradas</h1>
        <div className="absolute left-5">
          <ModeToggle />
        </div>
        <div className="absolute right-5">
          <Button variant="outline" onClick={handleVoltar}>Voltar</Button>
        </div>
      </nav>

      <div className="flex flex-col md:flex-row justify-center items-center gap-4 p-4">
        <div className="flex gap-4 flex-wrap">
          <Input
            type="text"
            placeholder="Buscar por nome..."
            value={buscaNome}
            onChange={(e) => setBuscaNome(e.target.value)}
            className="border px-3 py-2 w-96 rounded text-black dark:text-white dark:bg-gray-950"
          />
          <Input
            type="date"
            value={dataFiltro}
            onChange={(e) => setDataFiltro(e.target.value)}
            className="border px-3 py-2 rounded text-black dark:text-white dark:bg-gray-950 w-80"
          />
          <Button onClick={() => fetchEntradas(1, true)}>Atualizar</Button>
        </div>
        <Button onClick={exportarExcel}>Exportar para Excel</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="bg-gray-400 dark:bg-gray-600">
            <TableHead>Crachá</TableHead>
            <TableHead>Colaborador</TableHead>
            <TableHead>Data</TableHead>
            <TableHead>Hora</TableHead>
            <TableHead>Data do Registro</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Motivo</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {entradas.map((entrada) => (
            <TableRow key={entrada.id}>
              <TableCell>{entrada.rh_func_chapa}</TableCell>
              <TableCell>{entrada.colaborador ?? "Desconhecido"}</TableCell>
              <TableCell>{entrada.horario_registrado ? format(parseISO(entrada.horario_registrado), "dd/MM/yyyy") : "—"}</TableCell>
              <TableCell>{entrada.horario_registrado ? format(parseISO(entrada.horario_registrado), "HH:mm") : "—"}</TableCell>
              <TableCell>{entrada.data_registro ? format(parseISO(entrada.data_registro), "dd/MM/yyyy HH:mm") : "—"}</TableCell>
              <TableCell>{entrada.tipo}</TableCell>
              <TableCell>{entrada.motivo}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {temMais && (
        <div className="flex justify-center mt-4">
          <Button onClick={loadMore} className="bg-blue-500 text-white px-4 py-2 rounded">
            {carregando ? "Carregando..." : "Carregar mais"}
          </Button>
        </div>
      )}
    </div>
  );
}
