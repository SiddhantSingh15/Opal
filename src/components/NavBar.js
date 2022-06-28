import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import config from "../config";
import { ReactComponent as OpalLogo } from "../assets/opal.svg";
import "./NavBar.css";
import { Menu, MenuItem, Stack, Typography } from "@mui/material";
import { ReactComponent as User } from "../assets/user.svg";
import useAuth from "../hooks/useAuth";
import AuthForm from "./AuthForm";

const NavBar = () => {
  const location = useLocation();
  const [loginOpen, setLoginOpen] = useState(false);
  const authenticate = useAuth();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);

  const handleClose = () => setAnchorEl(null);

  const handleLogout = () => {
    sessionStorage.removeItem("auth");
    handleClose();
  };

  return (
    <div className="navbar">
      {location.pathname !== config.HOME_PATH && (
        <OpalLogo
          className="logo"
          onClick={() => (window.location = config.HOME_PATH)}
        />
      )}
      <Stack direction="row" sx={{ width: "200px" }} spacing={5}></Stack>
      <AuthForm
        open={loginOpen}
        handleClose={() => setLoginOpen(false)}
        sx={{ zIndex: 1 }}
      />
      {authenticate.success ? (
        <div className="login-button">
          <Typography
            variant="h5"
            color="white"
            onClick={(e) => setAnchorEl(e.currentTarget)}
          >
            Hello there!
          </Typography>
          <Menu
            anchorEl={anchorEl}
            open={menuOpen}
            onClick={handleClose}
            PaperProps={{
              style: {
                width: "150px",
              },
            }}
          >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
            {window.location.pathname !== "/admin" && (
              <MenuItem onClick={() => navigate("/admin")}>Admin</MenuItem>
            )}
          </Menu>
        </div>
      ) : (
        <div className="login-button" onClick={() => setLoginOpen(true)}>
          <User fill="white" />
        </div>
      )}
    </div>
  );
};

export default NavBar;
