import './App.css';
import React, { useState } from 'react';
import {BrowserRouter as HashRouter, Route, Routes} from 'react-router-dom';
import NavBar from './components/NavBar';
import Search from "./pages/Search";
import Results from "./pages/Results";

function App() {


  const [search, setSearch] = useState(true); 
  
  return (
    <div className='app'>
      <HashRouter>
        <Routes> 
          <Route index path="/" element={
            <div>
              <NavBar searchEnabled={!search}/>
              {search && <Search/>}
              {!search && <Results/>}
            </div>
          }/>
        </Routes>
      </HashRouter>
    </div>
  );
}


export default App;