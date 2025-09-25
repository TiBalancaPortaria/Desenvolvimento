
import type { UserCadastro } from '@/@types/types-cadastro';
import { signUp } from '@/api/auth';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertTriangle, CheckCircle } from 'lucide-react';
import { memo, useState } from 'react';



interface CadUserProps {
   onCadastroSucesso?: (novoUsuario: UserCadastro) => void;
}

const CadUser = ({ onCadastroSucesso }: CadUserProps) => {
   const [username, setUsername] = useState('');
   const [name, setName] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [alertMessage, setAlertMessage] = useState<{ type: "success" | "error" , message: string } | null>(null);

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      try{
         const novoUsuario = await signUp({ username, nome: name, email, password });

         onCadastroSucesso?.(novoUsuario);

         setAlertMessage({ type: "success", message: 'Usuário cadastrado com sucesso!' });
         // Limpar campos
         setUsername('');
         setName('');
         setEmail('');
         setPassword('');
      } catch (error) {
         setAlertMessage({ type: "error", message: 'Erro ao cadastrar usuário.' });
      }

   }
   

  return (
    <>
      <DialogTrigger asChild>
         <Button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Cadastrar Usuário
         </Button>
      </DialogTrigger>
      <DialogContent>

         <DialogHeader className='text-4xl font-bold'>
            <DialogTitle className='text-4xl font-bold'>Cadastro de Usuário</DialogTitle>
            <DialogDescription>
               Preencha os dados do usuário
            </DialogDescription>
         </DialogHeader>
         
         <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4 mt-4">
               <div className="flex flex-col">
                  <label className="mb-1 font-semibold">Username</label>
                  <input type="text" 
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  placeholder='Username'
                  className="border px-3 py-2 rounded text-black dark:text-white dark:bg-gray-950" />
               </div>
               <div className="flex flex-col">
                  <label className="mb-1 font-semibold">Nome:</label>
                  <input type="text" 
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder='Nome'
                  className="border px-3 py-2 rounded text-black dark:text-white dark:bg-gray-950" />
               </div>
               <div className="flex flex-col">
                  <label className="mb-1 font-semibold">Email:</label>
                  <input type="email" 
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder='Email'
                  className="border px-3 py-2 rounded text-black dark:text-white dark:bg-gray-950" />
               </div>
               <div className="flex flex-col">
                  <label className="mb-1 font-semibold">Senha:</label>
                  <input type="password" 
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder='Senha'
                  className="border px-3 py-2 rounded text-black dark:text-white dark:bg-gray-950" />
               </div>
               <Button type="submit" className="bg-red-600 text-white font-bold text-xl px-4 py-2 rounded hover:bg-red-700">
                  Cadastrar
               </Button>
            </div>
         </form>
         {alertMessage && (
            <Alert 
               variant={alertMessage.type === "error" ? "destructive" : "default"} 
               className="mt-4"
            >
               {alertMessage.type === "error" ? (
                  <AlertTriangle className="h-4 w-4" />
               ) : (
                  <CheckCircle className="h-4 w-4" />
               )}
               <AlertTitle>
                  {alertMessage.type === "error" ? "Erro" : "Sucesso"}
               </AlertTitle>
               <AlertDescription>
                  {alertMessage.message}
               </AlertDescription>
            </Alert>
         )}
      </DialogContent>
    </>
  );
};

export default memo(CadUser);