import { all } from "redux-saga/effects";
import {
  watchAddCategory,
  watchAddExpense,
  watchEditCategory,
  watchLoadCategories,
  watchLoadExpenses,
  watchDeleteCategory,
  watchDeleteExpense,
  watchCopyExpense,
} from "./watchers";

export default function* rootSaga() {
  yield all([
    watchLoadCategories(),
    watchLoadExpenses(),
    watchAddExpense(),
    watchAddCategory(),
    watchEditCategory(),
    watchDeleteCategory(),
    watchDeleteExpense(),
    watchCopyExpense(),
  ]);
}
