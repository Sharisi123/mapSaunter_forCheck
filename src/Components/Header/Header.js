import React from "react"
import "./Header.css"

let Header = (props) => {
	return (
		<header className="header">
			<span className="logo">Saunter</span>
			<button className="btn btn-primary" onClick={props.handleOpened}>
				Add path
			</button>
		</header>
	)
}

export default Header
