import { applyMiddleware, combineReducers, createStore } from "redux";
import expenses from "./features/expenses";
import thunk from "redux-thunk";
import categories from "./features/categories";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./features/sagas/index";
import { createLogger } from "redux-logger";

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  expenses,
  categories,
});

const logger = createLogger({
  collapsed: true,
  diff: true,
});

export const store = createStore(
  rootReducer,
  applyMiddleware( logger, sagaMiddleware)
);

sagaMiddleware.run(rootSaga);
