import React, { useState } from "react";
import Searchable from "./Searchable";
import Summary from "./Summary.js";
import { Button, Backdrop } from "@mui/material";
import useFetchTags from "../hooks/useFetchTags";
import "./ResultsCard.css";

export default function ResultCard({ result, handleToggleDocumentView, setCurrentDocLink}) {
  const handleResultsCardClick = (e) => {
    if (
      ["fields", "tags", "element", "results-card"].includes(e.target.className)
    ) {
      handleToggleDocumentView();
      setCurrentDocLink(result.fields.pdf_url);
    }
  };

  const [showSummary, setShowSummary] = useState(false);

  const handleCloseSummary = () => {
    setShowSummary(false);
  };

  const handleToggleSummary = () => {
    setShowSummary(!showSummary);
  };

  const cutText = (text) => {
    return text
      .substring(0, 150)
      .concat(result.fields.title.length > 150 ? "..." : "");
  };

  // Fetches tags from tag ids
  const tags = useFetchTags(result.tags);

  return (
    <div className="results-card" onClick={handleResultsCardClick}>
      <div className="fields">
        <div className="docTitle">
          <div className="element">
            <p>{cutText(result.fields.title).toUpperCase()}</p>
          </div>
        </div>
        <div className="element">
          <Searchable
            input
            type="field"
            id="language"
            value={result.fields.language}
          />
        </div>
        <div className="element">
          <Searchable input type="field" id="type" value={result.fields.type} />
        </div>
        <div className="element">
          <Searchable
            input
            type="field"
            id="access"
            value={result.fields.access}
          />
        </div>
        <div className="element">
          <Searchable input type="field" id="date" value={result.fields.date} />
        </div>
        <div className="element">
          <Searchable
            input
            type="field"
            id="govlaw"
            value={result.fields.govlaw}
          />
        </div>
        <div className="tags">
          {tags.map((tag, key) => (
            <Searchable
              input
              key={key}
              type="tag"
              id={tag.id}
              value={tag.value}
            />
          ))}
        </div>
      </div>
      <div className="buttons">
      <Button
        variant="contained"
        onClick={() => {handleToggleDocumentView();
                        setCurrentDocLink(result.fields.pdf_url);}}
        className="clickable buttons"
      >
        Preview
      </Button>
      <Button
        variant="contained"
        onClick={handleToggleSummary}
        className="clickable buttons"
      >
        Summary
      </Button>
      </div>
      <Backdrop
        className="clickable"
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={showSummary}
        onClick={handleCloseSummary}
      >
        <Summary
          summary={result.fields.summary}
          title={result.fields.title}
        />
      </Backdrop>
    </div>
  );
}
