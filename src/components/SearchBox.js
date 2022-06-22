import React from "react";
import SearchParam from "../SearchParam.js";
import "./SearchBox.css";
import { ReactComponent as SearchIcon } from "../assets/magnifier.svg";
import { ReactComponent as CloseIcon } from "../assets/close.svg";
import { ReactComponent as DotDotDot } from "../assets/dotdotdot.svg";
import axios from "axios";
import Searchable from "./Searchable.js";

class SearchBox extends React.Component {
  state = {
    inputValue: "",
    tagSuggestions: [],
  };

  constructor(props) {
    super(props);
    this.numTagsDisplayed = 9;
  }

  fetchTagsAsync = async (searchBarValue) => {
    const url = "http://35.231.0.227:8000/api/v1/tags/" + searchBarValue;
    try {
      const response = await axios.get(url);
      this.setState({ tagSuggestions: this.loadTags(response.data.tags) });
    } catch (e) {
      console.log(e);
    }
  };

  loadTags = (tagSuggestions) => {
    return tagSuggestions.map(
      (tag) => new SearchParam(tag.id, tag.name, "tag", true, tag)
    );
  };

  // Changes in the text inputted into the search
  handleChange = (event) => {
    if (event.target.value.length !== 0) {
      this.fetchTagsAsync(event.target.value);
    } else {
      this.setState({ tagSuggestions: [] });
    }
    this.setState({ inputValue: event.target.value });
  };

  handleKeyDown = (event) => {
    if (this.state.inputValue.length > 0) {
    }
    switch (event.key) {
      case "Enter":
        if (
          this.state.tagSuggestions.length !== 0 &&
          this.state.inputValue !== 0
        ) {
          this.props.app.handleAddSearchParams([this.state.tagSuggestions[0]]);
        }
        this.handleClear();
        this.props.app.handleGoToPage("results");
        break;
      case "Tab":
        event.preventDefault();
        if (
          this.state.tagSuggestions.length !== 0 &&
          this.state.inputValue.length !== 0
        ) {
          this.props.app.handleAddSearchParams([this.state.tagSuggestions[0]]);
          this.handleClear();
        }
        break;
      case "Backspace":
        if (this.state.inputValue === "") {
          if (this.props.app.state.searchParams.length > 0) {
            this.props.app.handleRemoveSearchParams([
              this.props.app.state.searchParams.pop(),
            ]);
          }
        }
        break;
      default:
        break;
    }
  };

  // Clear the search input
  handleClear = () => {
    this.setState({ inputValue: "" });
  };

  getSearchParamSuggestions = () => {
    return (
      this.state.tagSuggestions
        //Filters out tags already in the search query
        .filter(
          (tag) =>
            !this.props.app.state.searchParams
              .map((param) => param.id)
              .includes(tag.id)
        )
        .slice(0, this.numTagsDisplayed)
    );
  };

  inSearchParams = (id) => {
    return this.props.app.state.searchParams
      .map((param) => param.id)
      .includes(id);
  };

  renderSuggestionBox = () => {
    const paramSuggestions = this.getSearchParamSuggestions();
    if (this.state.inputValue.length !== 0) {
      return (
        <div className="suggestions">
          {/* Display the current value in the input bar */}
          {!this.inSearchParams(this.state.inputValue) &&
            this.state.inputValue.length !== 0 && (
              <div className="text-option">
                <div
                  className="text-option-tag"
                  onClick={() => {
                    this.props.app.handleAddSearchParams([
                      new SearchParam(
                        this.state.inputValue,
                        '"' + this.state.inputValue + '"',
                        "search",
                        true,
                        null
                      ),
                    ]);
                    this.handleClear();
                  }}
                >
                  <SearchIcon />
                  <p>"{this.state.inputValue}"</p>
                </div>

                <CloseIcon
                  className="icon"
                  onClick={() => {
                    this.props.app.handleAddSearchParams([
                      new SearchParam(
                        this.state.inputValue,
                        '"' + this.state.inputValue + '"',
                        "search",
                        false,
                        null
                      ),
                    ]);
                    this.handleClear();
                  }}
                />
              </div>
            )}

          {/* Display k number of most relevant tags */}
          {this.state.tagSuggestions.length !== 0 && (
            <div className="tags-box">
              {paramSuggestions.map((param, key) => {
                return (
                  <div key={key} className="tag-option">
                    <Searchable type="tag" key={param.id} value={param.name} />

                    <CloseIcon
                      className="icon"
                      onClick={() => {
                        const searchParam = structuredClone(param);
                        searchParam.include = false;
                        this.props.app.handleAddSearchParams([searchParam]);
                        this.handleClear();
                      }}
                    />
                  </div>
                );
              })}
            </div>
          )}

          {/* Show the number of tags hidden */}
          {paramSuggestions.length === this.numTagsDisplayed && (
            <DotDotDot className="dotdotdot" />
          )}
        </div>
      );
    }
  };

  render() {
    return (
      <div className="search">
        {/* Input bar */}
        <div className="input-bar">
          <input
            autoFocus
            autoComplete="off"
            type="text"
            placeholder={"Search"}
            value={this.state.inputValue}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
          />

          {this.state.inputValue.length === 0 ? (
            <SearchIcon
              className="icon"
              onClick={this.props.app.handleResults}
            />
          ) : (
            <CloseIcon className="icon" onClick={this.handleClear} />
          )}
        </div>

        {/* Suggested Options */}
        {this.renderSuggestionBox()}
      </div>
    );
  }
}

export default SearchBox;
