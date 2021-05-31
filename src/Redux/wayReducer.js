// import { pathAPI } from "../DLL/firebase"

// const SET_WAYS_IN_STORE = "SET_WAYS_IN_STORE"

// let initialState = {
// 	ways: [],
// }

// let wayReducer = (state = initialState, action) => {
// 	switch (action.type) {
// 		case SET_WAYS_IN_STORE:
// 			return {
// 				...state,
// 				ways: action.ways,
// 			}

// 		default:
// 			return state
// 	}
// }

// export let getWays = () => (dispath) => {
// 	pathAPI.getPath().then((res) => dispath(setWaysInStore(res.data)))
// }
// export const setWaysInStore = (ways) => ({ type: SET_WAYS_IN_STORE, ways })

// export default wayReducer
