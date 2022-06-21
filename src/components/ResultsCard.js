import React from "react";
import Tag from "../components/Tag";
import SearchParam from '../Utils.js'
import "./ResultsCard.css"
import Summary from "./Summary.js"
import { Backdrop, Button} from "@mui/material";
import styles from "../styles";

class ResultsCard extends React.Component {

	state = {
		showSummary: false
	}

  handleResultsCardClick = (e) => {
    if (["fields","tags", "element","results-card"].includes(e.target.className)) {
      this.props.handleToggleDocumentView();
    }
  };


	
  handleCloseSummary = () => {
    this.setState({
      showSummary: false,
    });
  };

  handleToggleSummary = () => {
    this.setState({
			showSummary: !this.state.showSummary,
    });
  };

	render() {
		return ( 
			<div className = "results-card" onClick={this.handleResultsCardClick}>
				<div className = "fields"  >
					<div className="element"><p>{this.props.result.fields.title}</p></div>
					<div className="element"><p>{this.props.result.fields.language}</p></div>
					<div className="element"><p>{this.props.result.fields.topic}</p></div>
					<div className="element"><p>{this.props.result.fields.source}</p></div>
					<div className="element"><p>{this.props.result.fields.date}</p></div>
					<div className="element"><p>{this.props.result.fields.govlaw}</p></div>
					<div className="tags">
					{/* load in tags for respective result */}
					{this.props.result.tags.map((tagID,key) => {
						const tag = this.props.app.getResultsTag(tagID);
						if (tag !== null &&
							!this.props.app.state.searchParams.map(param => param.id).includes(tagID)) {
							const searchParam = new SearchParam(tag.id,tag.name,"tag",true,tag)
							return (
								<React.Fragment key = {key}>
									<Tag tagData={searchParam} handleClick={() => this.props.app.handleAddSearchParams([searchParam])}/>
								</React.Fragment>
							)
						}
						return <React.Fragment key = {key}/>
					})}
					</div>
				</div>
        <Button
          variant="contained"
          sx={styles.button}
          onClick={this.handleToggleSummary}
          className="clickable buttons"
        >
          SUMMARY
        </Button>
        <Backdrop
          className="clickable"
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={this.state.showSummary}
          onClick={this.handleCloseSummary}
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
            title={this.props.result.fields.title}
          />
        </Backdrop>
			</div>
			)
	}
}

export default ResultsCard;

