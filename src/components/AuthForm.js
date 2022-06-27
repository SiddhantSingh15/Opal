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
import authLogic from "../utils/authLogic";
import "./Login.css";
import RememberMe from "./dummy/RememberMe";
import UserType from "./dummy/UserType";

/** Auth form for both login and Sign up
 * @param {bool} signup true if sign up false if login
 */
export default function AuthForm({ open, handleClose, signup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  /** Login existing user (LOGIN) */
  const requestLogin = async () => {
    if (!email) {
      setErrorMessage("Email required");
      return;
    }
    if (!password) {
      setErrorMessage("Password required");
      return;
    }

    setLoading(true);

    const response = await authLogic.loginRequest(email, password);
    if (!response) {
      alert("Unknown error, retry!");
      setLoading(false)
      return;
    }

    if (!response.created) {
      alert("Invalid credentials");
      setLoading(false)
      return;
    }

    const encrypted = CryptoJS.AES.encrypt(
      `${email}${config.CREDENTIALS_SEPARATOR}${password}`,
      config.DUMMY_ENCRYPTION_SECRET
    ).toString();
    window.sessionStorage.setItem("auth", encrypted);
    window.location = window.location.pathname;
  };

  /** Create a new user (SIGNUP) */
  const createUser = async () => {
    if (!email) {
      setErrorMessage("Email required");
      return;
    }
    if (!password) {
      setErrorMessage("Password required");
      return;
    }

    setLoading(true);

    const response = await authLogic.signupRequest(email, password);
    if (!response) {
      alert("Unknown error, retry!");
      setLoading(false)
      return;
    }

    if (!response.created) {
      console.log(response)
      alert("User successfuly created!");
      setLoading(false)
      return;
    }

    window.location = window.location.pathname;
  };

  const hideBox = (e) => {
    if (
      e.target.className &&
      e.target.className.toLowerCase().includes("backdrop")
    )
      handleClose();
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
        sx={{ background: "white", borderRadius: "15px" }}
        onChange={(e) => {
          setErrorMessage(null);
          setEmail(e.target.value);
        }}
      />
      <TextField
        label="Password"
        type="password"
        required
        autoComplete="off"
        sx={{ background: "white", borderRadius: "15px" }}
        onChange={(e) => {
          setErrorMessage(null);
          setPassword(e.target.value);
        }}
      />
      {signup ? <UserType handleChange={() => setErrorMessage("")} /> : <RememberMe />}
      <Button
        sx={{
          height: "50px",
          display: "block",
          marginBottom: "50px",
          borderRadius: "15px",
          background: "white",
          color: "black",
        }}
        variant="contained"
        onClick={signup ? createUser : requestLogin}
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

  const text = signup
    ? {
        title: "Create User",
        description: "Create new user from email and password.",
      }
    : {
        title: "Authentication",
        description:
          "Login to connect to your organisation and view your documents",
      };

  return (
    <Backdrop open={open} onClick={hideBox} sx={{ zIndex: 1 }}>
      <Paper
        elevation={10}
        sx={{
          borderRadius: "15px",
          width: "400px",
          padding: "30px",
          zIndex: "1000",
          backgroundColor: "#202124",
        }}
      >
        <Box sx={{ color: "white" }}>
          <h3>{text.title}</h3>
          <p>{text.description}</p>
        </Box>
        {body}
      </Paper>
    </Backdrop>
  );
}
