// Projeto\sistema-produtos-backend\src\validators\categoria.validator.ts
import { z } from "zod";

export const categoriaSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
});
