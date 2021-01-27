import { all } from "redux-saga/effects";
import {
  watchAddCategory,
  watchAddExpense, watchEditCategory,
  watchLoadCategories,
  watchLoadExpenses,
} from './watchers'

export default function* rootSaga() {
  yield all([
    watchLoadCategories(),
    watchLoadExpenses(),
    watchAddExpense(),
    watchAddCategory(),
    watchEditCategory()
  ]);
}

