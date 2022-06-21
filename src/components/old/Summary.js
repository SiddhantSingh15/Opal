import { Button, Card, Typography, Box } from "@mui/material";
import React from "react";
import styles from "../styles";

export default function Summary({ title, summary, display }) {
  return (
    <Card
      sx={{
        padding: 2,
        width: "450px",
        height: "300px",
      }}
    >
      <Typography variant="h6" component="h1">
        {title}
      </Typography>
      <Typography marginTop={-1} variant="subtitle" component="p">
        <i>Summary</i>
      </Typography>
      <Box marginTop={2} sx={{ height: "200px", overflowY: "scroll" }}>
        <Typography variant="body1" component="p">
          {summary}
        </Typography>
      </Box>
      <Button variant="contained" sx={styles.button}>
        READ FULL
      </Button>
    </Card>
  );
}
