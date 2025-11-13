import { PrismaClient } from "@prisma/client";
import type { Request, Response } from "express";
import { produtoSchema } from "../validators/produto.validator.js";

const prisma = new PrismaClient();

export const getProdutos = async (req: Request, res: Response) => {
  try {
    const produtos = await prisma.produto.findMany({
      include: { categoria: true }, // inclui dados da categoria
    });
    res.json(produtos);
  } catch {
    res.status(500).json({ error: "Erro ao listar produtos" });
  }
};

export const getProduto = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const produto = await prisma.produto.findUnique({
      where: { id: Number(id) },
      include: { categoria: true },
    });
    if (!produto) return res.status(404).json({ error: "Produto não encontrado" });
    res.json(produto);
  } catch {
    res.status(500).json({ error: "Erro ao buscar produto" });
  }
};

export const createProduto = async (req: Request, res: Response) => {
  try {
    const parsed = produtoSchema.parse(req.body);
    const produto = await prisma.produto.create({
      data: parsed,
    });
    res.status(201).json(produto);
  } catch (error: any) {
    if (error.errors) return res.status(400).json({ errors: error.errors });
    res.status(500).json({ error: "Erro ao criar produto" });
  }
};

export const updateProduto = async (req: Request, res: Response) => {
  try {
    const parsed = produtoSchema.parse(req.body);
    const { id } = req.params;
    const produto = await prisma.produto.update({
      where: { id: Number(id) },
      data: parsed,
    });
    res.json(produto);
  } catch (error: any) {
    if (error.errors) return res.status(400).json({ errors: error.errors });
    res.status(500).json({ error: "Erro ao atualizar produto" });
  }
};

export const deleteProduto = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.produto.delete({ where: { id: Number(id) } });
    res.json({ message: "Produto deletado com sucesso" });
  } catch {
    res.status(500).json({ error: "Erro ao deletar produto" });
  }
};
