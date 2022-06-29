import React, { useState } from "react";
import DocumentView from "../components/DocumentView";
import ResultList from "../components/ResultList";
import SearchBox from "../components/SearchBox";
import SearchParams from "../components/SearchParams";
import "./Results.css";
import useAuth from "../hooks/useAuth";

export default function Results() {
  const [viewingDoc, setViewingDoc] = useState(false);
  const [currentDocLink, setCurrentDocLink] = useState("");

  const authenticate = useAuth();

  if (
    Object.keys(authenticate).includes("success") &&
    authenticate.success === false
  ) {
    window.location = "/";
  }

  const handleToggleDocumentView = () => {
    setViewingDoc(!viewingDoc);
  };

  return (
    <div className="results">
      {/* Popup for previewing the document */}
      <DocumentView
        isOpen={viewingDoc}
        toggleModal={handleToggleDocumentView}
        currentDocument={currentDocLink}
      />
      <div className="info-bar">
        <div className="search-box">
          <SearchBox />
        </div>
        <div className="params">
          <SearchParams />
        </div>
      </div>
      <ResultList
        handleToggleDocumentView={handleToggleDocumentView}
        setCurrentDocLink={setCurrentDocLink}
      />
    </div>
  );
}
