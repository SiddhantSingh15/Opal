import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import config from "../config";
import { ReactComponent as OpalLogo } from "../assets/opal.svg";
import "./NavBar.css";

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="navbar">
      {location.pathname !== config.HOME_PATH && (
        <OpalLogo className="logo" onClick={() => navigate(config.HOME_PATH)} />
      )}
    </div>
  );
};

export default NavBar;
