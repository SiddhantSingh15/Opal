import React, { useState } from 'react';
import "../pages/Search.css";
import { Button, IconButton } from '@material-ui/core';
import HardwareRoundedIcon from '@mui/icons-material/HardwareRounded';
import SearchIcon from '@material-ui/icons/Search';
import Avatar from '@material-ui/core/Avatar';
import {useNavigate} from 'react-router-dom';

function Search() {

  const [input, setInput] = useState("");
  const history = useNavigate();

  const search = (e) => {
    e.preventDefault();
    console.log("search!");

    history("/search");
  }

  return (
    <form className='search'>
      <div className='search__input'> 
          <SearchIcon className='search__inputIcon' />
          <input value={input} onChange = {(e) => setInput(e.target.value)} />
          <div class="font-icon-wrapper" onClick={search}>
            <HardwareRoundedIcon />
          </div>
      </div>

    </form>


  )
}

export default Search