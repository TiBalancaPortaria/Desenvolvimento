
import type { UserCadastro } from '@/@types/types-cadastro';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { memo } from 'react';


interface ListaDeCadastrosProps {
   ListaCad: UserCadastro[]
}

const ListaDeCadastros = ({ ListaCad }: ListaDeCadastrosProps) => {

   const formatarData = (isoString: string) => {
   const data = new Date(isoString);
   return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
   }).format(data);
};

  return (
    <div>
      <Table className='bg-gray-200 dark:bg-gray-800'>
         <TableHeader>
            <TableRow className="bg-gray-400 dark:bg-gray-600">
               <TableHead className='text-black text-xl dark:text-white'>Nome</TableHead>
               <TableHead className='text-black text-xl dark:text-white'>Username</TableHead>
               <TableHead className='text-black text-xl dark:text-white'>Email</TableHead>
               <TableHead className='text-black text-xl dark:text-white'>Data de Cadastro</TableHead>
            </TableRow>
         </TableHeader>
      <TableBody>
         {ListaCad?.map((user) => (
            <TableRow key={user.id}>
               <TableCell>{user.nome}</TableCell>
               <TableCell>{user.username}</TableCell>
               <TableCell>{user.email}</TableCell>
               <TableCell>{formatarData(user.date_joined)}</TableCell> 
               
            </TableRow>
         ))}
      </TableBody>
      </Table>
    </div>
  );
};

export default memo(ListaDeCadastros);