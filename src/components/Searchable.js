import React from "react";
import "./Searchable.css";
import { ReactComponent as SearchIcon } from "../assets/magnifier.svg";
import { ReactComponent as TagIcon } from "../assets/tag.svg";
import { ReactComponent as GovLawIcon } from "../assets/govlaw.svg";
import { ReactComponent as DocTypeIcon } from "../assets/doc.svg";
import { ReactComponent as LanguageIcon } from "../assets/language.svg";
import { ReactComponent as ClassificationIcon } from "../assets/lock.svg";
import { useSearchParams } from "react-router-dom";
import addSearchParam from "../utils/addSearchParam";

/** Return a SEARCH PARAMETER (something we can search by): TAG, FIELD
 * @param {bool} active whether we are currently searching by this parameter
 */
export default function Searchable({ type, id, value }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const renderTagIcon = () => {
    switch (type) {
      case "tag":
      case "field":
        switch (id) {
          case "govlaw":
            return <GovLawIcon className="icon" fill="white" />;
          case "type":
            return <DocTypeIcon className="icon" fill="white" />;
          case "language":
            return <LanguageIcon className="icon" fill="white" />;
          case "access":
            return <ClassificationIcon className="icon" fill="white" />;
          default:
            return <TagIcon className="icon" fill="white" />;
        }
      case "search":
        return <SearchIcon className="icon" fill="white" />;
      default:
        return <React.Fragment />;
    }
  };

  const addParam = () => {
    addSearchParam(searchParams, setSearchParams, type, id, value);
    window.location = window.location.href;
  };

  const active = false;

  const body = active ? (
    <div className="tag active">
      <p>{value}</p>
    </div>
  ) : (
    <div className="tag" onClick={addParam}>
      {renderTagIcon()}
      <p>{value}</p>
    </div>
  );

  return <React.Fragment>{body}</React.Fragment>;
}
