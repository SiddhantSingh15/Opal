import './App.css';
import React, { useState } from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import NavBar from './components/NavBar';
import Search from "./pages/Search";
import Results from "./pages/Results";

function App() {


  const [search, setSearch] = useState(true); 
  
  return (
    <div className='app'>
       <NavBar searchEnabled={!search}/>
      <Router>
        <Routes> 
          <Route index path="/" element={<Search/>}/>
          <Route index path="/results" element={<Results/>}/>
        </Routes>
      </Router>
    </div>
  );
}


export default App;