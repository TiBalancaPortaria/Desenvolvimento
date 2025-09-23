export interface Colaborador {
  id: number;
  nome: string;
  cracha: string;
  setor: string;
  responsavel: string;
}

export interface Entrada {
  id: number;
  rh_func_chapa: string;
  colaborador?: string; // aqui é o nome que vem do backend
  horario_registrado: string | null;
  data_registro: string | null;
  tipo: string;
  motivo: string;
}
