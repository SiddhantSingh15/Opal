import { Container, Typography, Box, Stack, Chip } from "@mui/material";
import React from "react";
import Result from "../components/Result";
import styles from "../styles";
import "./Results.css";
import Tag from "../components/Tag";
import useFetch from "../hooks/useFetch";

const Results = ({handleGetTagsByIds,app}) => {
  
  const {data, isPending, error} =  useFetch("http://localhost:8000/files");

  class Results extends React.Component {
    constructor(props) {
      super(props);
      this.handleDisplayResults = this.handleDisplayResults.bind(this);
      this.handleDisplaySearching = this.handleDisplaySearching.bind(this);
      this.handleDisplaySearchParams = this.handleDisplaySearchParams.bind(this);
    }


    handleDisplaySearchParams() {
      return (
        <div>
          {app.state.searchParams.map(
            (param,key) => {
              return (
                <React.Fragment key = {key}>
                  <Tag tagData={param}/>
                </React.Fragment>)})}
        </div>
      )
    }

    handleDisplaySearching() {
      return (
        <div>
          <h1>Searching</h1>
          <div className="loader"></div>
        </div>
      )
    }

    handleDisplayResults() {
      return( 
        <div className="results-table">
          <div className="grid-title">
            <div>Name</div>
            <div>Language</div>
            <div>Topic</div>
            <div>Source</div>
            <div>Date</div>
            <div>Gov Law</div>
          </div>
          {data.map((result,key) => {
            return (
              <button key = {0 + 10*key} >
                <div key = {1 + 10*key} className="grid-element"><p>{result.name}</p></div>
                <div key = {2 + 10*key} className="grid-element"><p>{result.language}</p></div>
                <div key = {3 + 10*key} className="grid-element"><p>{result.topic}</p></div>
                <div key = {4 + 10*key} className="grid-element"><p>{result.source}</p></div>
                <div key = {5 + 10*key} className="grid-element"><p>{result.date}</p></div>
                <div key = {6 + 10*key} className="grid-element"><p>{result.govlaw}</p></div>
                <div key = {7 + 10*key} className="grid-tags">
                {/* load in tags for respective result */}
                {
                  // Finish this when we load data strait into a list of objects
                  handleGetTagsByIds(result.tags).map((tag,key) => {
                    return (
                    <React.Fragment key = {key}>
                      <Tag tagData={tag}/>
                    </React.Fragment>
                    )
                  })
                }
                </div>
              </button>)
          }
          )}
        </div>
      )
    }

    render() {
      return (
        <div className="results-body">
          {/* Refactor this when not tired */}
          {this.handleDisplaySearchParams()}
          {!data && this.handleDisplaySearching()}
          {data && this.handleDisplayResults()}
      </div>
      )
    }
  }

  return (<Results/>);
}

export default Results;
