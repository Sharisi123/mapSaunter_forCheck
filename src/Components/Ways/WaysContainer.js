import React from "react"
import { connect } from "react-redux"
import {
	getDirectionsToRender,
	getCurrentDirections,
	clearCurrentDirections,
} from "./../../Redux/mapReducer"
import Ways from "./Ways"
import Loader from "../../UI/Loader/Loader"
class WaysContainer extends React.Component {
	constructor() {
		super()
		this.state = {
			change: false,
		}
	}
	componentDidMount() {
		this.props.getDirectionsToRender()
	}
	// componentDidUpdate() {
	// 	this.props.getDirectionsToRender()
	// }

	render() {
		return (
			<div>
				{this.props.directionsToRender === null ? (
					<Loader />
				) : (
					<>
						<Ways
							directionsToRender={this.props.directionsToRender}
							getCurrentDirections={this.props.getCurrentDirections}
							clearCurrentDirections={this.props.clearCurrentDirections}
						/>
					</>
				)}
			</div>
		)
	}
}

let mapStateToProps = (state) => ({
	directionsToRender: state.mapSection.directionsToRender,
})

export default connect(mapStateToProps, {
	getDirectionsToRender,
	getCurrentDirections,
	clearCurrentDirections,
})(WaysContainer)
