import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import background from '../../assets/background.jpg';
import { NavLink, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import ToastAlert from '../../compontents/ToastAlert';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Clarke Energia Marketplace
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignInSide() {
  const emptyInputsLogin = ({ email: "", password: "" });
  const [inputsLogin, setInputsLogin] = useState(emptyInputsLogin);
  const authentication = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      authentication.setErrorLoginMessage(false);
    }, 3000);

    return () => {
      clearTimeout(timeout);
    }
  }, [authentication.errorLoginMessage])

  function goTo(path) {
    navigate(path);
  }

  function handleChange({ target }) {
    setInputsLogin({ ...inputsLogin, [target.name]: target.value });
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${background})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            </Avatar>
            <Typography component="h1" variant="h5">
              Entrar
            </Typography>
            <Box noValidate sx={{ mt: 1 }}>
              <TextField
                onChange={handleChange}
                value={inputsLogin.email}
                margin="normal"
                required
                fullWidth
                id="email"
                label="E-mail"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                onChange={handleChange}
                value={inputsLogin.password}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Senha"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                onClick={() => authentication.login(inputsLogin.email, inputsLogin.password, () => goTo("/home"))}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Login
              </Button>
              <p>Não tem cadastro? <NavLink to='/sign-up'>Clique aqui</NavLink></p>
              <Copyright sx={{ mt: 5 }} />
            </Box>

          </Box>
        </Grid>
        {authentication.errorLoginMessage && <ToastAlert errorMessage={authentication.errorLoginMessage} />}
      </Grid>
    </ThemeProvider>
  );
}