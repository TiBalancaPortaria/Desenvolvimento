import { useEffect, useState } from "react";
import api from "@/axios/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

interface Funcionario {
  fun_chapa: string;
  fun_nome: string;
  fun_status: string;
}

export default function ListaColaboradores({ filter }: { filter: string }) {
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchFuncionarios = async (pageNumber: number = 1) => {
    try {
      setLoading(true);

      const response = await api.get("/api/rhfuncionarios/", {
        params: {
          nome: filter || undefined,
          page: pageNumber,
        },
      });

      const results = Array.isArray(response.data.results)
        ? response.data.results
        : [];

      setFuncionarios(prev =>
        pageNumber === 1 ? results : [...prev, ...results]
      );

      const totalCount = response.data.count || results.length;
      const pageSize = results.length || 50; // page_size definido no backend
      setTotalPages(Math.ceil(totalCount / pageSize));
    } catch (error) {
      console.error("Erro ao buscar Funcionarios:", error);
      setFuncionarios([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  // Recarrega sempre que o filtro mudar
  useEffect(() => {
    setPage(1);
    fetchFuncionarios(1);
  }, [filter]);

  // Carregar próxima página
  const loadMore = () => {
    const nextPage = page + 1;
    if (nextPage <= totalPages) {
      setPage(nextPage);
      fetchFuncionarios(nextPage);
    }
  };

  return (
    <div className="p-6">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-400 dark:bg-gray-600">
            <TableHead className="text-lg text-gray-600 dark:text-gray-300">
              Nome
            </TableHead>
            <TableHead className="text-lg text-gray-600 dark:text-gray-300">
              Crachá
            </TableHead>
            <TableHead className="text-lg text-gray-600 dark:text-gray-300">
              Status
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {funcionarios.map(funcionario => (
            <TableRow
              key={funcionario.fun_chapa}
              className="hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <TableCell className="text-gray-700 dark:text-gray-200">
                {funcionario.fun_nome}
              </TableCell>
              <TableCell className="text-gray-700 dark:text-gray-200">
                {funcionario.fun_chapa}
              </TableCell>
              <TableCell>{funcionario.fun_status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {loading && <p className="mt-2">Carregando...</p>}

      {page < totalPages && !loading && (
        <div className="flex justify-center mt-4">
          <Button onClick={loadMore}>Carregar mais</Button>
        </div>
      )}
    </div>
  );
}
