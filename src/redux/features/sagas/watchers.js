import { takeEvery } from "redux-saga/effects";
import {
  ADD_CATEGORY,
  ADD_EXPENSE,
  EDIT_CATEGORY,
  LOAD_CATEGORIES,
  LOAD_EXPENSES,
} from "../types";
import {
  workerLoadCategories,
  workerLoadExpenses,
  workerAddExpense,
  workerAddCategory,
  workerEditCategory
} from './workers';

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