import { LockOutlined } from "@mui/icons-material";
import {
  Container,
  CssBaseline,
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Api } from "../Api/api";
import useContextWrapper from "../hooks/useContextWrapper";
import { AuthContext } from "../Context/authContext";

const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState("");

  const { setAuthData } = useContextWrapper(AuthContext, {
    contextName: 'AuthContext',
    providerName: 'AuthProvider',
  })

  const navigate = useNavigate()

  const handleLogin = async () => {
    try {
      const response = await fetch(`${Api}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      })

      if (response.ok) {
        const data = await response.json();
        setAuthData(data);
        localStorage.setItem('token', data.access_token)
        navigate('/', {replace: true})
      }

      if (response.status === 401) {
        alert("Invalid credentials");
      }

    } finally {
      setUsername("");
      setPassword("");
    }
  };

  return (
    <>
      <Container maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            mt: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.light" }}>
            <LockOutlined />
          </Avatar>
          <Typography variant="h5">Login</Typography>
          <Box sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              placeholder="username"
              data-testid='username'
              id="username"
              label="username"
              name="username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <TextField
              data-testid='password'
              margin="normal"
              required
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />

            <Button
              data-testid='btn-login'
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleLogin}
            >
              Login
            </Button>
            <Grid container justifyContent={"flex-end"}>
              <Grid item>
                <Link data-testid='link-register' to="/auth/register">Don't have an account? Register</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Login;