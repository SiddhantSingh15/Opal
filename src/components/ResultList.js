import { React, useState, useEffect } from "react";
import ResultCard from "./ResultCard";
import Loading from "./Loading";
import useFetchResults from "../hooks/useFetchResults";
import "./ResultList.css";
import { Stack, Typography } from "@mui/material";
import TitleSort from "./TitleSort.js";
import SaveTag from "./SaveTag";
import axios from "axios";
import config from "../config";
import authLogic from "../utils/authLogic";

export default function ResultList({
  handleToggleDocumentView,
  setCurrentDocLink,
}) {
  const [documents, setDocuments] = useFetchResults();
  const [loading, setLoading] = useState(false);
  const [sortFocus, setSortFocus] = useState(null);
  const [sortDirection, setSortDirection] = useState("none");

  const compare = (docA, docB) => {
    const cleanedDocA = docA.trim();
    const cleanedDocB = docB.trim();
    if (sortFocus === "Date") {
      return parseInt(cleanedDocA) - parseInt(cleanedDocB);
    } else {
      return cleanedDocA < cleanedDocB ? -1 : cleanedDocA > cleanedDocB ? 1 : 0;
    }
  };

  const sortResults = (paramType) => {
    if (sortDirection === "up") {
      return [...documents].sort((docA, docB) =>
        compare(docA.fields[paramType], docB.fields[paramType])
      );
    } else if (sortDirection === "down") {
      return [...documents].sort((docA, docB) =>
        compare(docB.fields[paramType], docA.fields[paramType])
      );
    } else {
      return [...documents];
    }
  };
  useEffect(() => {
    switch (sortFocus) {
      case "Title":
        var temp = sortResults("title");
        setDocuments(temp);
        break;
      case "Language":
        setDocuments(sortResults("language"));
        break;
      case "Type":
        setDocuments(sortResults("type"));
        break;
      case "Access":
        setDocuments(sortResults("access"));
        break;
      case "Date":
        setDocuments(sortResults("date"));
        break;
      case "Gov Law":
        setDocuments(sortResults("governing_law"));
        break;
      default:
        break;
    }
  }, [sortFocus, sortDirection]);

  const saveTag = async (tagName) => {
    setLoading(true);
    const headers = authLogic.getHeaders();
    const documentIDs = documents.map((doc) => doc.id);
    axios
      .post(
        `${config.BACKEND_URI}/tags/create_tag`,
        {
          tag_name: tagName,
          result_ids: documentIDs,
          search: null,
        },
        { headers }
      )
      .then((res) => {
        window.location = "/";
      })
      .catch((e) => {
        console.log(e);
        window.location = "/";
      });
  };

  if (!documents) return <Loading />;

  if (documents.length === 0) {
    return (
      <Typography textAlign="center" marginTop={30} variant="h2">
        No results!
      </Typography>
    );
  }

  const handleTitleClick = (name) => {
    var newSortDirection = "";
    if (name == sortFocus) {
      switch (sortDirection) {
        case "none":
          newSortDirection = "down";
          break;
        case "down":
          newSortDirection = "up";
          break;
        case "up":
          newSortDirection = "down";
          break;
      }
    } else {
      setSortFocus(name);
      newSortDirection = "up";
    }
    setSortDirection(newSortDirection);
  };

  return (
    <div>
      <SaveTag saveTag={saveTag} load={loading} />
      <Stack>
        <div className="table">
          <div className="title">
            <div className="docTitle">
              <TitleSort
                name="Title"
                handleClick={handleTitleClick}
                sortFocus={sortFocus}
                sortDirection={sortDirection}
              />
            </div>
            <TitleSort
              name="Language"
              handleClick={handleTitleClick}
              sortFocus={sortFocus}
              sortDirection={sortDirection}
            />
            <TitleSort
              name="Type"
              handleClick={handleTitleClick}
              sortFocus={sortFocus}
              sortDirection={sortDirection}
            />
            <TitleSort
              name="Access"
              handleClick={handleTitleClick}
              sortFocus={sortFocus}
              sortDirection={sortDirection}
            />
            <TitleSort
              name="Date"
              handleClick={handleTitleClick}
              sortFocus={sortFocus}
              sortDirection={sortDirection}
            />
            <TitleSort
              name="Gov Law"
              handleClick={handleTitleClick}
              sortFocus={sortFocus}
              sortDirection={sortDirection}
            />
          </div>
          {documents.map((result, key) => {
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
    </div>
  );
}
