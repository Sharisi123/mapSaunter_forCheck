// import "./ModalMapContainer.css"
import { useEffect, useState } from "react"
import {
	withScriptjs,
	withGoogleMap,
	GoogleMap,
	DirectionsRenderer,
} from "react-google-maps"
import { Marker } from "react-google-maps/lib/components/Marker"
import { connect } from "react-redux"
import { compose } from "redux"
import {
	renderDirection,
	clearDirectionToModalMapAC,
	getDirectionsToRender,
} from "../../../Redux/mapReducer"

const ModalMapContainer = (props) => {
	let m = []
	let [markers, setMarkers] = useState(m.concat())

	useEffect(() => {
		return function () {
			props.clearDirectionToModalMapAC()
		}
	}, [])
	return (
		<>
			<GoogleMap
				defaultZoom={12}
				defaultCenter={new window.google.maps.LatLng(49.425518, 32.04849)}
				onClick={(e) => {
					m.push(e.latLng)
					setMarkers((marker) => [...marker, e.latLng])
				}}
			>
				<DirectionsRenderer directions={props.directionToModalMap} />
				{markers.map((marker, index) => (
					<Marker
						key={index}
						position={{ lat: marker.lat(), lng: marker.lng() }}
					/>
				))}
			</GoogleMap>
			{markers.length > 1 ? (
				<button
					className="modal-add-path-btn"
					className="btn btn-primary"
					onClick={async () => {
						await props.renderDirection(markers)
					}}
				>
					Построить путь
				</button>
			) : null}
		</>
	)
}
let mapStateToProps = (state) => ({
	directionToModalMap: state.mapSection.directionToModalMap,
})
export default compose(
	withScriptjs,
	withGoogleMap,
	connect(mapStateToProps, {
		renderDirection,
		clearDirectionToModalMapAC,
		getDirectionsToRender,
	})
)(ModalMapContainer)
