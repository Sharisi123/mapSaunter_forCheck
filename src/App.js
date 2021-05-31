import "./App.css"
import WaysContainer from "./Components/Ways/WaysContainer"
import MapContainer from "./Components/Map/MapContainer"
import HeaderContainer from "./Components/Header/HeaderContainer"
import Modal from "./Components/Header/Modal/Modal"
import React from "react"

function App() {
	let [opened, setOpened] = React.useState(false)
	let handleOpened = () => {
		setOpened((opened) => !opened)
	}

	return (
		<div className="app">
			<HeaderContainer handleOpened={handleOpened} />
			<WaysContainer />
			<MapContainer />
			{opened ? <Modal handleOpened={handleOpened} /> : ""}
		</div>
	)
}

export default App
