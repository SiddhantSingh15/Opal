import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Paper,
  Stack,
  Tooltip,
  Typography,
  IconButton,
} from "@mui/material";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import AuthForm from "./AuthForm";

export default function UserList() {
  const [addUser, setAddUser] = useState(false);

  const users = [
    { email: "paolo.varain@ubs.com", type: "Junior Lawyer" },
    { email: "mark.spencer@ubs.com", type: "Intern" },
    { email: "carl.cox@ubs.com", type: "Senior Associate" },
    { email: "amelie.lens@ubs.com", type: "Lawyer" },
    { email: "charlotte.dewitte@ubs.com", type: "Lawyer" },
    { email: "paula.temple@ubs.com", type: "Lawyer" },
    { email: "jeff.mills@ubs.com", type: "Lawyer" },
    { email: "william.chegg@ubs.com", type: "Admin" },
    { email: "rufus.dusol@ubs.com", type: "Senior Associate" },
    { email: "jan.blomqvist@ubs.com", type: "Intern" },
  ];

  return (
    <Paper elevation={3} sx={{ marginTop: "30px", paddingBottom: "20px" }}>
      {/* <Login open={true} close={() => alert("close")}/> */}
      <AuthForm
        open={addUser}
        handleClose={() => setAddUser(false)}
        sx={{ zIndex: 1 }}
        signup
      />
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ boxSizing: "border-box", paddingX: "20px" }}
      >
        <Typography marginTop={1} variant="h4" component="h1">
          Users
        </Typography>
        <Tooltip title="Add user">
          <IconButton sx={{ color: "green" }} onClick={() => setAddUser(true)}>
            <AddIcon fontSize="large" cursor="pointer" />
          </IconButton>
        </Tooltip>
      </Stack>
      <List sx={{ height: "200px", overflowY: "scroll", paddingX: "20px" }}>
        {users.map((user, index) => (
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
                sx={{ maxWidth: "300px", width: "300px" }}
                primary={user.email}
              />
              <ListItemText
                sx={{ marginLeft: "50px", color: "gray", fontStyle: "italic" }}
                primary={user.type}
              />
            </Stack>
            <Stack
              direction="row"
              justifyContent="flex-end"
              spacing={0.5}
              width={50}
            >
              <ListItemIcon sx={{ minWidth: "20px" }}>
                <Tooltip enterDelay={500} title="Upgrade user">
                  <MilitaryTechIcon cursor="pointer" />
                </Tooltip>
              </ListItemIcon>
              <ListItemIcon sx={{ minWidth: "20px" }}>
                <Tooltip enterDelay={500} title="Remove user">
                  <PersonRemoveIcon cursor="pointer" />
                </Tooltip>
              </ListItemIcon>
            </Stack>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}
