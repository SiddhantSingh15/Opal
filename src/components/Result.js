import React, { Component } from "react";
import config from "../config";
import { ReactComponent as PreviewIcon } from "../assets/preview.svg";
import Tag from "./Tag";
import SearchParam from "../Utils";

export class Result extends Component {
  state = {
    tags: [],
    originalTags: [],
  };

  /* Given a list of tag IDs, returns the ones that are not included in the
  search parameters. */
  getOriginalTags = (tagIDs) => {
    fetch(`${config.searchUrl}/api/v1/tags`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tagIDs),
    })
      .then((res) => res.json())
      .then((res) => {
        const searchTags = this.props.searchParams.map((param) => param.id);
        this.setState({
          tags: res.tags,
          originalTags: res.tags.filter((tag) => !searchTags.includes(tag.id)),
        });
      })
      .catch((e) => console.log(e));
  };

  componentDidMount = () => {
    this.getOriginalTags(this.props.result.tags);
  };

  render() {
    const { result } = this.props;

    return (
      <div className="grid-row">
        <div className="grid-row-properties">
          <div className="grid-element">
            <p>{result.fields.title}</p>
          </div>
          <div className="grid-element">
            <p>{result.fields.language}</p>
          </div>
          <div className="grid-element">
            <p>{result.fields.topic}</p>
          </div>
          <div className="grid-element">
            <p>{result.fields.source}</p>
          </div>
          <div className="grid-element">
            <p>{result.fields.date}</p>
          </div>
          <div className="grid-element">
            <p>{result.fields.govlaw}</p>
          </div>
          <div className="results-element-tags">
            {this.state.originalTags.map((tag, key) => {
              const searchParam = new SearchParam(
                tag.id,
                tag.name,
                "tag",
                true,
                tag
              );
              return (
                <React.Fragment key={key}>
                  <Tag
                    tagData={searchParam}
                    handleClick={() =>
                      this.props.app.handleAddSearchParams([searchParam])
                    }
                  />
                </React.Fragment>
              );
            })}
          </div>
        </div>
        <div
          className="grid-row-buttons"
          onClick={this.handleToggleDocumentView}
        >
          <PreviewIcon />
        </div>
      </div>
    );
  }
}

export default Result;
