import type { Produto } from './produto.ts';

export interface Categoria {
  id: number;
  nome: string;
  produtos: Produto[]; 
}

