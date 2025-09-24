import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { memo } from "react";



const Admin= () => {
   const handleClickVoltar = () => {
      window.history.back(); // Volta para a página anterior
   };

  return (
    <main className="bg-slate-300 dark:bg-gray-500 h-full">
      <nav className="bg-gray-400 dark:bg-slate-700 p-4 flex relative justify-center items-center h-16">
         <div className="absolute left-5">
            <ModeToggle />
         </div>
         <div>
            <h1 className="text-3xl font-bold text-red-600 ">Usuários</h1>
         </div>
         <div className="absolute right-5">
            <Button onClick={handleClickVoltar} className="bg-white text-black hover:underline dark:bg-black dark:text-white hover:bg-gray-200">Voltar</Button>
         </div>
      </nav>
    </main>
  );
};

export default memo(Admin);