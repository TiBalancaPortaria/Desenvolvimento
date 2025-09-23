import { DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";


export default function CadEntrada(){
   return (
      <>
         <DialogTrigger className="bg-blue-500 text-white px-4 py-2 rounded">
            Cadastrar Entrada
         </DialogTrigger>
         <DialogContent>
            <DialogHeader>
               <DialogTitle>Cadastrar Entrada</DialogTitle>
               <form className="flex flex-col gap-4 mt-4">
                  <label>Nome: </label>
                  <Input type="text"/>
                  <br />
                  <label>Data Entrada:</label>
                  <Input type="datetime-local" />
                  <br />
               </form>
            </DialogHeader>
         </DialogContent>
      </>
   );
}