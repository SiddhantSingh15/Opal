import React from "react";
import Tag from "../components/Tag";
import SearchParam from '../Utils.js'
import "./ResultsCard.css"

class ResultsCard extends React.Component {
	
	render() {
		return ( 
			<div className = "results-card" onClick={this.props.handlePreview}>
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
			</div>
			)
	}
}

export default ResultsCard;

