import React, { useState } from 'react';
import Tag from '../components/Tag.js';
import SearchParam from '../Utils.js'
import "./Search.css"
import { ReactComponent as SearchIcon } from "../assets/magnifier.svg"
import { ReactComponent as CloseIcon } from "../assets/close.svg"
import { ReactComponent as TagIcon } from "../assets/tag.svg"
import { ReactComponent as OpalLogo } from "../assets/opal.svg"


const Search = ({handleResults, app}) => {

  class Search extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        value: "",
        filteredOptions: (app.state.tags ? app.state.tags : []),
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleClear = this.handleClear.bind(this);
      this.handleAddParam = this.handleAddParam.bind(this);
      this.handleRemoveParam = this.handleRemoveParam.bind(this);
      this.getParamOptions = this.getParamOptions.bind(this);
    }

    // Changes in the text inputted into the search
    handleChange(event) {
      this.setState({ value: event.target.value });
      // The options tags being shown as search param options
      this.setState({
        filteredOptions: app.state.tags.filter((tag) => {
          return (
            // Show tags that are related to search query and ignore already included tags 
            tag.name.toLowerCase().includes(event.target.value.toLowerCase())) &&
            !app.state.searchParams.map((param) => param.obj).includes(tag.obj)
        })
      });
    }

    // Clear the search input
    handleClear(event) {
      this.setState({ value: "" });
    }

    // Add a search parameters you have already selected
    handleAddParam(param, event) {
      if (!app.state.searchParams.includes(param)) {
        app.setState({ searchParams: app.state.searchParams.concat([param]) });
        // Dunno if should clear here it is a bit annoying need to force refresh if i do
        this.handleClear();
      }
    }

    // Remove a search parameters you have already selected
    handleRemoveParam(paramToRemove, event) {
      app.setState({ searchParams: app.state.searchParams.filter((param) => param != paramToRemove) })
    }

    getParamOptions(event) {
      //Takes the first 6 params (not sorted atm in order of relevance)
      const paramOptions = this.state.filteredOptions
        .slice(0,6)

      // Current Search value is not already a tag
      if (!app.state.searchParams
        .filter((param) => (param.type === "search"))
        .map((param) => param.obj)
        .includes(this.state.value)) {
        paramOptions.unshift(new SearchParam('"' + this.state.value + '"', "search", true, this.state.value))
      }
      return paramOptions
    }

    render() {
      return (
        <div className='body'>
          {/* The Logo*/}
          <OpalLogo className="searchLogo" />
          <div className="search">
            {/* Currently Selected Tags */}
            {app.state.searchParams.length != 0 && (
              <div className="searchParams">
                {app.state.searchParams.map((param, key) => {
                  return (
                    <React.Fragment key = {key}>
                      <Tag
                        tagData={param}
                        handleClick={() => this.handleRemoveParam(param)} />
                    </React.Fragment>
                  )
                })}
              </div>
            )}

            {/* Input bar */}
            <div className="searchInputs">
              <input
                type="text"
                placeholder={"Search"}
                value={this.state.value}
                id="searchBar"
                onChange={this.handleChange} />

              <div className="searchIcon">
                {this.state.value.length === 0 ?
                  <SearchIcon id="searchBtn" onClick={handleResults} /> :
                  <CloseIcon id="clearBtn" onClick={this.handleClear} />}
              </div>
            </div>

            {/* Search options - Tags */}
            {this.state.value.length != 0 && (
              <div className="searchOptions">
                {this.getParamOptions().map((param, key) => {
                  return (
                    <div key={key} className="searchOption">
                      <Tag
                        tagData={param}
                        handleClick={() => this.handleAddParam(param)} />
                      {/* on clicking the x it converts the param to a exclude param */}
                      <button className='excludeSearchOptionButton' onClick={() => {
                        { param.include = false }
                        return this.handleAddParam(param)
                      }}>
                        <CloseIcon />
                      </button>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      );
    }
  }

  return (<Search />)
}

export default Search;