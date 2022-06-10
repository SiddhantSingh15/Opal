import React, { useState } from 'react';
import "./NavSearchBar.css";
import { Search } from '@mui/icons-material';
import {useNavigate} from 'react-router-dom';

function  NavSearch() {

  const [input, setInput] = useState("");
  const history = useNavigate();

  const search = (e) => {
    e.preventDefault();
    console.log("search!");

    history("/search");
  }

  return (
    <form className='nav_search'>
      <div className='nav_search__input'> 
          <Search className='nav_search__inputIcon' />
          <input value={input} onChange = {(e) => setInput(e.target.value)} />
      </div>

    </form>


  )
}

export default NavSearch