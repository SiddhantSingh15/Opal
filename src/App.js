import './App.css';
import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from "./pages/Home";

function App() {
  return (
    <div className="app">
        <h1>sdsdsds</h1>
        <Router>
          <Routes>
            <Route path='/search'>
              {/* <SearchPage /> */}

            </Route>
            <Route path='/' exact component = {Home}>
              <Home />
            </Route>
          </Routes>
        </Router>
    </div>
  );
}

export default App;
