// src/controllers/usuario.controller.ts
import type { Request, Response } from "express";
import { prisma } from "../prisma.js";
import { z } from "zod";

const usuarioSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Email inválido"),
  senha: z.string().min(4, "Senha deve ter ao menos 4 caracteres"),
});

export const createUsuario = async (req: Request, res: Response) => {
  try {
    const parsed = usuarioSchema.parse(req.body);
    const usuario = await prisma.usuario.create({
      data: parsed,
    });
    res.status(201).json(usuario);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: "Erro ao criar usuário" });
  }
};

export const getUsuarios = async (req: Request, res: Response) => {
  try {
    const usuarios = await prisma.usuario.findMany();
    res.json(usuarios);
  } catch {
    res.status(500).json({ error: "Erro ao listar usuários" });
  }
};

export const getUsuario = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const usuario = await prisma.usuario.findUnique({
      where: { id: Number(id) },
    });
    if (!usuario) return res.status(404).json({ error: "Usuário não encontrado" });
    res.json(usuario);
  } catch {
    res.status(500).json({ error: "Erro ao buscar usuário" });
  }
};

export const updateUsuario = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const parsed = usuarioSchema.parse(req.body);
    const usuario = await prisma.usuario.update({
      where: { id: Number(id) },
      data: parsed,
    });
    res.json(usuario);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: "Erro ao atualizar usuário" });
  }
};

export const deleteUsuario = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.usuario.delete({ where: { id: Number(id) } });
    res.json({ message: "Usuário deletado com sucesso" });
  } catch {
    res.status(500).json({ error: "Erro ao deletar usuário" });
  }
};
