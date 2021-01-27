import { applyMiddleware, combineReducers, createStore } from "redux";
import expenses from "./features/expenses";
import thunk from "redux-thunk";
import categories from "./features/categories";
import createSagaMiddleware from 'redux-saga';
import rootSaga from './features/sagas/index';
import { logger } from 'redux-logger'

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  expenses,
  categories,
});

export const store = createStore(rootReducer, applyMiddleware(thunk, logger, sagaMiddleware));

sagaMiddleware.run(rootSaga);