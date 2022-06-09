import './App.css';
import React from 'react';
import {BrowserRouter as HashRouter, Route, Routes} from 'react-router-dom';
import Home from "./pages/Home";

function App() {
  return (
    <div className="app">
        <HashRouter>
          <Routes>
            <Route index path="/" element={<Home />} />
          </Routes>
        </HashRouter>
    </div>
  );
}

export default App;
