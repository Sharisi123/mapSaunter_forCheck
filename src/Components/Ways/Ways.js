import "./Ways.css"
import "./Search/Search.css"
import Loader from "./../../UI/Loader/Loader"
import WaysItem from "./WaysItem/WaysItem"
import { connect } from "react-redux"
import { addElemToStart } from "../../Redux/mapReducer"
import { useState } from "react"

const Ways = (props) => {
	let [value, setValue] = useState("")
	let [directionsToRender] = useState(props.directionsToRender)

	let filteredDirections = props.directionsToRender.filter((dir) =>
		dir.title.toLowerCase().includes(value.toLowerCase())
	)
	return (
		<div className="ways" id="ways">
			<div className="input-group">
				<input
					type="text"
					className="form-control"
					placeholder="Recipient's username"
					aria-label="Recipient's username"
					aria-describedby="basic-addon2"
					onChange={(e) => setValue(e.target.value)}
					value={value}
				/>
			</div>

			<ul className="ways-container">
				{props.directionsToRender.length === 0 ? (
					<Loader />
				) : (
					<>
						{filteredDirections.map((item, index) => (
							<WaysItem
								item={item}
								key={item.id}
								index={index}
								directionsToRender={props.directionsToRender}
								getCurrentDirections={props.getCurrentDirections}
								addElemToStart={props.addElemToStart}
							/>
						))}
					</>
				)}
			</ul>
		</div>
	)
}

const mapStateToProps = (state) => ({
	idKeys: state.mapSection.idKeys,
})

export default connect(mapStateToProps, { addElemToStart })(Ways)
