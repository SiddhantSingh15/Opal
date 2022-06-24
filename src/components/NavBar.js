import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import config from "../config";
import { ReactComponent as OpalLogo } from "../assets/opal.svg";
import "./NavBar.css";
import Login from "./Login";
import { Stack, Typography } from "@mui/material";
import { ReactComponent as User } from "../assets/user.svg";
import useAuth from "../hooks/useAuth";

const NavBar = () => {
  const location = useLocation();
  const [loginOpen, setLoginOpen] = useState(false);
  const authenticate = useAuth();

  return (
    <div className="navbar">
      {location.pathname !== config.HOME_PATH && (
        <OpalLogo
          className="logo"
          onClick={() => (window.location = config.HOME_PATH)}
        />
      )}
      <Stack direction="row" sx={{ width: "200px" }} spacing={5}></Stack>
      <Login
        open={loginOpen}
        close={() => setLoginOpen(false)}
        sx={{ zIndex: 1 }}
      />
      <div className="login-button" onClick={() => setLoginOpen(true)}>
        {authenticate.success ? (
          <Typography variant="h5" color="white">
            Hello there!
          </Typography>
        ) : (
          <User fill="white" />
        )}
      </div>
    </div>
  );
};

export default NavBar;
