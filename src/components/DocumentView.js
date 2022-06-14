import React from "react";
import Modal from "react-modal"
import { ReactComponent as CloseIcon } from "../assets/close.svg"
import "./DocumentView.css"

Modal.setAppElement("#root");


class DocumentView extends React.Component {
	constructor(props) {
		super(props);
	}


	render() {
		return (
			<Modal
				isOpen={this.props.isOpen}
				onRequestClose={this.props.toggleModal}
				overlayClassName="myoverlay"
				contentLabel="My dialog"
				className="mymodal">
				<CloseIcon className="closeIcon" onClick={this.props.toggleModal}/>
				<iframe className="document" src ="./document.html"/>
			</Modal>
		)
	}
}

export default DocumentView;