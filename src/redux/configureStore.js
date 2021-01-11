import { applyMiddleware, combineReducers, createStore } from "redux";
import expenses from "./features/expenses";
import thunk from "redux-thunk";
import categories from "./features/categories";

const rootReducer = combineReducers({
  expenses,
  categories,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
