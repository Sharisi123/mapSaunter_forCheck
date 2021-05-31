import { mapAPI } from "../DLL/firebase"

const SET_DIRECTIONS_TO_RENDER = "SET_DIRECTIONS_TO_RENDER"
const SET_TOUCHED = "SET_TOUCHED"
const SET_CURRENT_DIRECTIONS = "SET_CURRENT_DIRECTIONS"
const SET_DIRECTION_TO_MODAL_MAP = "SET_DIRECTION_TO_MODAL_MAP"
const CLEAR_DIRECTION_TO_MODAL_MAP = "CLEAR_DIRECTION_TO_MODAL_MAP"
const CLEAR_CURRENT_DIRECTIONS = "CLEAR_CURRENT_DIRECTIONS"
const SET_ID_KEYS = "SET_ID_KEYS"
const SET_NEW_FAVORITE_CHANGE = "SET_NEW_FAVORITE_CHANGE"

let initialState = {
	directionsToRender: null,
	directionToModalMap: null,
	directions: null,
	loading: true,
	touched: false,
	idKeys: null,
}

let mapReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_DIRECTIONS_TO_RENDER:
			return {
				...state,
				directionsToRender: action.directionsToRender,
			}
		case SET_CURRENT_DIRECTIONS:
			return {
				...state,
				directions: action.directions,
			}
		case SET_DIRECTION_TO_MODAL_MAP:
			return {
				...state,
				directionToModalMap: action.directionToModalMap,
			}
		case CLEAR_DIRECTION_TO_MODAL_MAP:
			return {
				...state,
				directionToModalMap: null,
			}
		case CLEAR_CURRENT_DIRECTIONS:
			return {
				...state,
				directions: null,
			}
		case SET_TOUCHED:
			return {
				...state,
				touched: action.touched,
			}
		case SET_ID_KEYS:
			return {
				...state,
				idKeys: action.idKeys,
			}
		default:
			return state
	}
}

export let getDirectionsToRender = () => (dispatch) => {
	// Дисплей в ul
	mapAPI.getDirections().then((res) => {
		let idKeys = []
		Object.keys(res.data).forEach((key, index) => {
			idKeys.push(key)
		})
		dispatch(setDirectionsToRenderAC(Object.values(res.data)))
		dispatch(setIdKeys(idKeys))
	})
}

export let getCurrentDirections = (index) => (dispatch) => {
	// Выбираем конкретный путь
	dispatch(setTouchedAC(true))
	let directions = window.store.getState().mapSection.directionsToRender[index] // Узнать как правильно
	dispatch(setCurrentDirectionAC(directions))
}

export const setDirectionsToRenderAC = (directionsToRender) => ({
	type: SET_DIRECTIONS_TO_RENDER,
	directionsToRender,
})
export const setCurrentDirectionAC = (directions) => ({
	type: SET_CURRENT_DIRECTIONS,
	directions,
})
export const setTouchedAC = (touched) => ({ type: SET_TOUCHED, touched })
export const setIdKeys = (idKeys) => ({ type: SET_ID_KEYS, idKeys })
export const setDirectionToModalMapAC = (directionToModalMap) => ({
	type: SET_DIRECTION_TO_MODAL_MAP,
	directionToModalMap,
})

export const clearDirectionToModalMapAC = () => ({
	type: CLEAR_DIRECTION_TO_MODAL_MAP,
})
export const clearCurrentDirections = () => ({
	type: CLEAR_CURRENT_DIRECTIONS,
})
export const renderDirection = (markers) => (dispatch) => {
	const DirectionsService = new window.google.maps.DirectionsService()
	let wayp = markers.map((marker) => ({
		location: `${marker.lat()} ${marker.lng()}`,
	}))

	DirectionsService.route(
		{
			origin: new window.google.maps.LatLng(markers[0].lat(), markers[0].lng()),
			destination: new window.google.maps.LatLng(
				markers[markers.length - 1].lat(),
				markers[markers.length - 1].lng()
			),
			travelMode: window.google.maps.TravelMode.WALKING,
			waypoints: wayp,
		},
		(direction, status) => {
			if (status === window.google.maps.DirectionsStatus.OK) {
				dispatch(setDirectionToModalMapAC(direction))
			} else {
				console.error(`error fetching directions ${direction}`)
			}
		}
	)
}

export const deployToFireBase =
	(title, shortDescription, fullDescription, directionToModalMap, id) =>
	async (dispatch) => {
		await mapAPI.setDirections({
			title,
			shortDescription,
			fullDescription,
			direction: directionToModalMap,
			favorite: { change: false },
			id: window.store.getState().mapSection.directionsToRender.length,
		})
	}
export const setNewFavoriteChange = (change, index) => ({
	type: SET_NEW_FAVORITE_CHANGE,
	change,
	index,
})
export const addElemToStart =
	(directions, change, index) => async (dispatch) => {
		let newArr = directions.concat()
		newArr[index].favorite.change = !change
		if (!change === true) {
			newArr.splice(index, 1)
			newArr.unshift(directions[index])
		} else {
			// filter
			let a = newArr.filter((item) => item.favorite.change === true) // to refact
			let b = newArr.filter((item) => item.favorite.change !== true)
			let c = []
			if (a.length !== 0) c.push(...a)
			if (b.length !== 0) c.push(...b)
			newArr = c.concat()
		}
		mapAPI.updateDirections(newArr)
		dispatch(setCurrentDirectionAC(newArr))
	}

export default mapReducer
