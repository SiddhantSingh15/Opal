import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  CircularProgress,
} from "@mui/material";
import React, { useState } from "react";
import authLogic from "../utils/authLogic";
import config from "../config";
import axios from "axios";
import { Box } from "@mui/system";

export default function RequestAccess({ document_id }) {
  const [requestingAccess, setRequestingAccess] = useState(false);
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClose = () => setRequestingAccess(false);

  /* Request access to the document */
  const handleRequest = async () => {
    const headers = authLogic.getHeaders();
    setLoading(true);
    try {
      const response = await axios.post(
        `${config.BACKEND_URI}/document/requestaccess`,
        { document_id, reason },
        { headers }
      );

      if (response.status === 200) {
        alert("Access requested");
      }
      window.location = window.location.href;
    } catch (e) {
      console.log(e);
      alert("Unknown error");
    }
  };

  return (
    <div className="buttons">
      <Button
        variant="contained"
        onClick={() => setRequestingAccess(true)}
        className="clickable buttons"
      >
        Request Access
      </Button>
      <Dialog open={requestingAccess} onClose={handleClose}>
        <DialogTitle>Request Document Access</DialogTitle>
        <DialogContent sx={{ minHeight: "120px" }}>
          <DialogContentText>
            Insert the reason why you need access to this document so that it is
            easier for admins to grant it.
          </DialogContentText>
          {!loading && (
            <TextField
              autoFocus
              margin="dense"
              label="Reason"
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) => setReason(e.target.value)}
            />
          )}
          {loading && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: "20px",
              }}
            >
              <CircularProgress />
            </Box>
          )}
        </DialogContent>
        {!loading && (
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleRequest}>Request</Button>
          </DialogActions>
        )}
      </Dialog>
    </div>
  );
}
