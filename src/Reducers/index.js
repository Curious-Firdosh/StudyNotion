import {combineReducers} from "@reduxjs/toolkit"
import authReducer from "../Slices/authSlice"
import cartReducer from "../Slices/cartSlice"
import profileReducer from "../Slices/profileSlice"
import courseReducer from  "../Slices/courseSlice"

const rootReducer = combineReducers({
     auth : authReducer,
     profile : profileReducer,
     cart : cartReducer,
     course : courseReducer
})
export default rootReducer