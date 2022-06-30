import React, { useState, useEffect } from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import {
  Stack,
  Menu,
  MenuItem,
  Typography,
  IconButton,
  Tooltip,
} from "@mui/material";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import useFetchNotifications from "../hooks/useFetchNotifications";
import authLogic from "../utils/authLogic";
import axios from "axios";
import config from "../config";

let count = 0;

export default function Notifications({ userAdmin }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);
  const [dummy, setDummy] = useState(0);

  const handleClose = () => setAnchorEl(null);

  const notifications = useFetchNotifications(Math.floor(count / 2), userAdmin);

  useEffect(() => {
    setInterval(() => {
      count++;
      setDummy(count);
    }, 2000);
  }, []);

  const getNotificationBody = (notification) => {
    switch (notification.type) {
      case "access_grant":
        return [<CheckCircleOutlineIcon color="success" />, "granted"];
      case "access_request":
        return [<HourglassTopIcon color="warning" />, "requested"];
      default:
        return [null, null];
    }
  };

  /** Handles access request, accepting or rejecting it. */
  const handleGrantAccess = async (
    notification_id,
    document_id,
    granted_to
  ) => {
    const headers = authLogic.getHeaders();
    const body = { notification_id, document_id, granted_to };
    console.log(headers, body);
    try {
      const response = await axios.post(
        `${config.BACKEND_URI}/document/grantaccess`,
        body,
        { headers }
      );
    } catch (e) {
      console.log(e);
    }
  };

  if (!notifications || notifications.length === 0) return null;

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
        {[...notifications].reverse().map((item, key) => {
          const [icon, verb] = getNotificationBody(item);
          return (
            <MenuItem
              onClick={() => (window.location = window.location.href)}
              key={key}
              style={{ whiteSpace: "normal" }}
            >
              {icon}
              <Typography marginLeft={1} variant="body2">
                Access {verb} by <b>{item.sender}</b> to document{" "}
                <b>{item.document_id}</b>
              </Typography>
              {userAdmin && (
                <Tooltip title="grant access">
                  <IconButton
                    onClick={() =>
                      handleGrantAccess(item.id, item.document_id, item.sender)
                    }
                  >
                    <ThumbUpOffAltIcon color="success" fontSize="small" />
                  </IconButton>
                </Tooltip>
              )}
            </MenuItem>
          );
        })}
      </Menu>
    </Stack>
  );
}
