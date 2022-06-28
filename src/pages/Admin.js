import { Container, Box } from "@mui/material";
import React from "react";
import "./Admin.css";
import AdminHeader from "../components/AdminHeader";
import UserList from "../components/UserList";
import ConnectedDBs from "../components/ConnectedDBs";
import useAuth from "../hooks/useAuth";
import Loading from "../components/Loading";

export default function Admin() {
  const authenticate = useAuth();

  if (!authenticate.success) {
    return <Loading />;
  }

  return (
    <Box sx={{ backgroundColor: "white", minHeight: "100vh", padding: "25px" }}>
      <Container>
        <AdminHeader />
        <UserList />
        <ConnectedDBs />
      </Container>
    </Box>
  );
}
