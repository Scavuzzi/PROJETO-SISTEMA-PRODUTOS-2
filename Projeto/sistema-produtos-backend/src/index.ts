// Projeto\sistema-produtos-backend\src\index.ts
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import produtoRoutes from "./routes/produto.routes.js";
import categoriaRoutes from "./routes/categoria.routes.js";
import usuarioRoutes from "./routes/usuario.routes.js";
import { setupSwagger } from "./swagger.js";

dotenv.config();
const app = express();
app.use(cors());
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
