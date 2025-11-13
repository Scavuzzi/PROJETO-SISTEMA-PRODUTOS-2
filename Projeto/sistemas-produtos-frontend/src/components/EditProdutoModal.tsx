import React, { useState } from "react";
import type { Produto } from "../types/produto.js";
import { updateProduto } from "../services/produtoService.js"; 
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
} from "@mui/material";

interface EditarProdutoModalProps {
  open: boolean;
  Produto: Produto | null;
  onClose: () => void;
  onSave: (ProdutoAtualizado: Produto) => void;
}
const EditarProdutoModal: React.FC<EditarProdutoModalProps> = ({
  open,
  Produto,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<Produto>(
    Produto || {
      id: 0,
      nome: "",
      preco: 0,
      estoque: 0,
      CategoriaID: 0,
      Categoria: "",
    }
  );

  const [salvando, setSalvando] = useState(false);

  React.useEffect(() => {
    if (Produto && open) {
      setFormData({
        ...Produto,
      });
    }
  }, [Produto, open]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    setSalvando(true);
    try {
      await updateProduto(formData.id, formData);
      onSave(formData);
      onClose();
    } catch (error) {
      console.error("Erro ao salvar Produto:", error);
      alert("Erro ao salvar Produto. Tente novamente.");
    } finally {
      setSalvando(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: 600, fontSize: "1.25rem" }}>
        Editar Produto
      </DialogTitle>

      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
          <TextField
            fullWidth
            label="Nome"
            name="nome"
            value={formData.nome}
            onChange={handleInputChange}
            placeholder="Digite o nome completo"
          />

          <TextField
            fullWidth
            label="Preco"
            name="preco"
            type="preco"
            value={formData.preco}
            onChange={handleInputChange}
            placeholder="Digite o preco"
          />

          <TextField
            fullWidth
            label="estoque"
            name="estoque"
            value={formData.estoque}
            onChange={handleInputChange}
            placeholder="Digite o estoque"
          />

          <TextField
            fullWidth
            label="Categoria"
            name="catehoria"
            value={formData.Categoria || ""}
            onChange={handleInputChange}
            placeholder="Digite o telefone"
          />
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} color="inherit">
          Cancelar
        </Button>

        <Button
          onClick={handleSave}
          variant="contained"
          color="primary"
          disabled={salvando}
        >
          {salvando ? "Salvando..." : "Salvar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditarProdutoModal;