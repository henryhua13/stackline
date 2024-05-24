import type {Product, Action} from "../actions/index";
import { ActionType } from "../action-types";
import { Dispatch } from "redux";

export const selectProduct = (product: Product) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.SELECT,
            payload: product,
        })
    }
}