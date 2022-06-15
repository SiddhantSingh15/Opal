import React, { useState } from 'react';
import Tag from '../components/Tag.js';
import SearchParam from '../Utils.js'
import "./Search.css"
import { ReactComponent as SearchIcon } from "../assets/magnifier.svg"
import { ReactComponent as CloseIcon } from "../assets/close.svg"
import { ReactComponent as TagIcon } from "../assets/tag.svg"
import { ReactComponent as OpalLogo } from "../assets/opal.svg"



  class Search extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: "",
      selectedTagX: 0,
      selectedTagY: 0,
      filteredOptions: (this.props.app.state.tags ? this.props.app.state.tags : []),
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  // Changes in the text inputted into the search
  handleChange(event) {
    this.setState({ value: event.target.value });
    // The options tags being shown as search param options
    this.setState({
      filteredOptions: this.props.app.state.tags
        // Yes i am aware this is disgusting
        .filter((tag) => {
          return (
            // Show tags that are related to search query and ignore already included tags 
            tag.name.toLowerCase().
            includes(event.target.value.toLowerCase()))
            && 
            !this.props.app.state.searchParams
            .map((param) => param.obj)
            .includes(tag.obj)})
        // Takes 6 suggested tags
        .slice(0,6)
        // If raw text is not already in the options it adds it
        .concat(
          (!this.props.app.state.searchParams
          .filter((param) => (param.type === "search"))
          .map((param) => param.obj)
          .includes(event.target.value)) ?
            [new SearchParam('"' + event.target.value + '"', "search", true, event.target.value)] :
            []
        )
    });
  }

  handleKeyDown(event) {
    if (this.state.value.length>0) {

    }
    switch (event.key) {
      case "Enter":
        if(this.state.filteredOptions.length !=0) {
          this.props.app.handleAddSearchParams([this.state.filteredOptions[0]]);
        }
        this.handleClear()
        this.props.app.handleResults()
        break;
      case "Tab":
        event.preventDefault()
        if((this.state.filteredOptions.length !=0) &&
          this.state.value.length !=0) {
          this.props.app.handleAddSearchParams([this.state.filteredOptions[0]]);
          this.handleClear()
        }
        break;
      case "Backspace":
        if(this.state.value === "") {
          if (this.props.app.state.searchParams.length > 0) {
            this.props.app.handleRemoveSearchParams([this.props.app.state.searchParams.pop()]);
          }
        }
        break;
      // case "ArrowUp":
      //   this.setState({selectedTagY: (this.state.selectedTagY === 0 ?
      //     0 :
      //     this.state.selectedTagY-1)})
      //     break;
      // case "ArrowDown":
      //   this.setState({selectedTagY: (this.state.selectedTagY >= this.state.filteredOptions.length &&
      //     this.state.value != "" ?
      //     this.state.filteredOptions.length : 
      //     this.state.selectedTagY+1)})
      //     break;
    }
  }

  // Clear the search input
  handleClear(event) {
    this.setState({ value: "" });
  }

  render() {
    return (
      <div className='body'>
        {/* The Logo*/}
        <OpalLogo className="searchLogo" />
        <div className="search">
          {/* Currently Selected Tags */}
          {this.props.app.state.searchParams.length != 0 && (
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
              value={this.state.value}
              id="searchBar"
              onChange={this.handleChange}
              onKeyDown={this.handleKeyDown}/>
            <div className="searchIcon">
              {this.state.value.length === 0 ?
                <SearchIcon id="searchBtn" onClick={this.props.app.handleResults} /> :
                <CloseIcon id="clearBtn" onClick={this.handleClear} />}
            </div>
          </div>

          {/* Search options - Tags */}
          {(this.state.value.length != 0 &&
          this.state.filteredOptions.length != 0) &&
          (
            <div className="searchOptions">
              {this.state.filteredOptions.map((param, key) => {
                return (
                  <div key={key} className="searchOption">
                    <Tag
                      tagData={param}
                      handleClick={() => {
                        this.props.app.handleAddSearchParams([param]);
                        this.handleClear();
                      }} />
                    {/* on clicking the x it converts the param to a exclude param */}
                    <button className='excludeSearchOptionButton'
                      onClick={() => {
                        param.include = false;
                        this.props.app.handleAddSearchParams([param]);
                        this.handleClear();
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

export default Search;