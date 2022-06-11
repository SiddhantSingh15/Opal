import React, {useState} from 'react';
import "./HomeSearchBar.css"
import {ReactComponent as SearchIcon} from "../assets/magnifier.svg"
import {ReactComponent as CloseIcon} from "../assets/close.svg"
import {ReactComponent as TagIcon} from "../assets/tag.svg"



const HomeSearchBar = ({placeholder, data}) => {

  class SearchParam {
      constructor(name,type,data) {
        this.name = name;
        this.type = type;
        this.data = data;
      }
  }

  class SearchBar extends React.Component {

    constructor(props) {
			super(props);
			this.state = {
        value:"",
        filteredOptions: (data ? data : []),
        searchParams: []
      };
			this.handleChange = this.handleChange.bind(this);
			this.handleSubmit = this.handleSubmit.bind(this);
      this.handleClear = this.handleClear.bind(this);
      this.handleAddParam = this.handleAddParam.bind(this);
      this.handleRemoveParam = this.handleRemoveParam.bind(this);
		}
    
		handleChange(event) {
			this.setState({value: event.target.value});
      this.setState({filteredOptions: data.filter((tag) => {
        return tag.name.toLowerCase().includes(event.target.value.toLowerCase());
      })});
		}
	
		handleSubmit(event) {
			alert('A name was submitted: ' + this.state.value);
			event.preventDefault();
		}

    handleClear(event) {
      this.setState({value: ""});
      console.log("cleared");
    }
    
    handleAddParam(name,type,data,event) {
      this.setState({searchParams: this.state.searchParams.concat([[name,type,data]])});
      console.log(this.state.searchParams);
      this.handleClear();
    }

    handleRemoveParam(paramToRemove,event) {
      this.setState({searchParams: this.state.searchParams.filter((param) => {
        return param != paramToRemove;
      })})
    }

		render() {
			return (
        <div className='search'>
          {/* Currently Selected Tags */}
          {this.state.searchParams.length != 0 && (
            <div className="currentParams">
              {this.state.searchParams.map((param,key) => {
                return (
                  <button className="paramItem" key={key} onClick={() => this.handleRemoveParam(param)} >
                    {param[1] === "tag" ? <TagIcon/> : <SearchIcon/>}
                    <p>{param[0]}</p>
                  </button>
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
                <SearchIcon/> : 
                <CloseIcon id="clearBtn" onClick={this.handleClear}/>}
            </div>
          </div>
          {/* Search options */}
          {this.state.value.length != 0 && (
            <div className="dataResult">
              {this.state.filteredOptions.map((tag,key) => {
                return (
                  <button className="dataItem" key={key} onClick={() => this.handleAddParam(tag.name,"tag",tag)}>
                    <TagIcon/>
                    <p>{tag.name}</p>
                  </button>
                )
              })}
              <button className="dataItem" onClick={() => this.handleAddParam('"' + this.state.value + '"',"search",this.state.value)}>
                <SearchIcon/>
                <p>"{this.state.value}"</p>
              </button>
            </div>
          )}
        </div>
			);
		}
  }

  return (<SearchBar/>)
}
 
export default HomeSearchBar;