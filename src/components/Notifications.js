import React, { useState } from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Stack, Menu, MenuItem, Typography, IconButton } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import notificationManager from "../utils/notifications";

export default function Notifications({ userAdmin }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);

  const handleClose = () => setAnchorEl(null);

  const notificatios = userAdmin
    ? notificationManager.getAdmin()
    : notificationManager.getUser("user_id");

  const getNotificationBody = (notification) => {
    switch (notification.status) {
      case "rejected":
        return [<ErrorOutlineIcon color="error" />, "denied"];
      case "pending":
        return [<HourglassTopIcon color="warning" />, "requested"];
      case "accepted":
        return [<CheckCircleOutlineIcon color="success" />, "denied"];
      default:
        return [null, "unknown"];
    }
  };

  /** Handles access request, accepting or rejecting it. */
  const handleRequest = (requestID, accept) => {
    alert(accept);
  };

  return (
    <Stack sx={{ color: "white" }} justifyContent="center">
      <NotificationsIcon
        cursor="pointer"
        onClick={(e) => setAnchorEl(e.currentTarget)}
      />
      <Menu
        anchorEl={anchorEl}
        open={menuOpen}
        onClick={handleClose}
        PaperProps={{
          style: {
            width: "350px",
            maxHeight: "300px",
            overflowY: "scroll",
          },
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {notificatios.map((item, key) => {
          const [icon, verb] = getNotificationBody(item);
          return (
            <MenuItem key={key} style={{ whiteSpace: "normal" }}>
              {icon}
              <Typography marginLeft={1} variant="body2">
                Access {verb} to {item.title}
              </Typography>
              {userAdmin && (
                <Stack>
                  <IconButton onClick={() => handleRequest(item.id, true)}>
                    <ThumbUpOffAltIcon color="success" fontSize="small" />
                  </IconButton>
                  <IconButton onClick={() => handleRequest(item.id, false)}>
                    <ThumbDownOffAltIcon color="error" fontSize="small" />
                  </IconButton>
                </Stack>
              )}
            </MenuItem>
          );
        })}
      </Menu>
    </Stack>
  );
}
