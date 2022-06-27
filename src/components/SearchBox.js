import React, { useState } from "react";
import { ReactComponent as SearchIcon } from "../assets/magnifier.svg";
import { ReactComponent as CloseIcon } from "../assets/close.svg";
import { useNavigate, useSearchParams } from "react-router-dom";
import querySearch from "../utils/querySearch";
import config from "../config";
import axios from "axios";
import SuggestionBox from "./SuggestionBox";
import { useDispatch } from "react-redux";
import "./SearchBox.css";
import useAuth from "../hooks/useAuth";

export default function SearchBox() {
  const authenticate = useAuth();

  const navigate = useNavigate();
  const [param, setParam] = useSearchParams();

  const [inputValue, setInputValue] = useState("");
  const [tagSuggestions, setTagSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  /* Clear input value */
  const handleClear = () => {setInputValue("");setShowSuggestions(false)};

  /* Checks if the search is valid and with results. */
  const validSearch = () => tagSuggestions.length > 0 && inputValue.length > 0;

  /* Gets tags from substring */
  const getSuggested = async (tagSubstring) => {
    if (!authenticate.success) return null;

    const url = `${config.BACKEND_URI}/tags/${tagSubstring}`;
    try {
      const response = await axios.get(url);
      setTagSuggestions(
        response.data.tags
          .filter((tag) => querySearch.tagNotSearched(param, tag.id))
          .map((tag) => {
            tag.value = tag.name;
            delete tag.name;
            return tag;
          })
      );
    } catch (e) {
      console.log("tag error", tagSubstring, e);
    }
  };

  // Changes in the text inputted into the search
  const handleChange = (event) => {
    const newValue = event.target.value;
    if (newValue.length > 0) {
      getSuggested(newValue);
      setShowSuggestions(true);
    } else {
      setTagSuggestions([]);
      setShowSuggestions(false);
    }
    setInputValue(newValue);
  };

  const dispatch = useDispatch();
  /* Performs different actions on special keys pressed */
  const handleKeyDown = (event) => {
    if (inputValue.length > 0) {
    }
    switch (event.key) {
      case "Enter":
        /* Add tag to search parameters */
        if (validSearch()) {
          const { id, name } = tagSuggestions[0];
          querySearch.addSearchParam(
            param,
            setParam,
            "tag",
            id,
            name,
            dispatch
          );
        }
        handleClear();
        // TODO: redirect to results with search query
        break;
      case "Tab":
        event.preventDefault();
        if (validSearch()) {
          const { id, name } = tagSuggestions[0];
          querySearch.addSearchParam(
            param,
            setParam,
            "tag",
            id,
            name,
            dispatch
          );
          handleClear();
        }
        break;
      // case "Backspace":
      //   /* Remove latest tag if backspacing on it. */
      //   if (inputValue === "") {
      //     querySearch.removeLatestTag();
      //   }
      //   break;
      default:
        break;
    }
  };

  return (
    <div className="search">
      <div className="input-bar">
        <input
          autoFocus
          autoComplete="off"
          type="text"
          placeholder={"Search"}
          value={inputValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        {inputValue.length === 0 ? (
          <SearchIcon
            className="icon"
            onClick={() => navigate(`/results?${param.toString()}`)}
          />
        ) : (
          <CloseIcon className="icon" onClick={handleClear} />
        )}
      </div>

      {/* Suggested Options */}
      <SuggestionBox 
        tagSuggestions={tagSuggestions}
        inputValue={inputValue} 
        showSuggestions={showSuggestions}/>
    </div>
  );
}
