import React, { useEffect, useState } from "react";
import type { Produto } from "../types/produto";
import { getProdutos, deleteProduto } from "../services/produtoService";
import {
  Box,
  Paper,
  Typography,
  IconButton,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import ProdutosTable from "./Produtostable"; 
import EditarProdutoModal from "./EditProdutoModal";

type SnackbarState = {
  open: boolean;
  message: string;
  severity: "success" | "error" | "info" | "warning";
};

const Produtos: React.FC = () => {
  const navigate = useNavigate();

  const [Produtos, setProdutos] = useState<Produto[]>([]);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    message: "",
    severity: "info",
  });
  const [ProdutoEditando, setProdutoEditando] = useState<Produto | null>(
    null
  );

  useEffect(() => {
    (async () => {
      try {
        const data = await getProdutos();
        setProdutos(data);
      } catch (e) {
        setSnackbar({
          open: true,
          message: "Erro ao buscar Produtos.",
          severity: "error",
        });
        console.error(e);
      }
    })();
  }, []);

  const handleDelete = async (id: number) => {
    setDeletingId(id);

    try {
      await deleteProduto(id);
      setProdutos((prev) => prev.filter((p) => p.id !== id));
      setSnackbar({
        open: true,
        message: "Produto removido com sucesso.",
        severity: "success",
      });
    } catch (e) {
      setSnackbar({
        open: true,
        message: "Erro ao deletar Produto.",
        severity: "error",
      });
      console.error(e);
    } finally {
      setDeletingId(null);
    }
  };

  const handleOpenEditModal = (Produto: Produto) => {
    setProdutoEditando(Produto);
  };

  const handleCloseEditModal = () => {
    setProdutoEditando(null);
  };

  const handleSaveProduto = (ProdutoAtualizado: Produto) => {
    setProdutos((prev) =>
      prev.map((p) => (p.id === ProdutoAtualizado.id ? ProdutoAtualizado : p))
    );
    setSnackbar({
      open: true,
      message: "Produto atualizado com sucesso.",
      severity: "success",
    });
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      minHeight="100vh"
      bgcolor="background.default"
      p={3}
    >
      <Paper
        elevation={3}
        sx={(theme) => ({
          width: "100%",
          maxWidth: 1000,
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
          onClick={() => navigate("/home")}
          size="small"
          sx={{ position: "absolute", left: 16, top: 16 }}
        >
          <ArrowBackIcon fontSize="small" />
        </IconButton>

        <Typography variant="h5" fontWeight={600} mb={3} textAlign="center">
          Lista de Produtos
        </Typography>

        <ProdutosTable
          produtos={Produtos}
          deletingId={deletingId}
          onDelete={handleDelete}
          onEdit={handleOpenEditModal}
        />

        <Box mt={3} display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            color="primary"
            className="uppercase font-bold"
          >
            Novo Produto
          </Button>
        </Box>

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
      </Paper>

      <EditarProdutoModal
        open={ProdutoEditando !== null}
        Produto={ProdutoEditando}
        onClose={handleCloseEditModal}
        onSave={handleSaveProduto}
      />
    </Box>
  );
};

export default Produtos;