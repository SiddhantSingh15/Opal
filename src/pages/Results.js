import { Container, Typography, Box, Stack, Chip } from "@mui/material";
import React from "react";
import Result from "../components/Result";
import styles from "../styles";
import "./Results.css";

function Results() {
  /* Fake data ([1..20]) */
  const results = Array.from(Array(20).keys());

  return (
    <div className="results">
      <Container>
        <Box paddingTop={5} sx={styles.flexStart}>
          <Typography variant="h3" component="h1">
            Results for:
          </Typography>
          <Stack marginLeft={10} direction="row" spacing={1}>
            <Chip label="tag1" />
            <Chip label="tag1" />
            <Chip label="tag1" />
          </Stack>
        </Box>
        <Stack spacing={2}>
          {results.map((result, index) => (
            <Result key={index} result={result} />
          ))}
        </Stack>
      </Container>
    </div>
  );
}

export default Results;
