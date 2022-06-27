import { Avatar, Box, Stack, Typography, Container } from "@mui/material";
import React from "react";
import styles from "../styles";
import "./Admin.css";
import GroupIcon from "@mui/icons-material/Group";
import FileCopyIcon from '@mui/icons-material/FileCopy';
import BusinessIcon from '@mui/icons-material/Business';
import StorageIcon from '@mui/icons-material/Storage';
import AdminHeader from "../components/AdminHeader";
import UserList from "../components/UserList";
import ConnectedDBs from "../ConnectedDBs";

export default function Admin() {
  const [connectedUsers, totalDocs, internalDocs, externalDatabases] = [
    3000, 12000000, 4250076, 4,
  ].map((n) => n.toLocaleString("en-US"));

  return (
    <Box sx={{ backgroundColor: "white", minHeight: "100vh", padding: "25px" }}>
      <Container>
      <AdminHeader/>
      <UserList/>
      <ConnectedDBs/>
      </Container>
    </Box>
  );
}
