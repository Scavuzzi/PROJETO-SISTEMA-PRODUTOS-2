import produto from "../produto.js"
export interface categoria {
  id: number;
  nome: string;
  produtos: produto[]; 
}