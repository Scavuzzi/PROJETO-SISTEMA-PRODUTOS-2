// 1. Defina sua interface principal 'Produto'
export interface Produto {
  id: number;
  nome: string;
  preco: number;
  estoque: number;
  categoriaId: number;
  Categoria: string;
}

export type NovoProduto = Omit<Produto, "id">;