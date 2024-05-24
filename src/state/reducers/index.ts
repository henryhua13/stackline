import { combineReducers } from "redux";
import productReducer from "./productReducer";

const reducers = combineReducers({
    product: productReducer
});

export default reducers;

export type State = ReturnType<typeof reducers>;