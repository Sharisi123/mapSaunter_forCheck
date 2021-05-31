import * as axios from "axios"

const instance = axios.create({
	baseURL:
		"https://maptz-b2e49-default-rtdb.europe-west1.firebasedatabase.app/",
})

export let mapAPI = {
	getDirections() {
		return instance.get("/-MWeYjhdAcOrIGuTaxbO.json")
	},
	setDirections(directions) {
		return instance.post("/-MWeYjhdAcOrIGuTaxbO.json", directions)
	},
	updateDirections(directions) {
		return instance.put("/-MWeYjhdAcOrIGuTaxbO.json", directions)
	},
}
