import React, {useState} from 'react';
import "./HomeSearchBar.css"
import {ReactComponent as SearchIcon} from "../assets/magnifier.svg"
import {ReactComponent as CloseIcon} from "../assets/close.svg"

const HomeSearchBar = ({placeholder, data}) => {
  class SearchBar extends React.Component {
    constructor(props) {
			super(props);
			this.state = {
        value:"",
        filteredOptions: (data ? data : [])
      };
			this.handleChange = this.handleChange.bind(this);
			this.handleSubmit = this.handleSubmit.bind(this);
      this.handleClear = this.handleClear.bind(this);
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

		render() {
			return (
        <div className='search'>
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
          {this.state.value.length != 0 && (
            <div className="dataResult">
              {this.state.filteredOptions.map((value,key) => {
                return (
                  <a className="dataItem" key={key}>
                    <p>{value.name}</p>
                  </a>
                )})}
            </div>
          )}
        </div>
			);
		}
  }

  return (<SearchBar/>)
}
 
export default HomeSearchBar;