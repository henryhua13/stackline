import type {Product, Action} from "../actions/index";
import { ActionType } from "../action-types";

const initialState: Product = {
    "id": "",
    "title": "",
    "image": "",
    "subtitle": "",
    "brand": "",
    "reviews": [],
    "retailer": "",
    "details": [],
    "tags": [],
    "sales": [],
}

const reducer = (state: Product = initialState, action: Action) => {
    switch (action.type) {
        case ActionType.SELECT:
            return action.payload;
        default:
            return state;
    }
};

export default reducer;