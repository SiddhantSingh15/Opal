import {React,useState} from "react";
import ResultCard from "./ResultCard";
import Loading from "./Loading";
import useFetchResults from "../hooks/useFetchResults";
import "./ResultList.css"
import {ReactComponent as UpCaret} from "../assets/upcaret.svg"
import {ReactComponent as DownCaret} from "../assets/downcaret.svg"
import TitleSort from "./TitleSort.js"


export default function ResultList({handleToggleDocumentView,setCurrentDocLink}) {
  const results = useFetchResults();
  const [sortFocus,setSortFocus] = useState(null);
  const [sortDirection,setSortDirection] = useState("none");

  if (!results || results.length === 0) return <Loading />;

  const handleSort = (name) => {
    if (name == sortFocus) {
      setSortDirection("up")
    } else {
      setSortFocus(name);
      setSortDirection("down")
    }

  }

  return (
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
  );
}
