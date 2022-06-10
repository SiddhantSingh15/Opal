import React, { useState } from 'react';
import "./HomeSearchBar.css";
import { Search } from '@mui/icons-material';
import {useNavigate} from "react-router-dom"

function HomeSearchBar(props) {

  const [input, setInput] = useState("");
  let navigate = useNavigate();

  return (
    <form onSubmit={() => {navigate('/results')}} className='search'>
      <div className='search__input'> 
          <Search className='search__inputIcon' />
          <input value={input} onChange = {(e) => setInput(e.target.value)} />
      </div>
    </form>
  )
}

export default HomeSearchBar