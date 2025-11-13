import { PrismaClient } from "@prisma/client";
import type { Request, Response } from "express";
import { categoriaSchema } from "../validators/categoria.validator.js";

const prisma = new PrismaClient();

export const createCategoria = async (req: Request, res: Response) => {
  try {
    const parsed = categoriaSchema.parse(req.body);
    const categoria = await prisma.categoria.create({ data: parsed });
    res.status(201).json(categoria);
  } catch (error: any) {
    if (error.errors) return res.status(400).json({ errors: error.errors });
    res.status(500).json({ error: "Erro ao criar categoria" });
  }
};

export const getCategorias = async (req: Request, res: Response) => {
  try {
    const categorias = await prisma.categoria.findMany();
    res.json(categorias);
  } catch {
    res.status(500).json({ error: "Erro ao listar categorias" });
  }
};

export const getCategoria = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const categoria = await prisma.categoria.findUnique({
      where: { id: Number(id) },
    });
    if (!categoria) return res.status(404).json({ error: "Categoria não encontrada" });
    res.json(categoria);
  } catch {
    res.status(500).json({ error: "Erro ao buscar categoria" });
  }
};

export const updateCategoria = async (req: Request, res: Response) => {
  try {
    const parsed = categoriaSchema.parse(req.body);
    const { id } = req.params;
    const categoria = await prisma.categoria.update({
      where: { id: Number(id) },
      data: parsed,
    });
    res.json(categoria);
  } catch (error: any) {
    if (error.errors) return res.status(400).json({ errors: error.errors });
    res.status(500).json({ error: "Erro ao atualizar categoria" });
  }
};

export const deleteCategoria = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.categoria.delete({ where: { id: Number(id) } });
    res.json({ message: "Categoria deletada com sucesso" });
  } catch {
    res.status(500).json({ error: "Erro ao deletar categoria" });
  }
};
