import {React,useState} from "react";
import ResultCard from "./ResultCard";
import Loading from "./Loading";
import useFetchResults from "../hooks/useFetchResults";
import "./ResultList.css"
import { Stack, Typography } from "@mui/material";
import {ReactComponent as UpCaret} from "../assets/upcaret.svg"
import {ReactComponent as DownCaret} from "../assets/downcaret.svg"
import TitleSort from "./TitleSort.js"
import SaveTag from "./SaveTag";
import axios from "axios";
import config from "../config";
import { useEffect } from "react";


export default function ResultList({
  handleToggleDocumentView,
  setCurrentDocLink,
}) {
  const [documents,setDocuments] = useFetchResults();
  const [loading, setLoading] = useState(false);
  const [sortFocus,setSortFocus] = useState(null);
  const [sortDirection,setSortDirection] = useState("none");

  const username = "saiofdgnos";
  const password = "saiofdgnos";

  useEffect(() => {
    switch(sortFocus) {
      case "Title":
        //
        break;
      case "Language":
        //
        break;
      case "Type":
        //
        break;     
      case "Access":
        //
        break;
      case "Date":
        alert("boo")
        // setDocuments(documents.sort((docA,docB) => docA.fields.date>docB.fields.date))
        break; 
      case "Gov Law":
        // 
        break;
    }
  }
  ,[sortFocus,sortDirection]);

  const saveTag = async (tagName) => {
    setLoading(true);
    const documentIDs = documents.map((doc) => doc.id);
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

  if (!documents) return <Loading />;

  if (documents.length === 0)
    return (
      <Typography textAlign="center" marginTop={30} variant="h2">
        No results!
      </Typography>
    );

  const handleSort = (name) => {
    const newSortDirection = "";
    if (name == sortFocus) {
      switch (sortDirection) {
        case "none":
          newSortDirection = "down";
          break; 
        case "down":
          newSortDirection = "up";
          break; 
        case "up":
          newSortDirection = "none";
          break;       
      }
    } else {
      setSortFocus(name);
      setSortDirection(newSortDirection)
    }
  }

  return (
    <Stack>
      <div className="table">
        <div className="title">
          <div className="docTitle">
            <TitleSort
            name="Title"
            handleSort={handleSort}
            sortFocus={sortFocus}
            sortDirection={sortDirection}/>
          </div>
          <TitleSort
            name="Language"
            handleSort={handleSort}
            sortFocus={sortFocus}
            sortDirection={sortDirection}/>
          <TitleSort
            name="Type"
            handleSort={handleSort}
            sortFocus={sortFocus}
            sortDirection={sortDirection}/>
          <TitleSort
            name="Access"
            handleSort={handleSort}
            sortFocus={sortFocus}
            sortDirection={sortDirection}/>
          <TitleSort
            name="Date"
            handleSort={handleSort}
            sortFocus={sortFocus}
            sortDirection={sortDirection}/>
          <TitleSort
            name="Gov Law"
            handleSort={handleSort}
            sortFocus={sortFocus}
            sortDirection={sortDirection}/>
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
  );
}
