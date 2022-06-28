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
import AnimatedPlaceholder from "./AnimatedPlaceholder";
import languages from "../assets/languages";

/** Renders search box component
 * @param {bool} animated whether to show animated placeholder
 */
export default function SearchBox({ animated }) {
  const authenticate = useAuth();

  const navigate = useNavigate();
  const [param, setParam] = useSearchParams();

  const [inputValue, setInputValue] = useState("");
  const [tagSuggestions, setTagSuggestions] = useState([]);

  const [inputFocus, setInputFocus] = useState(false);

  /* Clear input value */
  const handleClear = () => setInputValue("");

  /* Checks if the search is valid and with results. */
  const validSearch = () => tagSuggestions.length > 0 && inputValue.length > 0;

  /* Gets tags from substring */
  const getSuggestedTags = async (tagSubstring) => {
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

  /* Based on the input returns the suggested fields. */
  const getSuggestedFields = (newValue) => {
    const suggestedFields = {
      language: [],
      title: [],
      type: [],
      access: [],
      date: [],
      governing_law: [],
    };

    const typed = newValue.toLowerCase();

    /* Title */
    suggestedFields.title.push(newValue);

    /* Language */
    if (typed.includes("language"))
      suggestedFields.language = languages.filter(
        /* Replace with .includes for more suggestions */
        (lang) =>
          extractKeys("language", typed).includes(lang.toLocaleLowerCase())
      );

    /* Access */
    if (typed.includes("access")) {
      suggestedFields.access = extractKeys("access", typed);
    }

    /* Type */
    if (typed.includes("type")) {
      suggestedFields.type = extractKeys("type", typed);
    }

    /* Access */
    if (typed.includes("gov law")) {
      suggestedFields.governing_law = extractKeys("gov law", typed);
    }

    /* Date */
    // if (typed.includes("from")) {
    //   const fromSplit = extractKeys("from", typed)[0];
    //   if (fromSplit.includes("to")) {} else
    // }
  };

  /** Extracts key search queries from field search */
  const extractKeys = (field, input) => {
    const replaced = input.replace(field, "");
    return replaced.trim() ? replaced.split(",").map((w) => w.trim()) : [];
  };

  // Changes in the text inputted into the search
  const handleChange = (event) => {
    const newValue = event.target.value;
    if (newValue.length > 0) {
      getSuggestedTags(newValue);
      getSuggestedFields(newValue);
    } else {
      setTagSuggestions([]);
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

  /** Returns search typed suggestions or search input */
  const getSearchBar = () => {
    if (animated && !inputFocus)
      return (
        <div className="input-bar" onClick={() => setInputFocus(true)}>
          <AnimatedPlaceholder />
        </div>
      );

    return (
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
    );
  };

  return (
    <div className="search">
      {getSearchBar()}
      {/* Suggested Options */}
      <SuggestionBox tagSuggestions={tagSuggestions} inputValue={inputValue} />
    </div>
  );
}
