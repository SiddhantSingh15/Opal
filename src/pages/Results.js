import React from "react";
import "./Results.css";
import Tag from "../components/Tag";
import DocumentView from "../components/DocumentView.js";
import { ReactComponent as PreviewIcon } from "../assets/preview.svg";
import { ReactComponent as BackArrow } from "../assets/backarrow.svg";
import SearchParam from "../Utils.js";
import Result from "../components/Result";

class Results extends React.Component {
  state = {
    viewingDoc: false,
  };

  handleDisplaySearchParams = () => {
    return (
      <React.Fragment>
        {this.props.app.state.searchParams.map((param, key) => {
          return (
            <React.Fragment key={key}>
              <Tag
                tagData={param}
                handleClick={() =>
                  this.props.app.handleRemoveSearchParams([param])
                }
              />
            </React.Fragment>
          );
        })}
      </React.Fragment>
    );
  };

  handleDisplaySearching = () => {
    return (
      <div className="searching-notification">
        <h1>Searching</h1>
        <div className="loader"></div>
      </div>
    );
  };

  handleDisplayResults = () => {
    return (
      <div className="results-table">
        <div className="grid-title">
          <div className="grid-element">Title</div>
          <div className="grid-element">Language</div>
          <div className="grid-element">Type</div>
          <div className="grid-element">Gov Law</div>
          <div className="grid-element">Date</div>
          <div className="grid-element">Access</div>
        </div>
        {this.props.app.state.results.map((result, key) => {
          return (
            <Result
              result={result}
              key={key}
              searchParams={this.props.app.state.searchParams}
              handleToggleDocumentView={this.handleToggleDocumentView}
              handleAddSearchParams={this.props.app.handleAddSearchParams}
            />
          );
        })}
      </div>
    );
  };

  handleToggleDocumentView = () => {
    this.setState({ viewingDoc: !this.state.viewingDoc });
  };

  render() {
    return (
      <div className="results-body">
        {/* Popup for previewing the document */}
        <DocumentView
          isOpen={this.state.viewingDoc}
          toggleModal={this.handleToggleDocumentView}
        />

        <div className="results-info-bar">
          <div className="results-search">
            <h1>Results for:</h1>
            <div className="results-search-params">
              {this.handleDisplaySearchParams()}
            </div>
          </div>
          <BackArrow
            className="back-icon"
            onClick={() => this.props.app.handleGoToPage("search")}
          />
        </div>

        {!this.props.app.state.results && this.handleDisplaySearching()}
        {this.props.app.state.results && this.handleDisplayResults()}
      </div>
    );
  }
}

export default Results;
