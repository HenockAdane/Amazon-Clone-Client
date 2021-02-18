import {combineReducers} from "redux"
import shoppingCartReducer from "./shoppingCartReducer"
import userReducer from "./userReducer"

const RootReducer = combineReducers({
    shoppingCartReducer,
    userReducer
    
})

export default RootReducer