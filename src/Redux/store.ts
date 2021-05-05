
import Rootreduser from "./Reduser"

import { createStore, combineReducers,applyMiddleware, Reducer } from "redux"

import thunkMiddleware from "redux-thunk"

import {PageReduser} from "../pages/Reduser/PageReduser"


const store = createStore(Rootreduser,applyMiddleware(thunkMiddleware))

export type RootStore = ReturnType<typeof Rootreduser>

export default store