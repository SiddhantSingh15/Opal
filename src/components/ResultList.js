import {React,useState} from "react";
import ResultCard from "./ResultCard";
import Loading from "./Loading";
import useFetchResults from "../hooks/useFetchResults";
import "./ResultList.css"


export default function ResultList({handleToggleDocumentView,setCurrentDocLink}) {
  const results = useFetchResults();
  const [sortFocus,setSortFocus] = useState(null);

  if (!results || results.length === 0) return <Loading />;

  const handleSort = () => {
    alert("Suprise you've been gnomed this isn't implimented yet")
  }

  return (
    <div className="table">
      <div className="title">
        <div className="docTitle">
          <div
            onClick={handleSort}
            className="title-element">Title</div>
        </div>
        <div
          onClick={handleSort} 
          className="title-element">Language</div>
        <div
          onClick={handleSort}  
          className="title-element">Type</div>
        <div
          onClick={handleSort}  
          className="title-element">Access</div>
        <div
          onClick={handleSort}  
          className="title-element">Date</div>
        <div
          onClick={handleSort}  
          className="title-element">Gov Law</div>
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
