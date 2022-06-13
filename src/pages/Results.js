import { Container, Typography, Box, Stack, Chip } from "@mui/material";
import React from "react";
import Result from "../components/Result";
import styles from "../styles";
import "./Results.css";
import Tag from "../components/Tag";
import useFetch from "../hooks/useFetch";

const Results = ({app}) => {
  
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
            return (<React.Fragment>
              <button>
                <div key = {key} className="grid-element"><p>{result.name}</p></div>
                <div key = {key} className="grid-element"><p>{result.language}</p></div>
                <div key = {key} className="grid-element"><p>{result.topic}</p></div>
                <div key = {key} className="grid-element"><p>{result.source}</p></div>
                <div key = {key} className="grid-element"><p>{result.date}</p></div>
                <div key = {key} className="grid-element"><p>{result.govlaw}</p></div>
                <div key = {key} className="grid-tags">{result.tags
                  // Finish this when we load data strait into a list of objects
                  // result.tags.map((id,key) => {
                  //   return (
                  //   <React.Fragment key = {key}>
                  //     <Tag tagData={
                  //       app.tags.filter(tag => (tag.id === id)).pop()
                  //     }/>
                  //   </React.Fragment>
                  //   )
                  // })
                }</div>
              </button>
            </React.Fragment>)
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
