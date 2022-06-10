import React from 'react';
import {ReactComponent as OpalLogo} from "../assets/opal.svg"
import "./Search.css";
import HomeSearchBar  from "../components/HomeSearchBar";
import NavBar from '../components/NavBar';
import {Link} from 'react-router-dom';

const Search = () => {
  const searchQuery = null;

  return (
    <div className='search__home'>
        <OpalLogo className = "logo--title"/>
        <HomeSearchBar />
    </div>
  )

  return {searchQuery}
}

export default Search