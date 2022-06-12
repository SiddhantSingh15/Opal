import { Container, Typography, Box, Stack, Chip } from "@mui/material";
import React from "react";
import Result from "../components/Result";
import styles from "../styles";
import "./Results.css";
import Tag from "../components/Tag";

const Results = ({app}) => {

  return (
   <div className="results-body">
      {app.state.searchParams.map(
        (param,key) => {
          return (
            <React.Fragment key = {key}>
              <Tag
                tagData={param}
                />
            </React.Fragment>
          )
        }
      )}
   </div>
  );
}

export default Results;
