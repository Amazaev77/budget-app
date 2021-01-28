import { takeEvery } from "redux-saga/effects";
import {
  ADD_CATEGORY,
  ADD_EXPENSE,
  DELETE_CATEGORY,
  DELETE_EXPENSE,
  EDIT_CATEGORY,
  LOAD_CATEGORIES,
  LOAD_EXPENSES,
  COPY_EXPENSE,
} from "../types";
import {
  workerLoadCategories,
  workerLoadExpenses,
  workerAddExpense,
  workerAddCategory,
  workerEditCategory,
  workerDeleteCategory,
  workerDeleteExpense,
  workerCopyExpense,
} from "./workers";

export function* watchLoadCategories() {
  yield takeEvery(LOAD_CATEGORIES, workerLoadCategories);
}

export function* watchLoadExpenses() {
  yield takeEvery(LOAD_EXPENSES, workerLoadExpenses);
}

export function* watchAddExpense() {
  yield takeEvery(ADD_EXPENSE, workerAddExpense);
}

export function* watchAddCategory() {
  yield takeEvery(ADD_CATEGORY, workerAddCategory);
}

export function* watchEditCategory() {
  yield takeEvery(EDIT_CATEGORY, workerEditCategory);
}

export function* watchDeleteCategory() {
  yield takeEvery(DELETE_CATEGORY, workerDeleteCategory);
}

export function* watchDeleteExpense() {
  yield takeEvery(DELETE_EXPENSE, workerDeleteExpense);
}

export function* watchCopyExpense() {
  yield takeEvery(COPY_EXPENSE, workerCopyExpense);
}
