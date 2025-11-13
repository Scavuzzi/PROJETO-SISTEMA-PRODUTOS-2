import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Snackbar,
  Alert,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
// Assumindo que você tenha uma função 'createProduto' no seu service
import { createProduto } from "../services/produtoService";

// Mesmo tipo de estado do Snackbar que você usou em Produtos.tsx
type SnackbarState = {
  open: boolean;
  message: string;
  severity: "success" | "error" | "info" | "warning";
};

// O tipo de dados do formulário. É melhor usar strings
// para os campos do formulário e converter na hora de enviar.
const initialState = {
  nome: "",
  preco: 0,
  estoque: 0,
  CategoriaID: 0,
  Categoria: "", 
};

const CadastroProduto: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialState);
  const [isSaving, setIsSaving] = useState(false);
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    message: "",
    severity: "info",
  });

  // Função genérica para atualizar o estado do formulário
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      // Converte os campos de string para número ANTES de enviar
      const dadosParaAPI = {
        ...formData,
        preco: Number(formData.preco),
        estoque: Number(formData.estoque),
        CategoriaID: Number(formData.CategoriaID),
      };

      // Chama o serviço da sua API
      await createProduto(dadosParaAPI);

      // Mostra feedback de sucesso
      setSnackbar({
        open: true,
        message: "Produto cadastrado com sucesso!",
        severity: "success",
      });

      // Limpa o formulário e navega de volta
      setFormData(initialState);
      setTimeout(() => navigate("/produtos"), 1500); // Espera 1.5s
    } catch (error) {
      console.error(error);
      setSnackbar({
        open: true,
        message: "Erro ao cadastrar produto.",
        severity: "error",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="background.default"
      p={3}
    >
      <Paper
        elevation={3}
        sx={(theme) => ({
          width: "100%",
          maxWidth: 600,
          p: 3,
          position: "relative",
          bgcolor:
            theme.palette.mode === "dark" ? "#242424" : "background.paper",
          color: theme.palette.text.primary,
          borderRadius: 2,
        })}
      >
        <IconButton
          aria-label="voltar"
          onClick={() => navigate("/home")} // Volta para o Home
          size="small"
          sx={{ position: "absolute", left: 16, top: 16 }}
        >
          <ArrowBackIcon fontSize="small" />
        </IconButton>

        <Typography variant="h5" fontWeight={600} mb={3} textAlign="center">
          Cadastrar Novo Produto
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            name="nome"
            label="Nome do Produto"
            value={formData.nome}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            name="preco"
            label="Preço"
            type="number" // Define o input como numérico
            value={formData.preco}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
            InputProps={{ inputProps: { min: 0, step: "0.01" } }} // Para decimais
          />
          <TextField
            name="estoque"
            label="Estoque"
            type="number"
            value={formData.estoque}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
            InputProps={{ inputProps: { min: 0 } }} // Apenas inteiros
          />
          <TextField
            name="CategoriaID"
            label="ID da Categoria"
            type="number"
            value={formData.CategoriaID}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
            InputProps={{ inputProps: { min: 0 } }}
          />
        
          
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={isSaving}
            sx={{ mt: 3, py: 1.5, fontWeight: 600 }}
          >
            {isSaving ? "Salvando..." : "Salvar Produto"}
          </Button>
        </Box>
      </Paper>

      {/* Componente de Snackbar para feedback */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CadastroProduto;