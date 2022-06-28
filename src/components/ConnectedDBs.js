import {
  Paper,
  Stack,
  Typography,
  Tooltip,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  CircularProgress,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import AddIcon from "@mui/icons-material/Add";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import React from "react";

export default function ConnectedDBs() {
  const databases = [
    { id: "1", name: "Dropbox", type: "Internal", status: "connected" },
    { id: "2", name: "Westlaw", type: "Free", status: "connected" },
    { id: "5", name: "OneLegale", type: "Subscribed", status: "connecting" },
    { id: "3", name: "SEC", type: "Free", status: "connected" },
    { id: "4", name: "OneDrive", type: "Internal", status: "connected" },
    {
      id: "6",
      name: "Thompson&Thompson",
      type: "Subscribed",
      status: "failed",
    },
  ];

  const getColor = (type) => {
    switch (type) {
      case "Internal":
        return "lightblue";
      case "Free":
        return "lightgreen";
      case "Subscribed":
        return "salmon";
      default:
        break;
    }
  };

  const getStatus = (status) => {
    switch (status) {
      case "connected":
        return (
          <Stack direction="row" alignItems="center">
            <CheckCircleOutlineIcon color="success" fontSize="small" />
            <Typography color="gray" fontStyle="italic" marginLeft={0.5}>
              connected!
            </Typography>
          </Stack>
        );
      case "connecting":
        return (
          <Stack direction="row" alignItems="center">
            <CircularProgress color="warning" size="1.1rem" />
            <Typography color="gray" fontStyle="italic" marginLeft={0.5}>
              connecting...
            </Typography>
          </Stack>
        );
      case "failed":
        return (
          <Stack direction="row" alignItems="center">
            <ErrorOutlineIcon color="error" fontSize="small" />
            <Typography color="gray" fontStyle="italic" marginLeft={0.5}>
              failed!
            </Typography>
          </Stack>
        );
      default:
        break;
    }
  };

  return (
    <Paper elevation={3} sx={{ marginTop: "30px", paddingBottom: "20px" }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ boxSizing: "border-box", paddingX: "20px" }}
      >
        <Typography marginTop={1} variant="h4" component="h1">
          Databases
        </Typography>
        <Tooltip title="Add database">
          <IconButton sx={{ color: "green" }}>
            <AddIcon fontSize="large" cursor="pointer" />
          </IconButton>
        </Tooltip>
      </Stack>
      <List sx={{ height: "200px", overflowY: "scroll", paddingX: "20px" }}>
        {databases.map((database, index) => (
          <ListItem
            sx={{
              padding: "0",
              display: "flex",
              justifyContent: "space-between",
            }}
            key={index}
          >
            <Stack direction="row">
              <ListItemText
                sx={{
                  width: "300px",
                  maxWidth: "300px",
                }}
              >
                {database.name}{" "}
                <Chip
                  sx={{ backgroundColor: getColor(database.type) }}
                  size="small"
                  label={database.type}
                />
              </ListItemText>
              <ListItemText sx={{ marginLeft: "50px" }}>
                {getStatus(database.status)}
              </ListItemText>
            </Stack>
            <Stack
              direction="row"
              justifyContent="flex-end"
              spacing={0.5}
              width={50}
            >
              <ListItemIcon sx={{ minWidth: "20px" }}>
                <Tooltip enterDelay={500} title="Remove database">
                  <ClearIcon cursor="pointer" />
                </Tooltip>
              </ListItemIcon>
            </Stack>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}
