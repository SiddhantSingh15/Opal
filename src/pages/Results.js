import { Container, Typography, Box, Stack, Chip } from "@mui/material";
import React from "react";
import "./Results.css";
import Tag from "../components/Tag";
import useFetch from "../hooks/useFetch";
import {ReactComponent as PreviewIcon} from "../assets/preview.svg"

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
        <React.Fragment>
          {app.state.searchParams.map(
            (param,key) => {
              return (
                <Tag tagData={param}
                     handleClick={() => alert("You haven't implimented this yet")}
                />)})}
        </React.Fragment>
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
            <div className="grid-element">Name</div>
            <div className="grid-element">Language</div>
            <div className="grid-element">Topic</div>
            <div className="grid-element">Source</div>
            <div className="grid-element">Date</div>
            <div className="grid-element">Gov Law</div>
          </div>
          {data.map((result,key) => {
            return (
              <div className = "grid-row">
                <div className = "grid-row-properties" key = {0 + 10*key} >
                  <div key = {1 + 10*key} className="grid-element"><p>{result.name}</p></div>
                  <div key = {2 + 10*key} className="grid-element"><p>{result.language}</p></div>
                  <div key = {3 + 10*key} className="grid-element"><p>{result.topic}</p></div>
                  <div key = {4 + 10*key} className="grid-element"><p>{result.source}</p></div>
                  <div key = {5 + 10*key} className="grid-element"><p>{result.date}</p></div>
                  <div key = {6 + 10*key} className="grid-element"><p>{result.govlaw}</p></div>
                  <div key = {7 + 10*key} className="results-element-tags">
                  {/* load in tags for respective result */}
                  {
                    handleGetTagsByIds(result.tags).map((tag,key) => {
                      return (
                      <React.Fragment key = {key}>
                        <Tag tagData={tag} handleClick={() => alert("You haven't implimented this yet")}/>
                      </React.Fragment>
                      )
                    })
                  }
                  </div>
                </div>
                <div key = {7 + 10*key} className="grid-row-buttons" onClick={() => alert("You haven't implimented this yet")}>
                    <PreviewIcon/>
                  </div>
              </div>
              )
          }
          )}
        </div>
      )
    }

    render() {
      return (
        <div className="results-body">
          {/* Refactor this when not tired */}
          
          <div className = "results-search">
            <h1>Results for:</h1>
            <div className = "results-search-params">
              {this.handleDisplaySearchParams()}
            </div>
          </div>
          
          {!data && this.handleDisplaySearching()}
          {data && this.handleDisplayResults()}
      </div>
      )
    }
  }

  return (<Results/>);
}

export default Results;
