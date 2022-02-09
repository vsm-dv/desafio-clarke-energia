import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { NavLink, useNavigate } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState, useEffect } from 'react';
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

export default function SignUp() {
  const emptyInputsSignUp = { name: "", email: "", password: "" };
  const [inputsSignUp, setInputsSignUp] = useState(emptyInputsSignUp);
  const [signUpError, setSignUpError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSignUpError(false);
    }, 3000);

    return () => {
      clearTimeout(timeout);
    }
  }, [signUpError])

  function goTo(path) {
    navigate(path);
  }

  function handleChange({ target }) {
    setInputsSignUp({ ...inputsSignUp, [target.name]: target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const body = {
      nome: inputsSignUp.name,
      email: inputsSignUp.email,
      senha: inputsSignUp.password
    }

    try {
      const response = await fetch('http://localhost:3333/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/json',
        },
        body: JSON.stringify(body)
      })
      const data = await response.json();

      console.log(data);

      if (!response.ok) {
        setSignUpError(data);
        return;
      };
      goTo('/login');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          </Avatar>
          <Typography component="h1" variant="h5">
            Cadastre-se
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  onChange={handleChange}
                  value={inputsSignUp.name}
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="firstName"
                  label="Nome"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={handleChange}
                  value={inputsSignUp.email}
                  required
                  fullWidth
                  id="email"
                  label="E-mail"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={handleChange}
                  value={inputsSignUp.password}
                  required
                  fullWidth
                  name="password"
                  label="Senha"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <p>Já está cadastrado? <NavLink to='/login'>Clique aqui</NavLink></p>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
        {signUpError && <ToastAlert errorMessage={signUpError} />}
      </Container>
    </ThemeProvider>
  );
}