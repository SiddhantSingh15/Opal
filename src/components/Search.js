import React from 'react';
import "../pages/Search.css";
import { Button } from '@material-ui/core';
import HardwareRoundedIcon from '@mui/icons-material/HardwareRounded';
import SearchIcon from '@material-ui/icons/Search';

function Search() {
  return (
    <form className='search'>
        <div className='search__input'> 
            <SearchIcon className='search__inputIcon' />
            <input />
            <HardwareRoundedIcon />
        </div>

        {/* <div className='search__buttons'>
            <Button variant='outlined' type='submit'>Opal Search</Button>
        </div> */}
    </form>


  )
}

export default Search