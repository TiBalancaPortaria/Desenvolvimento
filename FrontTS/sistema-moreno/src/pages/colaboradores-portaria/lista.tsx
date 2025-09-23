import type { Entrada } from "@/@types/types-entrada";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ListaDeEntradasProps {
  entradas: Entrada[];
  filtro?: string;
  onAtualizar?: () => void;
}

export default function ListaDeEntradas({ entradas}: ListaDeEntradasProps) {
  
  return (
    <div className="p-6">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-400 dark:bg-gray-600">
            <TableHead>Crachá</TableHead>
            <TableHead>Colaborador</TableHead>
            <TableHead>Data</TableHead>
            <TableHead>Hora</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Motivo</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {entradas.map((entrada, index) => (
            <TableRow key={`${entrada.id}- ${index}`}>
              <TableCell>{entrada.rh_func_chapa}</TableCell>
              <TableCell>{entrada.colaborador ?? "Desconhecido"}</TableCell>

              <TableCell>
                {entrada.horario_registrado
                  ? new Date(entrada.horario_registrado).toLocaleDateString()
                  : "—"}
              </TableCell>
              <TableCell>
                {entrada.horario_registrado
                  ? new Date(entrada.horario_registrado).toLocaleTimeString()
                  : "—"}
              </TableCell>
              <TableCell>{entrada.tipo ?? "-"}</TableCell>
              <TableCell>{entrada.motivo ?? "-"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
