import React from 'react';
import {ReactComponent as OpalLogo} from "../assets/opal.svg"
import "./Search.css";
import HomeSearchBar  from "../components/HomeSearchBar";
import useFetch from "../hooks/useFetch"

const Search = () => {	
  const {data: tags, isPending, error} =  useFetch("http://localhost:8000/tags");
  return (
    <div className='search__home'>
        <OpalLogo className = "logo--title"/>
        <div className="searchBar">
           <HomeSearchBar placeholder="Search" data={tags}/>
        </div>
        {console.log(tags)}
    </div>
  )
}

export default Search