import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  DialogActions,
  Button,
  Alert,
} from "@mui/material";
// import LoadingButton from "@mui/lab/LoadingButton";

export default function SaveTag({ saveTag, load }) {
  const [open, setOpen] = useState(false);
  const [tagName, setTagName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    if (!tagName) {
      setErrorMessage("Tag name must not be empty!");
      return;
    }
    saveTag(tagName);
  };

  return (
    <div
      className="save-tag"
      style={{ display: "flex", justifyContent: "flex-end" }}
    >
      <button onClick={handleClickOpen}>Save Tag</button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create Tag</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Save this search as a new Tag for future reference.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Tag Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setErrorMessage("");
              setTagName(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          {load ? (
            <Button sx={{ color: "gray", fontStyle: "italic" }}>
              loading...
            </Button>
          ) : (
            <Button onClick={handleSubmit}>Create</Button>
          )}
        </DialogActions>
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      </Dialog>
    </div>
  );
}
