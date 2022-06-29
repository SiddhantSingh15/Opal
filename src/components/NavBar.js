import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import config from "../config";
import { ReactComponent as OpalLogo } from "../assets/opal.svg";
import "./NavBar.css";
import { Stack } from "@mui/material";
import { ReactComponent as User } from "../assets/user.svg";
import useAuth from "../hooks/useAuth";
import AuthForm from "./AuthForm";
import UserMenu from "./UserMenu";
import Notifications from "./Notifications";

const NavBar = () => {
  const location = useLocation();
  const [loginOpen, setLoginOpen] = useState(false);
  const authenticate = useAuth();

  const isAdmin = authenticate.admin;

  return (
    <div className="navbar">
      {location.pathname !== config.HOME_PATH && (
        <OpalLogo
          className="logo"
          onClick={() => (window.location = config.HOME_PATH)}
        />
      )}
      <AuthForm
        open={loginOpen}
        handleClose={() => setLoginOpen(false)}
        sx={{ zIndex: 1 }}
      />
      <Stack
        direction="row"
        align="center"
        justifyContent="flex-end"
        sx={{
          width: "200px",
          position: "absolute",
          right: "20px",
          top: "10px",
        }}
        spacing={5}
      >
        {authenticate.success && <Notifications userAdmin={isAdmin} />}
        {authenticate.success ? (
          <UserMenu userAdmin={isAdmin} />
        ) : (
          <div className="login-button" onClick={() => setLoginOpen(true)}>
            <User fill="white" />
          </div>
        )}
      </Stack>
    </div>
  );
};

export default NavBar;
