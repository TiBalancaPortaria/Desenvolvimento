
import type { UserCadastro } from '@/@types/types-cadastro';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { memo } from 'react';


interface ListaDeCadastrosProps {
   ListaCad: UserCadastro[]
}

const ListaDeCadastros = ({ ListaCad }: ListaDeCadastrosProps) => {
  return (
    <div>
      <Table>
         <TableHeader>
            <TableRow className="bg-gray-400 dark:bg-gray-600">
               <TableHead>Nome</TableHead>
               <TableHead>Username</TableHead>
               <TableHead>Email</TableHead>
               {/* <TableHead>Data de Cadastro</TableHead> */}
               <TableHead>Senha</TableHead>
            </TableRow>
         </TableHeader>
      <TableBody>
         {ListaCad?.map((user) => (
            <TableRow key={user.id}>
               <TableCell>{user.nome}</TableCell>
               <TableCell>{user.username}</TableCell>
               <TableCell>{user.email}</TableCell>
               {/* <TableCell>{user.date_joined}</TableCell> */}
               <TableCell>{user.password}</TableCell>
            </TableRow>
         ))}
      </TableBody>
      </Table>
    </div>
  );
};

export default memo(ListaDeCadastros);