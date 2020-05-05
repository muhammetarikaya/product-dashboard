import {combineReducers} from 'redux'
import dataReducer from "./data.reducer";
import loginReducer from "./login.reducer";
const RootReducer = combineReducers({
    auth: loginReducer,
    data: dataReducer,
})

export default RootReducer