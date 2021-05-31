import { useState } from "react"

const WaysItem = ({
	getCurrentDirections,
	item,
	index,
	addElemToStart,
	directionsToRender,
}) => {
	let [change, setChange] = useState(item.favorite.change)
	return (
		<div className="ways-item-container">
			<li
				className={`ways-item`}
				onClick={() => {
					getCurrentDirections(index)
				}}
			>
				<div>
					<h5>{item.title}</h5>
				</div>
				<div className="ways-kilometrs">
					<div>
						{item.direction.routes[0].legs.reduce(
							(accum, item) => accum + item.distance.value,
							0
						) + " m"}
					</div>
					<div>
						{Math.round(
							item.direction.routes[0].legs.reduce(
								(accum, item) => accum + item.duration.value / 60,
								0
							)
						) + " min"}
					</div>
				</div>
			</li>
			<div className="favorite">
				<button
					onClick={async () => {
						setChange((change) => !change)
						await addElemToStart(directionsToRender, change, index)
					}}
					key={index}
				>
					<i className={`${change ? "fas" : "far"} fa-star`}></i>
				</button>
			</div>
		</div>
	)
}

export default WaysItem
