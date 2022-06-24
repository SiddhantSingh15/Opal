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
import "./Login.css"

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="login">
        <Box>
          <h3>Authentication</h3>
          <p>
           Login to connect to your organisation and view your documents
          </p>
        </Box>
        <Stack spacing={3} sx={{ margin: "0 auto", marginTop: "30px"}}>
          <TextField
            id="email"
            label="Email"
            type="email"
            required
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
            sx={{background:"white", borderRadius: "15px"}}
          />
          <TextField
            id="password"
            label="Password"
            type="password"
            required
            autoComplete="off"
            onChange={(e) => setPassword(e.target.value)}
            sx={{background:"white", borderRadius: "15px"}}
          />
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Stack direction="row" sx={{ height: "20px" }}>
              <Checkbox/>
              <Typography sx={{ lineHeight: "20px" }} variant="body1">
                Remember me
              </Typography>
            </Stack>
            <Typography
              variant="body1"
              sx={{
                color: "white",
                textDecoration: "underline",
                cursor: "pointer",
              }}
            >
              Forgot credentials?
            </Typography>
          </Box>
          <button
            sx={{ height: "50px", display: "block", marginBottom: "50px" }}
            variant="contained"
          >
            <p>SUBMIT</p>
          </button>
        </Stack>
    </div>
  );
}
