import { ModeToggle } from "@/components/mode-toggle";
import Nav from "./nav";
import ListaDeEntradas from "./lista";
import { useEffect, useState } from "react";
import api from "@/axios/api";
import type { Entrada } from "@/@types/types-entrada";

export const ColaboradoresPortaria = () => {
  const [entradas, setEntradas] = useState<Entrada[]>([]);
  const [filtro, setFiltro] = useState("");
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchEntradas = async (url = "/api/portariaColaborador/") => {
    try {
      setLoading(true);
      const response = await api.get(url);
      const data = response.data;

      // Adiciona novas entradas ao estado
      setEntradas((prev) => [...prev, ...data.results]);
      setNextPage(data.next); // atualiza próxima página
      console.log("nextPage", data.next, "entradas carregadas", data.results.length);
    } catch (error) {
      console.error("Erro ao buscar entradas:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Limpa e busca do início
    setEntradas([]);
    fetchEntradas();
  }, []);

  const handleLoadMore = () => {
    if (nextPage) fetchEntradas(nextPage);
  };

  return (
    <main className="bg-gray-300 dark:bg-slate-600 min-h-screen">
      <header className="relative flex items-center justify-center h-16 bg-gray-400 dark:bg-slate-800">
        <div className="absolute left-2"><ModeToggle /></div>
        <h1 className="text-3xl font-extrabold text-red-600">Entrada Colaboradores</h1>
      </header>

      <Nav
        filtro={filtro}
        setFiltro={setFiltro}
        onEntradaCadastrada={() => {
          setEntradas([]);
          fetchEntradas();
        }}
      />

      <ListaDeEntradas entradas={entradas} filtro={filtro} />

      {nextPage && (
        <div className="flex justify-center mt-4 p-3">
          <button
            onClick={handleLoadMore}
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            {loading ? "Carregando..." : "Carregar mais"}
          </button>
        </div>
      )}
    </main>
  );
};
