import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Search from "./pages/Search";
import Results from "./pages/Results";

function App() {
  return (
    <div className="app">
      <NavBar searchEnabled={false} />
      <Router>
        <Routes>
          <Route
            index
            path="/"
            element={
              <div>
                <NavBar searchEnabled={false} />
                <Search />
              </div>
            }
          />
          <Route
            index
            path="/results"
            element={
              <div>
                <NavBar searchEnabled={true} />
                <Results />
              </div>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
