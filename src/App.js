import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Search from "./pages/Search";
import Results from "./pages/Results";
import useFetch from "./hooks/useFetch";
import "typeface-open-sans"

function App() {
  const {data: tags, isPending, error} =  useFetch("http://localhost:8000/tags");

  class MainApp extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        page: "search",
        searchParams: []
      };

      this.handleRenderBody = this.handleRenderBody.bind(this);
      this.handleResults = this.handleResults.bind(this);
    }

    handleRenderBody(event) {
      switch (this.state.page) {
        case "search":
          return <Search 
                    data={tags}
                    handleResults={this.handleResults}
                    app={this}/>
        case "results":
          return <Results
                    app={this}/>
        default:
          return <Search data={tags}/>
      }
    }

    handleResults(event) {
      this.setState({page: "results"})
    }

    render() {
      return (
        <div className="app">
          <div>
            <NavBar searchEnabled={false} />
            {this.handleRenderBody()}
          </div>
        </div>
      );
    }
  }
  
  return <MainApp/>
}

export default App;
