let createInput = (type, item, setItem) => {
	switch (type) {
		case "title":
			return (
				<div className="modal-title-block">
					<div className="modal-input-title">Title</div>
					<input
						type="text"
						placeholder="Text input"
						value={item}
						onChange={(e) => setItem(e.target.value)}
					/>
				</div>
			)
		case "shortDesc":
			return (
				<div className="modal-short-description">
					<div className="modal-input-title">Short description</div>
					<textarea
						type="text"
						placeholder="Text area"
						value={item}
						onChange={(e) => setItem(e.target.value)}
					/>
				</div>
			)
		case "fullDesc":
			return (
				<div className="modal-full-description">
					<div className="modal-input-title">Full description</div>
					<textarea
						type="text"
						placeholder="Text area"
						value={item}
						onChange={(e) => setItem(e.target.value)}
					/>
				</div>
			)
	}
}
export default createInput
