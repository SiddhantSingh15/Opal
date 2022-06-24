import {
  TextField,
  Paper,
  Box,
  Typography,
  Button,
  Stack,
  Checkbox,
  Backdrop,
  Alert,
  CircularProgress,
} from "@mui/material";
import React, { useState } from "react";
import config from "../config";
import CryptoJS from "crypto-js";

export default function Login({ open, close }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const requestLogin = () => {
    if (!email) {
      setErrorMessage("Email required");
      return;
    }
    if (!password) {
      setErrorMessage("Password required");
      return;
    }

    setLoading(true);

    fetch(`${config}/user/auth`, {
      headers: { username: email, password },
    })
      .then((res) => res.json())
      .then((jsonRes) => {
        if (!jsonRes.success) {
          setErrorMessage("Invalid credentials");
        } else {
          // Auth
          const encrypted = CryptoJS.AES.encrypt(
            `${email}${config.CREDENTIALS_SEPARATOR}${password}`,
            config.DUMMY_ENCRYPTION_SECRET
          ).toString();
          window.sessionStorage.setItem("auth", encrypted);
          window.location = window.location.pathname;
        }
        console.log(jsonRes);
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage("Error, retry");
      });
  };

  const handleClose = (e) => {
    if (
      e.target.className &&
      e.target.className.toLowerCase().includes("backdrop")
    )
      close();
  };

  let body = (
    <Stack
      spacing={3}
      sx={{ margin: "0 auto", marginTop: "30px", height: "320px" }}
    >
      <TextField
        id="email"
        label="Email"
        type="email"
        required
        autoComplete="off"
        onChange={(e) => {
          setErrorMessage(null);
          setEmail(e.target.value);
        }}
      />
      <TextField
        id="password"
        label="Password"
        type="password"
        required
        autoComplete="off"
        onChange={(e) => {
          setErrorMessage(null);
          setPassword(e.target.value);
        }}
      />
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Stack direction="row" sx={{ height: "20px" }}>
          <Checkbox />
          <Typography sx={{ lineHeight: "20px" }} variant="body1">
            Remember me
          </Typography>
        </Stack>
        <Typography
          variant="body1"
          sx={{
            color: "gray",
            textDecoration: "underline",
            cursor: "pointer",
          }}
        >
          Forgot credentials?
        </Typography>
      </Box>
      <Button
        sx={{ height: "50px", display: "block", marginBottom: "50px" }}
        variant="contained"
        onClick={requestLogin}
      >
        SUBMIT
      </Button>
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
    </Stack>
  );

  if (loading)
    body = (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          margin: "0 auto",
          marginTop: "30px",
          height: "320px",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );

  return (
    <Backdrop open={open} onClick={handleClose} sx={{ zIndex: 1 }}>
      <Paper
        elevation={10}
        sx={{ width: "400px", padding: "30px", zIndex: "1000" }}
      >
        <Box>
          <h3>Authentication</h3>
          <p>Login to connect to your organisation and view your documents</p>
        </Box>
        {body}
      </Paper>
    </Backdrop>
  );
}
