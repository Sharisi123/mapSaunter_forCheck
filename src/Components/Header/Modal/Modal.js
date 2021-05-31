import "./Modal.css"
import React, { useState } from "react"
import ModalMapContainer from "./ModalMapContainer"
import { connect } from "react-redux"
import { deployToFireBase } from "../../../Redux/mapReducer"
import createInput from "./createInput"

const Modal = (props) => {
	let [title, setTitle] = useState("")
	let [shortDescription, setShortDescription] = useState("")
	let [fullDescription, setFullDescription] = useState("")
	const mapStyles = {
		width: "100%",
		height: "100%",
		borderRadius: "12px",
		zIndex: 10,
	}
	const containerStyle = {
		position: "relative",
		width: "100%",
		height: "100%",
		zIndex: 10,
	}

	return (
		<div className="modal-backgrond" onClick={props.handleOpened}>
			<div
				className="modal-path"
				onClick={(e) => e.stopPropagation()}
				id="modal-path"
			>
				<div className="header">
					<span>Add new Path</span>
					<div onClick={props.handleOpened} className="modal-close">
						&times;
					</div>
				</div>
				<div className="modal-content">
					{createInput("title", title, setTitle)}
					{createInput("shortDesc", shortDescription, setShortDescription)}
					{createInput("fullDesc", fullDescription, setFullDescription)}
					<div className="modal-deploy-btn">
						<button
							className={`btn btn-primary`}
							disabled={
								!(
									title &&
									shortDescription &&
									fullDescription &&
									props.directionToModalMap
								)
							}
							onClick={() => {
								props.deployToFireBase(
									title,
									shortDescription,
									fullDescription,
									props.directionToModalMap
								)
								props.handleOpened()
							}}
						>
							Добавить путь
						</button>
					</div>
				</div>
				<div className="modal-map" id="modal-map">
					<ModalMapContainer
						googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAG4N54TJgsvI_y-omKVtkxuySRk3v0DbI&v=3.exp&libraries=geometry,drawing,places"
						loadingElement={<div style={{ height: `100%` }} />}
						containerElement={<div style={containerStyle} />}
						mapElement={<div style={mapStyles} />}
					/>
				</div>
			</div>
		</div>
	)
}
let mapStateToProps = (state) => ({
	directionToModalMap: state.mapSection.directionToModalMap,
	directionsToRender: state.mapSection.directionsToRender,
})
export default connect(mapStateToProps, { deployToFireBase })(Modal)
