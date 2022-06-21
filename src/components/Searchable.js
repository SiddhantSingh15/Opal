import React from "react";
import "./Searchable.css";
import { ReactComponent as SearchIcon } from "../assets/magnifier.svg";
import { ReactComponent as TagIcon } from "../assets/tag.svg";
import { ReactComponent as GovLawIcon } from "../assets/govlaw.svg";
import { ReactComponent as DocTypeIcon } from "../assets/doc.svg";
import { ReactComponent as LanguageIcon } from "../assets/language.svg";
import { ReactComponent as ClassificationIcon } from "../assets/lock.svg";

/** Return a SEARCH PARAMETER (something we can search by): TAG, FIELD
 * @param {bool} active whether we are currently searching by this parameter
 */
export default function Searchable({ param, handleClick, active }) {
  const renderTagIcon = () => {
    switch (param.type) {
      case "tag":
      case "field":
        switch (param.obj.key) {
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

  const body = active ? (
    <div className="tag active">
      <p>{param.name}</p>
    </div>
  ) : (
    <div className="tag" onClick={handleClick}>
      {renderTagIcon()}
      {param.include === true ? <p>{param.name}</p> : <s>{param.name}</s>}
    </div>
  );

  return (
    <React.Fragment>
      {param.include !== true}
      {body}
    </React.Fragment>
  );
}
