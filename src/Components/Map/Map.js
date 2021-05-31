import "./Map.css"
import {
	withScriptjs,
	withGoogleMap,
	GoogleMap,
	DirectionsRenderer,
} from "react-google-maps"
import React, { useEffect } from "react"
import { compose } from "redux"
import { connect } from "react-redux"
import { clearCurrentDirections } from "../../Redux/mapReducer"

const Map = ({ responce, clearCurrentDirections }) => {
	let length = responce.direction.routes[0].legs.length
	useEffect(() => {
		return () => {
			clearCurrentDirections()
		}
	})

	return (
		<div>
			<h3>{responce.title}</h3>
			<GoogleMap
				defaultZoom={12}
				defaultCenter={new window.google.maps.LatLng(49.425518, 32.04849)}
			>
				<DirectionsRenderer directions={responce.direction} />
			</GoogleMap>
			<p>
				<b>Distance:</b>{" "}
				{responce.direction.routes[0].legs.reduce(
					(accum, item) => accum + item.distance.value,
					0
				) + " m"}
			</p>
			<p>
				<b>Duration:</b>{" "}
				{Math.round(
					responce.direction.routes[0].legs.reduce(
						(accum, item) => accum + item.duration.value / 60,
						0
					)
				) + " min"}
			</p>
			<p>
				<b>Origin:</b> {responce.direction.routes[0].legs[0].start_address}
			</p>
			<p>
				<b>Destination:</b>{" "}
				{responce.direction.routes[0].legs[length - 1].start_address}
			</p>
		</div>
	)
}

export default compose(
	withScriptjs,
	withGoogleMap,
	connect(null, { clearCurrentDirections })
)(Map)
