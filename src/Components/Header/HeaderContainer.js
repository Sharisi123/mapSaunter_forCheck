import React from "react"
import Header from "./Header"

class HeaderContainer extends React.Component {
	render() {
		return (
			<Header
				handleOpened={this.props.handleOpened}
				loadingElement={<div style={{ height: `100%` }} />}
				containerElement={<div style={{ height: `400px` }} />}
				mapElement={<div style={{ height: `100%` }} />}
			/>
		)
	}
}

export default HeaderContainer
