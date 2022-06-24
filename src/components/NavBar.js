import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import config from "../config";
import { ReactComponent as OpalLogo } from "../assets/opal.svg";
import "./NavBar.css";
import Login from "./Login";
import { Backdrop, Box, Stack, Typography } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";

const NavBar = () => {
  const location = useLocation();

  const [login, setLogin] = useState(false);

  return (
    <div className="navbar">
      {location.pathname !== config.HOME_PATH && (
        <OpalLogo
          className="logo"
          onClick={() => (window.location = config.HOME_PATH)}
        />
      )}
      <Stack direction="row" sx={{ width: "200px" }} spacing={5}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "90px",
            cursor: "pointer",
          }}
          onClick={() => setLogin(true)}
        >
          <Typography color="white" variant="h6" sx={{ width: "100px" }}>
            LOGIN
          </Typography>
          <LoginIcon sx={{ color: "white" }} />
        </Box>
      </Stack>
      <Backdrop open={login} onClick={() => setLogin(false)} sx={{ zIndex: 1 }}>
        <Login />
      </Backdrop>
    </div>
  );
};

export default NavBar;
