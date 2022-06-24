import React from "react";
import ResultCard from "./ResultCard";
import Loading from "./Loading";
import useFetchResults from "../hooks/useFetchResults";
import { Stack } from "@mui/material";
import SaveTag from "./SaveTag";

export default function ResultList({
  handleToggleDocumentView,
  setCurrentDocLink,
}) {
  const results = useFetchResults();

  if (!results || results.length === 0) return <Loading />;

  const saveTag = (tagName) => {
    const documentIDs = results.map((doc) => doc.id);
    console.log(documentIDs);
    alert(tagName);
  };

  return (
    <Stack>
      <SaveTag saveTag={saveTag} />
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
