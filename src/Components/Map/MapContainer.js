import React from "react"
import { connect } from "react-redux"
import Map from "./Map"
import Loader from "../../UI/Loader/Loader"
// AIzaSyAG4N54TJgsvI_y-omKVtkxuySRk3v0DbI
class MapContainer extends React.Component {
	render() {
		return (
			<div>
				{!this.props.touched ? (
					"Chose a direction"
				) : this.props.directions === null ? (
					<Loader />
				) : (
					<div>
						<Map
							googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAG4N54TJgsvI_y-omKVtkxuySRk3v0DbI&v=3.exp&libraries=geometry,drawing,places"
							loadingElement={<div style={{ height: `100%` }} />}
							containerElement={<div style={{ height: `400px` }} />}
							mapElement={<div style={{ height: `100%` }} />}
							responce={this.props.directions}
						/>
					</div>
				)}
			</div>
		)
	}
}

let mapStateToProps = (state) => ({
	touched: state.mapSection.touched,
	directions: state.mapSection.directions,
})

export default connect(mapStateToProps)(MapContainer)
