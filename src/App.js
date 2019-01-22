import React, { Component } from 'react';

import helper from "./Helper";

import Form from "react-bootstrap/lib/Form";
import Button from "react-bootstrap/lib/Button";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandRock, faHandScissors, faHandPaper, faHandLizard, faHandSpock } from "@fortawesome/free-solid-svg-icons";

library.add(faHandRock)
library.add(faHandScissors)
library.add(faHandPaper)
library.add(faHandLizard)
library.add(faHandSpock)

class App extends Component {
	constructor(props) {
		super(props)

		this.state = {}
	}

	updateChoice = (event) => {
		this.setState({
			choice: event.target.value,
			noneSelected: false
		})
	}

	onSubmit = () => {
		const { choice } = this.state

		if (!choice || !choice.length) {
			this.setState({
				noneSelected: true
			})
		}

		const computerChoice = helper.generateChoice();
		const result = helper.getResult(choice, computerChoice);

		this.setState({
			computerChoice,
			result
		})
	}

	triggerReset = () => {
		this.setState({
			choice: undefined,
			computerChoice: undefined,
			result: undefined,
		})
	}

	getContent = () => {
		const { choice, computerChoice, noneSelected, result } = this.state;

		if (result !== undefined) {
			let resultMessage;
			if (result === 0) {
				resultMessage = "Tie! 😱"
			} else if (result === 1) {
				resultMessage = "You win! 🎉"
			} else {
				resultMessage = "You loose! 😔"
			}

			return (
				<div className="w-50">
					<div className="my-4 row">
						<div className="col-6 d-flex flex-column justify-content-center align-items-center">
							<p>You</p>
							<FontAwesomeIcon size="6x" icon={`hand-${choice}`} />
						</div>
						<div className="col-6 text-center">
							<p>Competitor</p>
							<FontAwesomeIcon size="6x" icon={`hand-${computerChoice}`} />
						</div>
					</div>
					<div className="mt-4 text-center">
						<p className="lead">{resultMessage}</p>
					</div>

					<Button
						variant="outline-light"
						block
						size="lg"
						onClick={this.triggerReset}
					>Play again</Button>
				</div>
			)
		}

		return (
			<Form className="w-50">
				<Form.Group controlId="choice">
					<Form.Label className="display-4">
						Make a choice:
					</Form.Label>
					<Form.Control
						size="lg"
						as="select"
						required
						onChange={this.updateChoice}
						value={choice}
					>
						<option key="0-default" value="">Select one</option>
						{Object.entries(helper.getOptions()).map(([key, {title}], index) => {
							return <option key={`${index}-${key}`} value={key}>{title}</option>
						})}
					</Form.Control>
					{noneSelected && <small>Please select an option.</small>}
				</Form.Group>
				<Button
					variant="outline-light"
					block
					size="lg"
					onClick={this.onSubmit}
				>Chong!</Button>
			</Form>
		);
	}

	render() {
		return (
			<div className="container">
				<div className="vh-100 d-flex flex-column justify-content-center align-items-center">
					{this.getContent()}
				</div>
			</div>
		);
	}
}

export default App;
