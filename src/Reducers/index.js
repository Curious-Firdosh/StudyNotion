import {combineReducers} from "@reduxjs/toolkit"
import authReducer from "../Slices/authSlice"
import cartReducer from "../Slices/cartSlice"
import profileReducer from "../Slices/profileSlice"

const rootReducer = combineReducers({
     auth : authReducer,
     profile : profileReducer,
     cart : cartReducer
})
export default rootReducer