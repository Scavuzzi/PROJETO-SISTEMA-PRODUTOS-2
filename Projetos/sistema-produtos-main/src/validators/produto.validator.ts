import { z } from "zod";

export const produtoSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  preco: z.number().positive("Preço deve ser maior que 0"),
  estoque: z.number().int().nonnegative("Estoque não pode ser negativo"),
  categoriaId: z.number().int().positive("CategoriaId deve ser positivo"),
});
