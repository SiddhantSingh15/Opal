import React from "react";
import Modal from "react-modal"
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
					
				<div>My modal dialog.</div>
				<button onClick={this.props.toggleModal}>Close modal</button>
		</Modal>
		)
	}
}

export default DocumentView;