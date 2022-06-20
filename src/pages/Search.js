import React from 'react';
import "./Search.css"
import { ReactComponent as OpalLogo } from "../assets/opal.svg"
import SearchBox from '../components/SearchBox.js';


  class Search extends React.Component {

  render() {
    return (
      <div className='body'>
        {/* The Logo*/}
        <OpalLogo className="searchLogo" />
        <div className="search">
          <SearchBox app={this.props.app}/>
        </div>
      </div>

    );
  }
}

export default Search;