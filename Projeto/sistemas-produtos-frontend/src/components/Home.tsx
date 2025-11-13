import { Box, Button, Paper, Typography, Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AVATAR_SIZE = 72;

const Home: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Box position="relative" minHeight="00vh" width="100vw">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Paper elevation={2} sx={{ p: 2, width: 320 }}>
          <Box textAlign="center" mb={2}>
            <Box display="flex" justifyContent="center" mb={1}>
              <Avatar
                variant="square"
                src="https://images.vexels.com/media/users/3/200096/isolated/preview/64364c12303f16577d8dbcd3b0092467-traco-do-icone-do-carrinho-de-compras-rosa.png"
                alt="SuperMario"
                sx={{
                  width: AVATAR_SIZE,
                  height: AVATAR_SIZE,
                  bgcolor: "transparent",
                }}
                slotProps={{ img: { loading: "lazy" } }}
              />
            </Box>
            <Typography variant="h5" component="h1" fontWeight={600} mb={2}>
              Super Mario
            </Typography>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mb: 2 }}
              type="button"
              onClick={() => navigate("/produtos")}
            >
            Lista de produtos
            </Button>
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              type="button"
              onClick={() => navigate("/cadastroProduto")}
            >
             Cadastro de produtos
            </Button>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default Home;