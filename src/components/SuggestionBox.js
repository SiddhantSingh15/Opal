import React from "react";
import Searchable from "./Searchable";
import { ReactComponent as CloseIcon } from "../assets/close.svg";
import { ReactComponent as DotDotDot } from "../assets/dotdotdot.svg";
import querySearch from "../utils/querySearch";
import { useSearchParams } from "react-router-dom";
// TODO: implement tag exclude functionality

export default function SuggestionBox({ tagSuggestions }) {
  const TAGS_DISPLAYED = 9;
  // TODO: get tag suggestions that have not yet been searched

  const queryParams = useSearchParams()[0];

  /* Tag suggestions are already filtered */
  const suggestions = tagSuggestions.slice(0, TAGS_DISPLAYED);

  if (tagSuggestions.length === 0) return null;

  return (
    <div className="suggestions">
      {/* Display k number of most relevant tags */}
      <div className="tags-box">
        {suggestions.map((tag, key) => {
          return (
            <div key={key} className="tag-option">
              <Searchable
                input
                type="tag"
                key={key}
                id={tag.id}
                value={tag.name}
              />

              {/* <CloseIcon
                  className="icon"
                  onClick={() => {
                    const searchParam = structuredClone(tag);
                    searchParam.include = false;
                    this.props.app.handleAddSearchParams([searchParam]);
                    this.handleClear();
                  }}
                /> */}
            </div>
          );
        })}
      </div>
      {/* Show the number of tags hidden */}
      {suggestions.length === TAGS_DISPLAYED && (
        <DotDotDot className="dotdotdot" />
      )}
    </div>
  );
}
