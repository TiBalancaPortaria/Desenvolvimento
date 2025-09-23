import { ModeToggle } from "@/components/mode-toggle";
import ListaColaboradores from "./lista";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";



export default function CadColaborador() {
   const nav = useNavigate();

   const [filter, setFilter] = useState("");

   useEffect(() => {
      // Lógica para pesquisar colaboradores com base no filtro
   }, [filter]);

   const handleClickVoltar = () => {
      nav(-1); // Volta para a página anterior

      // const token = localStorage.getItem('token');
      // if (!token) {
      //    nav('/'); // Redireciona para a página de login se não houver token
      // }
   };

   return (
      <>
       <main className="bg-slate-300 dark:bg-gray-500 h-full">
         <nav className="bg-gray-400 dark:bg-slate-700 p-4 flex relative justify-center items-center h-16">
            <div className="absolute left-5">
               <ModeToggle />
            </div>
            <div>
               <h1 className="text-3xl font-bold text-red-600 ">Cadastro de Colaboradores</h1>
            </div>
            <div className="absolute right-5">
               <Button onClick={handleClickVoltar} className="bg-white text-black hover:underline dark:bg-black dark:text-white hover:bg-gray-200">Voltar</Button>
            </div>
         </nav>
         <div className="flex flex-row items-center justify-center mt-4">
            {/* <Dialog>
               <DialogRegistro />
            </Dialog> */}
            <Input placeholder="Pesquisar" className="mx-2 w-1/2 border-black" 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            />
         </div>
         <ListaColaboradores filter={filter} />
       </main>
      </>
   );
}