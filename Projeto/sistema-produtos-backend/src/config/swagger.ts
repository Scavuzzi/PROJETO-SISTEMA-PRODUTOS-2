import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import type { Express } from "express";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Sistema de Produtos - Faculdade",
      version: "1.0.0",
      description:
        "API Full Stack desenvolvida com Express, TypeScript, Prisma, PostgreSQL e Zod. Parte do projeto acadêmico solicitado pela faculdade.",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Servidor local",
      },
    ],
  },
  // Aqui você define onde o Swagger vai procurar as anotações JSDoc
  apis: ["./src/routes/*.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

export function setupSwagger(app: Express) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
