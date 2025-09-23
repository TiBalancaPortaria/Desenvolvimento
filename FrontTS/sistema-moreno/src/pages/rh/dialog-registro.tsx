import api from "@/axios/api";
import { Button } from "@/components/ui/button";
import { DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function DialogRegistro({ onCadastro }: { onCadastro?: () => void }) {

   const [colaborador, setColaborador] = useState({
      nome: "",
      cracha: "",
      setor: "",
      responsavel: ""
   });

   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setColaborador({
         ...colaborador, // mantenho os valores anteriores
         [name]: value // atualizo o campo específico
      });
      
   };

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
         await api.post("/api/Colaborador/", colaborador);
         alert("Colaborador cadastrado com sucesso!");
         if (onCadastro) {
            onCadastro(); // chama a função de callback se fornecida
         }

         setColaborador({
            nome: "",
            cracha: "",
            setor: "",
            responsavel: ""
         });
      } catch (error) {
         console.error("Erro ao cadastrar colaborador:", error);
         alert("Erro ao cadastrar colaborador. Tente novamente.");
      }
   }


   return(
      <>
         <DialogTrigger className=" bg-red-600 text-white px-4 py-2 rounded m-4">
            Cadastrar Colaborador
         </DialogTrigger>
         <DialogContent>
            <DialogHeader>
               <DialogTitle className="text-2xl text-red-600 font-bold">Cadastro de Colaborador</DialogTitle>
               <form className="flex flex-col gap-4 mt-4"
               onSubmit={handleSubmit}
               >
                  <label className="text-lg">Nome: </label>
                     <Input type="text" className="border border-gray-300 p-2 rounded"
                     name="nome"
                     value={colaborador.nome}
                     onChange={handleInputChange}
                     />

                  <label className="text-lg">Cracha:</label>
                     <Input type="number" className="border border-gray-300 p-2 rounded"
                     name="cracha"
                     value={colaborador.cracha}
                     onChange={handleInputChange}
                     />

                  <label className="text-lg">Setor:</label>
                     <Input type="text" className="border border-gray-300 p-2 rounded"
                     name="setor"
                     value={colaborador.setor}
                     onChange={handleInputChange}
                     />

                  <label className="text-lg">Responsavel:</label>
                     <Input type="text" className="border border-gray-300 p-2 rounded"
                     name="responsavel"
                     value={colaborador.responsavel}
                     onChange={handleInputChange}
                     />

                  <Button type="submit" 
                  
                  className="bg-red-600 text-white px-4 py-2 rounded mt-5">Cadastrar</Button>
               </form>
            </DialogHeader>
         </DialogContent>
      </>
   )
   
}