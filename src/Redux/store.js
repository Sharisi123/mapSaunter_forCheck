import { applyMiddleware, combineReducers, createStore } from "redux"
import thunkMidleWare from "redux-thunk"
import mapReducer from "./mapReducer"

let redusersContainer = combineReducers({
	mapSection: mapReducer,
})
let store = createStore(redusersContainer, applyMiddleware(thunkMidleWare))

window.store = store

export default store
