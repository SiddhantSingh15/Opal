import React from "react";
import Searchable from "./Searchable";
import { ReactComponent as DotDotDot } from "../assets/dotdotdot.svg";
// TODO: implement tag exclude functionality

export default function SuggestionBox({
  tagSuggestions,
  fieldSuggestions,
  inputValue,
  showSuggestions
}) {
  const TAGS_DISPLAYED = 9;

  /* Tag suggestions are already filtered */
  const suggestions = tagSuggestions.slice(0, TAGS_DISPLAYED);

  if (!showSuggestions) return null;

  return (
    <div className="suggestions">
      {/* Display k number of most relevant tags */}
      <div className="text-option">
        <div className="text-option-tag">
          <Searchable input type="search" id={null} value={inputValue} />
        </div>
      </div>
      <div className="tags-box">
        {fieldSuggestions.map((field, key) => (
          <div key={key} className="tag-option">
            <Searchable input type="field" id={field.id} value={field.value} />
          </div>
        ))}
        {suggestions.map((tag, key) => {
          return (
            <div key={key} className="tag-option">
              <Searchable
                input
                type="tag"
                key={key}
                id={tag.id}
                value={tag.value}
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
