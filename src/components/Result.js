import { Backdrop, Box } from "@mui/material";
import DocumentExtract from "./DocumentExtract";
import React from "react";
import styles from "../styles";

export default function Result(props) {
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <Box
      sx={{ ...styles.coloredBox, height: "50px", fontSize: "2rem" }}
      onClick={handleToggle}
    >
      Result no {props.result}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <DocumentExtract doc={props.result} />
      </Backdrop>
    </Box>
  );
}
