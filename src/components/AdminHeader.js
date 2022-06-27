import { Avatar, Box, Stack, Typography } from "@mui/material";
import React from "react";
import styles from "../styles";
import GroupIcon from "@mui/icons-material/Group";
import FileCopyIcon from '@mui/icons-material/FileCopy';
import BusinessIcon from '@mui/icons-material/Business';
import StorageIcon from '@mui/icons-material/Storage';

export default function AdminHeader() {
  const [connectedUsers, totalDocs, internalDocs, externalDatabases] = [
    3000, 12000000, 4250076, 4,
  ].map((n) => n.toLocaleString("en-US"));

  return (
      <Box>
        <Box sx={{ ...styles.flexStart, height: "150px" }}>
          <Avatar
            sx={{
              boxShadow: "rgba(149, 157, 165, 0.2) 0px 0px 8px",
              boxSizing: "border-box",
              padding: "10px",
              width: "auto",
              height: "100%",
            }}
            variant="rounded"
            alt="company logo"
            src="https://upload.wikimedia.org/wikipedia/it/thumb/f/fa/UBS_Logo_SVG-1-.svg/535px-UBS_Logo_SVG-1-.svg.png?20110619141847"
          />
          <Stack
            marginLeft={5}
            spacing={1}
            sx={{  height: "100%" }}
          >
            <Typography variant="h5" comxonent="h1">
              UBS | Legal department
            </Typography>
            <Stack>
              <Box sx={styles.flexStart} variant="body2" comxonent="p">
                <GroupIcon fontSize="small"/>
                <Typography><span className="profile-value">{connectedUsers}</span>{" "}
                connected users</Typography>
              </Box>
              <Box sx={styles.flexStart} variant="body2" comxonent="p">
                <FileCopyIcon fontSize="small"/>
                <Typography><span className="profile-value">{totalDocs}</span>{" "} total
                documents</Typography>
              </Box>
              <Box sx={styles.flexStart} variant="body2" comxonent="p">
                <BusinessIcon fontSize="small"/>
                <Typography><span className="profile-value">{internalDocs}</span>{" "} internal
                documents</Typography>
              </Box>
              <Box sx={styles.flexStart} variant="body2" comxonent="p">
                <StorageIcon fontSize="small"/>
                <Typography><span className="profile-value">{externalDatabases}</span>{" "}
                external databases</Typography>
              </Box>
            </Stack>
          </Stack>
        </Box>
    </Box>
  );
}
