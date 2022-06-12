import React, { useState } from 'react';
import useFetch from "../hooks/useFetch.js"
import Tag from '../components/Tag.js';
import "./Search.css"
import { ReactComponent as SearchIcon } from "../assets/magnifier.svg"
import { ReactComponent as CloseIcon } from "../assets/close.svg"
import { ReactComponent as TagIcon } from "../assets/tag.svg"
import { ReactComponent as OpalLogo } from "../assets/opal.svg"
import { type } from '@testing-library/user-event/dist/type/index.js';


const HomeSearchBar = ({ placeholder, data }) => {

  class SearchParam {
    constructor(name, type, include, obj) {
      this.name = name;
      this.type = type;
      this.include = include;
      this.obj = obj;
    }
  }

  class SearchBar extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        value: "",
        filteredOptions: (data ? data : []),
        searchParams: []
        // //Test params for css
        // searchParams: [
        //   new SearchParam("english","tag",true,null),
        //   new SearchParam("french","tag",false,null),
        //   new SearchParam('"goldsmiths"',"search",true,null),
        //   new SearchParam("english","tag",true,null),
        //   new SearchParam("french","tag",false,null),
        //   new SearchParam('"goldsmiths"',"search",true,null)
        // ]
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
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
        filteredOptions: data.filter((tag) => {
          return (
            // Show tags that are related to search query and ignore already included tags 
            tag.name.toLowerCase().includes(event.target.value.toLowerCase())) &&
            !(this.state.searchParams.filter((param) => param.type === "tag")
              .map((param) => param.obj.id)).includes(tag.id)
        })
      });
    }

    // Submit the search
    handleSubmit(event) {
      alert("Searching for " + this.state.searchParams.map((obj) => obj.name));
      event.preventDefault();
    }

    // Clear the search input
    handleClear(event) {
      this.setState({ value: "" });
    }

    // Add a search parameters you have already selected
    handleAddParam(param, event) {
      if (!this.state.searchParams.includes(param)) {
        this.setState({ searchParams: this.state.searchParams.concat([param]) });
        // Dunno if should clear here it is a bit annoying need to force refresh if i do
        this.handleClear();
      }
    }

    // Remove a search parameters you have already selected
    handleRemoveParam(paramToRemove, event) {
      this.setState({ searchParams: this.state.searchParams.filter((param) => param != paramToRemove) })
    }

    getParamOptions(event) {
      //Takes the first 6 params (not sorted atm in order of relevance)
      const paramOptions = this.state.filteredOptions
        .map(tag => new SearchParam(tag.name, tag.class, true, tag))
        .slice(0,6)

      // Current Search value is not already a tag
      if (!this.state.searchParams
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
            {this.state.searchParams.length != 0 && (
              <div className="searchParams">
                {this.state.searchParams.map((param, key) => {
                  return (
                    <Tag
                      tagData={param}
                      key={key}
                      handleClick={() => this.handleRemoveParam(param)} />
                  )
                })}
              </div>
            )}

            {/* Input bar */}
            <div className="searchInputs">
              <input
                type="text"
                placeholder={placeholder}
                value={this.state.value}
                id="searchBar"
                onChange={this.handleChange} />

              <div className="searchIcon">
                {this.state.value.length === 0 ?
                  <SearchIcon id="searchBtn" onClick={this.handleSubmit} /> :
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
                        key={key}
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

  return (<SearchBar />)
}

export default HomeSearchBar;