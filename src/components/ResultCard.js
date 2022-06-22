import React, { useState } from "react";
import Searchable from "./Searchable";
import Summary from "./Summary.js";
import { Button, Backdrop } from "@mui/material";
import styles from "../styles";
import useFetchTags from "../hooks/useFetchTags";
import "./ResultsCard.css"

export default function ResultCard({ result, handleToggleDocumentView }) {
  const handleResultsCardClick = (e) => {
    if (
      ["fields", "tags", "element", "results-card"].includes(e.target.className)
    ) {
      handleToggleDocumentView();
    }
  };

  const [showSummary, setShowSummary] = useState(false);

  const handleCloseSummary = () => {
    setShowSummary(false);
  };

  const handleToggleSummary = () => {
    setShowSummary(!showSummary);
  };

  const tags = useFetchTags(result.tags);

  return (
    <div className="results-card" onClick={handleResultsCardClick}>
      <div className="fields">
        <div className="element">
          <p>{result.fields.title}</p>
        </div>
        <div className="element">
          <Searchable
            type="field"
            id="language"
            value={result.fields.language}
          />
        </div>
        <div className="element">
          <Searchable type="field" id="type" value={result.fields.type} />
        </div>
        <div className="element">
          <Searchable type="field" id="access" value={result.fields.access} />
        </div>
        <div className="element">
          <Searchable type="field" id="date" value={result.fields.date} />
        </div>
        <div className="element">
          <Searchable type="field" id="govlaw" value={result.fields.govlaw} />
        </div>
        <div className="tags">
          {tags.map((tag, key) => (
            <Searchable key={key} type="tag" id={tag.id} value={tag.value} />
          ))}
        </div>
      </div>
      <Button
        variant="contained"
        sx={styles.button}
        onClick={handleToggleSummary}
        className="clickable buttons"
      >
        SUMMARY
      </Button>
      <Backdrop
        className="clickable"
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={showSummary}
        onClick={handleCloseSummary}
      >
        <Summary
          summary=" Excepteur aliquip laboris et incididunt tempor amet aute dolor amet
      culpa et amet. Nostrud culpa veniam minim occaecat culpa officia qui.
      Irure commodo laborum laborum nisi. Occaecat voluptate adipisicing
      consequat duis dolor occaecat dolor ipsum duis. Est dolore labore
      voluptate pariatur eiusmod duis pariatur est aliqua. Consequat aliquip
      anim officia aute dolore veniam minim ullamco. Sint quis fugiat veniam
      eu non. Est nostrud officia ex nostrud. Commodo consectetur exercitation
      adipisicing voluptate."
          title={result.fields.title}
        />
      </Backdrop>
    </div>
  );
}
