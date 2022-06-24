import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import config from "../config";
import { ReactComponent as OpalLogo } from "../assets/opal.svg";
import "./NavBar.css";
import Login from "./Login";
import { Backdrop, Box, Stack, Typography } from "@mui/material";
import {ReactComponent as User} from "../assets/user.svg"

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

      </Stack>
      <Backdrop open={login} onClick={() => setLogin(false)} sx={{ zIndex: 1 }}>
        <Login />
      </Backdrop>
      <div login className = "login-button" 
                   onClick={() => setLogin(true)}>
          <User fill="white"/>
        </div>
    </div>
  );
};

export default NavBar;
