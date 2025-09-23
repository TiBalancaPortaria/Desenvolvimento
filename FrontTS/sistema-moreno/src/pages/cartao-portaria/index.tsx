import { ModeToggle } from "@/components/mode-toggle";
import Nav from "../colaboradores-portaria/nav";


export const CartaoPortaria = () => {
   return (
      <main className="bg-gray-300 dark:bg-slate-600 min-h-screen">
         <header className="relative flex items-center justify-center h-16 bg-gray-400 dark:bg-slate-800">
            <div className="absolute left-2"><ModeToggle /></div>
            <h1 className="text-3xl font-extrabold text-red-600">Cartão Portaria</h1>
         </header>
         <Nav />
         
      </main>
   );
}