import React from "react";
import Modal from "react-modal"
import "./DocumentView.css"

Modal.setAppElement("#root");

class DocumentView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpen: true,
		}
		this.handleToggleModal = this.handleToggleModal.bind(this);
	}

	handleToggleModal() {
		this.setState({isOpen: !this.state.isOpen})
	}

	render() {
		return (
			<Modal
			isOpen={this.state.isOpen}
			onRequestClose={this.handleToggleModal}
			overlayClassName="myoverlay"
			contentLabel="My dialog"
			className="mymodal">
				
			<div>My modal dialog.</div>
			<button onClick={this.handleToggleModal}>Close modal</button>
		</Modal>
		)
	}
}

export default DocumentView;