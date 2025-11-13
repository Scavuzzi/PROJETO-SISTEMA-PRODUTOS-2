import axios from "axios";
import type { Produto } from "../types/produto.js";

const API_BASE = "http://localhost:3333";

export const getProdutos = async (): Promise<Produto[]> => {
  const res = await axios.get<Produto[]>(`${API_BASE}/Produtos`);
  return res.data;
};

export const deleteProduto = async (id: number): Promise<void> => {
  await axios.delete(`${API_BASE}/Produtos/${id}`);
};

export const updateProduto = async (
  id: number,
  dados: Produto
): Promise<Produto> => {
  const res = await axios.put<Produto>(`${API_BASE}/Produtos/${id}`, dados);
  return res.data;
};

export default {
  getProdutos,
  deleteProduto,
  updateProduto,
};