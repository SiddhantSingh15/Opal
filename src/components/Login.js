import {
  TextField,
  Paper,
  Box,
  Typography,
  Button,
  Stack,
  Checkbox,
} from "@mui/material";
import React, { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Paper elevation={10} sx={{ width: "400px", padding: "30px" }}>
      <Box>
        <Typography variant="h3">Authentication</Typography>
        <Typography variant="subtitle">
          Login to connect to your organisation and view your documents
        </Typography>
      </Box>
      <Stack spacing={3} sx={{ margin: "0 auto", marginTop: "30px" }}>
        <TextField
          id="email"
          label="Email"
          type="email"
          required
          autoComplete="off"
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          id="password"
          label="Password"
          type="password"
          required
          autoComplete="off"
          onChange={(e) => setPassword(e.target.value)}
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
        >
          SUBMIT
        </Button>
      </Stack>
    </Paper>
  );
}
