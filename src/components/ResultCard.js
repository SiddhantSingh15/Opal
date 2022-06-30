import React, { useState } from "react";
import Searchable from "./Searchable";
import Summary from "./Summary.js";
import { Button, Backdrop, Snackbar } from "@mui/material";
import useFetchTags from "../hooks/useFetchTags";
import "./ResultsCard.css";
import RequestAccess from "./RequestAccess";
import authLogic from "../utils/authLogic";
import useAuth from "../hooks/useAuth";
import {ReactComponent as ArrowDown} from "../assets/arrowdown.svg";
import {ReactComponent as ArrowUp} from "../assets/arrowup.svg";

export default function ResultCard({
  result,
  handleToggleDocumentView,
  setCurrentDocLink,
}) {
  const authenticate = useAuth();

  const handleResultsCardClick = (e) => {

    if (
      ["expandIcon","titleText", "fields", "tags", "element", "results-card"].includes(
        e.target.className
      )
    ) {
      setIsExpanded(!isExpanded);
    }
  };

  const [showSummary, setShowSummary] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

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
  const email = authLogic.getCredentials()[0];

  // Checks if we are authorised to view the document
  const userAuthorised = () => {
    return (
      result.fields.access === "public" ||
      authenticate.admin ||
      result.fields.permitted_viewers.includes(email)
    );
  };

  /* Based on permission returns the realtive buttons. */
  const getButtons = () => {
    if (userAuthorised())
      return (
        <div className="pop-up">
          <div className="card-buttons">
            <button
              variant="contained"
              onClick={() => {
                handleToggleDocumentView();
                setCurrentDocLink(result.fields.pdf_url);
              }}
              className="clickable buttons"
            >
              Preview
            </button>

            <button
              variant="contained"
              onClick={handleToggleSummary}
              className="clickable buttons"
            >
              Summary
            </button>
          </div>
        </div>
      );

    if (result.fields.requested_access.includes(email))
      return (
        <div className="pop-up">
          <div className="card-buttons">
            <p style={{ padding: "10px", color: "orange" }}>
              Request pending...
            </p>
          </div>
        </div>
      );

    return <RequestAccess document_id={result.id} />;
  };

  return (
    <div className="results-card-all">
      {isExpanded && getButtons()}
      <div className="results-card" onClick={handleResultsCardClick}>
        <div className="fields">
          <div className="docTitle">
            <div className="element">
              <p className="titleText">{cutText(result.fields.title)}</p>
            </div>
          </div>
          <div className="element">
            <Searchable
              input
              type="field"
              id="language"
              value={result.fields.language}
              invisible={true}
            />
          </div>
          <div className="element">
            <Searchable
              input
              type="field"
              id="type"
              value={result.fields.type}
              invisible={true}
            />
          </div>
          <div className="element">
            <Searchable
              input
              type="field"
              id="access"
              value={result.fields.access}
              invisible={true}
            />
          </div>
          <div className="element">
            <Searchable
              input
              type="field"
              id="date"
              value={result.fields.date}
              invisible={true}
            />
          </div>
          <div className="element">
          {result.fields.governing_law[1] && <Searchable
                  input
                  type="field"
                  id="govlaw"
                  value={result.fields.governing_law[1]}
                  invisible={true}
                />}
            {/* <div className="multi-param">
              {result.fields.governing_law.map((param, index) => (
                <Searchable
                  input
                  key={index}
                  type="field"
                  id="govlaw"
                  value={param}
                  invisible={true}
                />
              ))}
            </div> */}
          </div>
          {!isExpanded && <ArrowDown className="expandIcon" onClick={()=> setIsExpanded(!isExpanded)}/>}
          {isExpanded && <ArrowUp className="expandIcon"  onClick={()=> setIsExpanded(!isExpanded)}/>}
          {isExpanded && (
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
          )}
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
    </div>
  );
}
