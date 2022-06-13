import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Search from "./pages/Search";
import Results from "./pages/Results";
import useFetch from "./hooks/useFetch";
// import "typeface-open-sans"

function App() {
  const {data: tags, isPending, error} =  useFetch("http://localhost:8000/tags");
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route
            index
            path="/"
            element={
              <div>
                <NavBar searchEnabled={false} />
                <Search data={tags}/>
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
