import "./App.css";
import React from "react";
import NavBar from "./components/NavBar";
import Search from "./pages/Home";
import Results from "./pages/Results";
import "typeface-open-sans";
import axios from "axios";

function App() {
  class MainApp extends React.Component {
    state = {
      page: "home",
      searchParams: [],
      results: [],
      resultsTags: [],
    };

    fetchResultsAsync = async () => {
      const documentAddress = "http://35.231.0.227:8000/api/v1/document/";
      // Loads the json results
      const tags = [];
      const fields = {};
      for (const param of this.state.searchParams) {
        switch (param.type) {
          case "tag":
            tags.push(param.id);
            break;
          case "field":
            fields[param.id] = param.name;
            break;
          default:
            break;
        }
      }

      try {
        const resultsResponse = await axios.post(documentAddress, {
          tags,
          keywords: [],
          fields,
        });
        this.setState({ results: resultsResponse.data.docs }, () => {
          this.fetchResultTagsAsync(resultsResponse.data.docs);
        });
      } catch (e) {
        console.log(e);
      }
    };

    fetchResultTagsAsync = async (results) => {
      const tagsAddress = "http://35.231.0.227:8000/api/v1/tags/";
      //Loads union of the tags of each result
      try {
        const tagsResponse = await axios.post(
          tagsAddress,
          this.getTagUniqueIds(results)
        );
        this.setState({ resultsTags: tagsResponse.data.tags });
      } catch (e) {
        console.log(e);
      }
    };

    getTagUniqueIds = (results) => {
      //Replace this later
      return Array.from(new Set(results.flatMap((result) => result.tags)));
    };

    getResultsTag = (tagID) => {
      const tagList = this.state.resultsTags.filter((tag) => tag.id === tagID);
      if (tagList.length !== 0) {
        return tagList[0];
      } else {
        return null;
      }
    };

    handleGoToPage = (page) => {
      this.setState({ page: page });
    };

    handleAddSearchParams = (params) => {
      this.setState(
        { searchParams: this.state.searchParams.concat(params) },
        () => {
          this.fetchResultsAsync();
        }
      );
    };

    handleRemoveSearchParams = (params) => {
      this.setState(
        {
          searchParams: this.state.searchParams.filter(
            (searchParam) =>
              !params.map((params) => params.id).includes(searchParam.id)
          ),
        },
        () => {
          this.fetchResultsAsync();
        }
      );
    };

    // Removes single param (optimizeed)
    handleRemoveSingleParam = (param) => {
      this.setState(
        {
          searchParams: this.state.searchParams.filter(
            (searchParam) =>
              !(searchParam.id === param.id && searchParam.type === param.type)
          ),
        },
        () => {
          this.fetchResultsAsync();
        }
      );
    };

    handleRenderBody = () => {
      switch (this.state.page) {
        case "home":
          return <Search app={this} />;
        case "results":
          return <Results app={this} />;
        default:
          return <div></div>;
      }
    };

    handleResults = () => {
      this.handleGoToPage("results");
    };

    render() {
      return (
        <div className="app">
          <div>
            <NavBar app={this} />
            {this.handleRenderBody()}
          </div>
        </div>
      );
    }
  }

  return <MainApp />;
}

export default App;
