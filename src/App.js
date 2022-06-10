import './App.css';
import React from 'react';
import {BrowserRouter as HashRouter, Route, Routes} from 'react-router-dom';
import Search from "./pages/Search";
import Results from "./pages/Results";

function App() {
  return (
    <div className="app">
        <HashRouter>
          <Routes>
            <Route index path="/" element={<Search />} />
            <Route index path="/results" element={<Results />} />
          </Routes>
        </HashRouter>
    </div>
  );
}

export default App;
