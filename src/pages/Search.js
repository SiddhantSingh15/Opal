import React from 'react';
import {ReactComponent as OpalLogo} from "../assets/opal.svg"
import "./Search.css";
import HomeSearchBar  from "../components/HomeSearchBar";

const Search = () => {
  const searchQuery = null;

  return (
    <div className='search__home'>
        <OpalLogo className = "logo--title"/>
        <HomeSearchBar />
    </div>
  )
}

export default Search