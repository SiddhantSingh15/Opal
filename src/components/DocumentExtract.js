import { Button, Card, Typography, Box } from "@mui/material";
import React from "react";
import styles from "../styles";

export default function DocumentExtract(props) {
  return (
    <Card sx={{ padding: 2, width: "450px", height: "300px" }}>
      <Box sx={styles.flexEnd} marginBottom={2}>
        <Typography variant="h6" component="h1">
          Extract of document no {props.doc}
        </Typography>
        <Button sx={styles.buttonGradient} variant="contained">
          READ FULL
        </Button>
      </Box>
      <Typography variant="body1" component="p">
        Excepteur aliquip laboris et incididunt tempor amet aute dolor amet
        culpa et amet. Nostrud culpa veniam minim occaecat culpa officia qui.
        Irure commodo laborum laborum nisi. Occaecat voluptate adipisicing
        consequat duis dolor occaecat dolor ipsum duis. Est dolore labore
        voluptate pariatur eiusmod duis pariatur est aliqua. Consequat aliquip
        anim officia aute dolore veniam minim ullamco. Sint quis fugiat veniam
        eu non. Est nostrud officia ex nostrud. Commodo consectetur exercitation
        adipisicing voluptate.
      </Typography>
    </Card>
  );
}
