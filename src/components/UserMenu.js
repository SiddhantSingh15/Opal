import React, { useState } from "react";
import { Typography, Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function UserMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClose = () => setAnchorEl(null);

  const handleLogout = () => {
    sessionStorage.removeItem("auth");
    window.location = window.location.pathname;
  };

  // TODO: implement it really from server info
  const userAdmin = true;

  return (
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
        {window.location.pathname !== "/admin" && userAdmin && (
          <MenuItem onClick={() => navigate("/admin")}>Admin</MenuItem>
        )}
      </Menu>
    </div>
  );
}
