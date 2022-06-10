import React, { useState } from 'react';
import "./HomeSearchBar.css";
import { Search } from '@mui/icons-material';
import {useNavigate} from 'react-router-dom';

function HomeSearchBar() {

  const [input, setInput] = useState("");
  // const history = useNavigate();

  // const search = (e) => {
  //   e.preventDefault();
  //   console.log("search!");

  //   history("/search");
  // }

  return (
    <form onSubmit={() => {}} className='search'>
      <div className='search__input'> 
          <Search className='search__inputIcon' />
          <input value={input} onChange = {(e) => setInput(e.target.value)} />
      </div>
    </form>
  )
}

export default HomeSearchBar