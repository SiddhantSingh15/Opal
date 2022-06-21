import React from "react";
import "./Tag.css";
import { ReactComponent as SearchIcon } from "../assets/magnifier.svg";
import { ReactComponent as TagIcon } from "../assets/tag.svg";
import { ReactComponent as GovLawIcon } from "../assets/govlaw.svg";
import { ReactComponent as DocTypeIcon } from "../assets/doc.svg";
import { ReactComponent as LanguageIcon } from "../assets/language.svg";
import { ReactComponent as ClassificationIcon } from "../assets/lock.svg";

/** Return a SEARCH PARAMETER (something we can search by): TAG, FIELD
 */
export default function Searchable({ param, handleClick }) {
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

  return (
    <React.Fragment>
      {param.include !== true}
      <div className="tag" onClick={handleClick}>
        {renderTagIcon()}
        {param.include === true ? <p>{param.name}</p> : <s>{param.name}</s>}
      </div>
    </React.Fragment>
  );
}
