import React from "react";
import "./Searchable.css";
import { ReactComponent as SearchIcon } from "../assets/magnifier.svg";
import { ReactComponent as TagIcon } from "../assets/tag.svg";
import { ReactComponent as GovLawIcon } from "../assets/govlaw.svg";
import { ReactComponent as DocTypeIcon } from "../assets/doc.svg";
import { ReactComponent as LanguageIcon } from "../assets/language.svg";
import { ReactComponent as ClassificationIcon } from "../assets/lock.svg";
import { ReactComponent as CircleIcon} from "../assets/circle.svg";
import TitleIcon from "@mui/icons-material/Title";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useSearchParams } from "react-router-dom";
import querySearch from "../utils/querySearch";

/** Return a SEARCH PARAMETER (something we can search by): TAG, FIELD
 * @param {bool} input whether the tag is an input button (if clicked adds the
 * parameter). In that case on click we add the parameter, otherwise we remove
 * it.
 */
export default function Searchable({ type, id, value, input, invisible}) {

  var colors = ["#0a2342ff","#db2b39ff","#f3a712ff","#226F54","#DB2763","#E55934","#6E2594"];
  const getColor = (val) => {
    return colors[Math.abs(val) % (colors.length)];
  } 
  
  const hashCode = (str) => {
    let hash = 0;
    for (let i = 0, len = str.length; i < len; i++) {
        let chr = str.charCodeAt(i);
        hash = (hash << 5) - hash + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
}


  const [searchParams, setSearchParams] = useSearchParams();

  const renderTagIcon = () => {
    switch (type) {
      case "tag":
        return <TagIcon className="icon" fill="white"/>;
      case "field":
        switch (id) {
          case "title":
            return <SearchIcon className="icon" fill="white" />;
          case "govlaw":
            return <GovLawIcon className="icon" fill="white" />;
          case "type":
            return <DocTypeIcon className="icon" fill="white" />;
          case "language":
            return <LanguageIcon className="icon" fill="white" />;
          case "access":
            return <ClassificationIcon className="icon" fill="white" />;
          case "date":
            return <CalendarMonthIcon className="icon" fill="white" />;
          default:
            return <TagIcon className="icon" fill="white" />;
        }
      case "search":
        return <SearchIcon className="icon" fill="white" />;
      default:
        return <React.Fragment />;
    }
  };

  const handleClick = () => {
    if (input) {
      querySearch.addSearchParam(
        searchParams,
        setSearchParams,
        type,
        id,
        value
      );
    } else {
      querySearch.removeSearchParam(
        searchParams,
        setSearchParams,
        type,
        id,
        value
      );
    }
  };

  const RenderValue = (value) => {
    if (id === "date") {
      return (
        value.substring(0, 4) +
        "/" +
        value.substring(4, 6) +
        "/" +
        value.substring(6, 8)
      );
    } else {
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
  };

  const getTagColor = () => {
    if (type === "tag"){
      return getColor(hashCode(value))
    } else {
      return "#202124ff"
    }
    
  }

  const body = invisible ? (
    <div className="invisible-tag" onClick={handleClick}>
      {renderTagIcon()}
      <p>{RenderValue(value)}</p>
    </div>
  ) : (
    <div className="tag" onClick={handleClick} style={{background:getTagColor()}}>
      {renderTagIcon()}
      <p>{RenderValue(value)}</p>
    </div>
  );

  return <React.Fragment>{body}</React.Fragment>;
}
