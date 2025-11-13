import express from "express";
import dotenv from "dotenv";
import produtoRoutes from "./routes/produto.routes";
import categoriaRoutes from "./routes/categoria.routes";
import usuarioRoutes from "./routes/usuario.routes";
import { setupSwagger } from "./swagger";

dotenv.config();
const app = express();
app.use(express.json());

// Rota teste
app.get("/", (req, res) => {
  res.json({ message: "API funcionando!" });
});

// Rotas
app.use("/produtos", produtoRoutes);
app.use("/categorias", categoriaRoutes);
app.use("/usuarios", usuarioRoutes);

// Swagger
setupSwagger(app);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
