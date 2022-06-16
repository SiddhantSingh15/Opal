import React from 'react';
import Tag from '../components/Tag.js';
import SearchParam from '../Utils.js'
import "./Search.css"
import { ReactComponent as SearchIcon } from "../assets/magnifier.svg"
import { ReactComponent as CloseIcon } from "../assets/close.svg"
import { ReactComponent as OpalLogo } from "../assets/opal.svg"
import { ReactComponent as DotDotDot } from "../assets/dotdotdot.svg"
import axios from "axios";


  class Search extends React.Component {

  constructor(props) {
    super(props);
    this.numTagsDisplayed = 9;

    this.state = {
      inputValue: "",
      tagSuggestions: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.fetchTagsAsync = this.fetchTagsAsync.bind(this);

    this.renderSuggestionBox = this.renderSuggestionBox.bind(this);

    this.loadTags = this.loadTags.bind(this);
    this.getSearchParamSuggestions = this.getSearchParamSuggestions.bind(this);
  }

  async fetchTagsAsync(searchBarValue) {
    const url = "http://35.231.0.227:8000/api/v1/tags/" + searchBarValue;
    try {
      const response = await axios.get(url);
      this.setState({tagSuggestions: this.loadTags(response.data.tags)})
    } catch (e) {
        console.log(e);
    }
  }
  
  loadTags(tagSuggestions) {
    return tagSuggestions
            .map(tag => new SearchParam(tag.id,tag.name, "tag", true, tag))
  }

  // Changes in the text inputted into the search
  handleChange(event) {
    if (event.target.value.length!==0) {
      this.fetchTagsAsync(event.target.value);
    } else {
      this.setState({tagSuggestions:[]})
    }
    this.setState({ inputValue: event.target.value});
  }

  handleKeyDown(event) {
    if (this.state.inputValue.length>0) {

    }
    switch (event.key) {
      case "Enter":
        if(this.state.tagSuggestions.length !==0) {
          this.props.app.handleAddSearchParams([this.state.tagSuggestions[0]]);
        }
        this.handleClear()
        this.props.app.handleResults()
        break;
      case "Tab":
        event.preventDefault()
        if((this.state.tagSuggestions.length !==0) &&
          this.state.inputValue.length !==0) {
          this.props.app.handleAddSearchParams([this.state.tagSuggestions[0]]);
          this.handleClear()
        }
        break;
      case "Backspace":
        if(this.state.inputValue === "") {
          if (this.props.app.state.searchParams.length > 0) {
            this.props.app.handleRemoveSearchParams([this.props.app.state.searchParams.pop()]);
          }
        }
        break;
      default:
        break;
    }
  }

  // Clear the search input
  handleClear(event) {
    this.setState({ inputValue: ""});
  }

  getSearchParamSuggestions () {
    return this.state.tagSuggestions
            //Filters out tags already in the search query
            .filter(tag => !this.props.app.state.searchParams
              .map(param => param.id).includes(tag.id))
            .slice(0,this.numTagsDisplayed);
  }

  inSearchParams(id) {
    return this.props.app.state.searchParams
      .map(param => param.id).includes(id)
  }

  renderSuggestionBox() {
    const paramSuggestions = this.getSearchParamSuggestions();
    if (this.state.inputValue.length !== 0) {
      return (
        <React.Fragment>

          {/* Display the current value in the input bar */}
          {!this.inSearchParams(this.state.inputValue) &&
          this.state.inputValue.length !== 0 &&
          <div className="searchTextOption">
              <div className="searchTextOptionTag"
              onClick={() => {this.props.app.handleAddSearchParams([
                new SearchParam(
                  this.state.inputValue,
                  '"' + this.state.inputValue +  '"',
                  "search",
                  true,
                  null
                )
              ])
              this.handleClear()}}>
              <SearchIcon/>
              <p>"{this.state.inputValue}"</p>
            </div>

            <CloseIcon 
                className='excludeSearchOptionButton'
                onClick={() => {
                  this.props.app.handleAddSearchParams([
                    new SearchParam(
                      this.state.inputValue,
                      '"' + this.state.inputValue +  '"',
                      "search",
                      false,
                      null
                    )
                  ]);
                  this.handleClear();}}
                />
          </div>
          }
          
          {/* Display k number of most relevant tags */}
          {this.state.tagSuggestions.length !== 0 &&
          <div className="searchOptions">
              {paramSuggestions
              .map((param, key) => {
                return (
                  <div key={key} className="searchOption">

                    <Tag
                      tagData={param}
                      handleClick={() => {
                        this.props.app.handleAddSearchParams([structuredClone(param)]);
                        this.handleClear();
                      }} />

                    <CloseIcon 
                      className='excludeSearchOptionButton'
                      onClick={() => {
                        const searchParam = structuredClone(param);
                        searchParam.include = false;
                        this.props.app.handleAddSearchParams([searchParam]);
                        this.handleClear();}}

                      />
                  </div>)})}
          </div>}

          {/* Show the number of tags hidden */}
          {paramSuggestions.length === this.numTagsDisplayed &&
          <DotDotDot className="dotdotdot"/>
          }
        </React.Fragment>
      )
    }
  }

  render() {
    return (
      <div className='body'>

        {/* The Logo*/}
        <OpalLogo className="searchLogo" />
        <div className="search">
          {/* Currently Selected Tags */}
          {this.props.app.state.searchParams.length !== 0 && (
            <div className="searchParams">
              {this.props.app.state.searchParams.map((param, key) => {
                return (
                  <React.Fragment key = {key}>
                    <Tag
                      tagData={param}
                      handleClick={() => this.props.app.handleRemoveSearchParams([param])} />
                  </React.Fragment>
                )
              })}
            </div>
          )}

          {/* Input bar */}
          <div className="searchInputs">
            <input
              autoFocus
              autoComplete="off"
              type="text"
              placeholder={"Search"}
              value={this.state.inputValue}
              onChange={this.handleChange}
              onKeyDown={this.handleKeyDown}
              className="SearchBar"/>
            <div className="searchIcon">
              {this.state.inputValue.length === 0 ?
                <SearchIcon id="searchBtn" onClick={this.props.app.handleResults} /> :
                <CloseIcon id="clearBtn" onClick={this.handleClear} />}
            </div>
          </div>

          {/* Suggested Options */}
          {this.renderSuggestionBox()}

        </div>
      </div>
    );
  }
}

export default Search;