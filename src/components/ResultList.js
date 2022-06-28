import React, { useState } from "react";
import ResultCard from "./ResultCard";
import Loading from "./Loading";
import useFetchResults from "../hooks/useFetchResults";
import { Stack, Typography } from "@mui/material";
import SaveTag from "./SaveTag";
import axios from "axios";
import config from "../config";

export default function ResultList({
  handleToggleDocumentView,
  setCurrentDocLink,
}) {
  const results = useFetchResults();
  const [loading, setLoading] = useState(false);

  const username = "saiofdgnos";
  const password = "saiofdgnos";

  const saveTag = async (tagName) => {
    setLoading(true);
    const documentIDs = results.map((doc) => doc.id);
    axios
      .post(
        `${config.BACKEND_URI}/tags/create_tag`,
        {
          tag_name: tagName,
          result_ids: documentIDs,
          search: null,
        },
        { headers: { username, password } }
      )
      .then((res) => {
        window.location = "/";
      })
      .catch((e) => {
        console.log(e);
        window.location = "/";
      });
  };

  if (!results) return <Loading />;

  if (results.length === 0)
    return (
      <Typography textAlign="center" marginTop={30} variant="h2">
        No results!
      </Typography>
    );

  return (
    <Stack>
      <SaveTag saveTag={saveTag} load={loading} />
      <div className="table">
        <div className="title">
          <div className="docTitle">
            <div className="element">Title</div>
          </div>
          <div className="element">Language</div>
          <div className="element">Type</div>
          <div className="element">Access</div>
          <div className="element">Date</div>
          <div className="element">Gov Law</div>
        </div>
        {results.map((result, key) => {
          return (
            <ResultCard
              key={key}
              result={result}
              handleToggleDocumentView={handleToggleDocumentView}
              setCurrentDocLink={setCurrentDocLink}
            />
          );
        })}
      </div>
    </Stack>
  );
}
