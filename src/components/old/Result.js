import React, { Component } from "react";
import config from "../config";
import { Backdrop, Button} from "@mui/material";
import styles from "../styles";
import Summary from "./Summary";
import Tag from "./Tag";
import SearchParam from "../Utils";

export class Result extends Component {
  state = {
    tags: [],
    originalTags: [],
    showPreview: false,
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

  handleClosePreview = () => {
    this.setState({
      showPreview: false,
    });
  };

  handleToggle = () => {
    this.setState({
      showPreview: !this.state.showPreview,
    });
  };

  /* Shows document preview if not clicked on summary button. */
  handleResultClick = (e) => {
    console.log(e.target);
    if (
      !e.target.getAttribute("class") ||
      !e.target.getAttribute("class").includes("clickable")
    ) {
      this.props.handleToggleDocumentView();
    }
  };

  render() {
    const { result } = this.props;
    return (
      <div className="row" onClick={this.handleResultClick}>
        <div className="fields">
          <div className="element">
            <p>{result.fields.title}</p>
          </div>
          <div className="element">
            <p>{result.fields.language}</p>
          </div>
          <div className="element">
            <p>{result.fields.type}</p>
          </div>
          <div className="element">
            <p>{result.fields.govlaw}</p>
          </div>
          <div className="element">
            <p>{result.fields.date}</p>
          </div>
          <div className="element">
            <p>{result.fields.access}</p>
          </div>
          <div className="tags">
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
                      this.props.handleAddSearchParams([searchParam])
                    }
                  />
                </React.Fragment>
              );
            })}
          </div>
        </div>
        <Button
          variant="contained"
          sx={styles.button}
          onClick={this.handleToggle}
          className="clickable buttons"
        >
          SUMMARY
        </Button>
        <Backdrop
          className="clickable"
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={this.state.showPreview}
          onClick={this.handleClosePreview}
        >
          <Summary
            summary=" Excepteur aliquip laboris et incididunt tempor amet aute dolor amet
        culpa et amet. Nostrud culpa veniam minim occaecat culpa officia qui.
        Irure commodo laborum laborum nisi. Occaecat voluptate adipisicing
        consequat duis dolor occaecat dolor ipsum duis. Est dolore labore
        voluptate pariatur eiusmod duis pariatur est aliqua. Consequat aliquip
        anim officia aute dolore veniam minim ullamco. Sint quis fugiat veniam
        eu non. Est nostrud officia ex nostrud. Commodo consectetur exercitation
        adipisicing voluptate."
            title={result.fields.title}
          />
        </Backdrop>
      </div>
    );
  }
}

export default Result;
