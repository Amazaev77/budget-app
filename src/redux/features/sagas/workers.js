import { call, put } from "redux-saga/effects";
import {
  putCategories,
  putCategory,
  putEditedCategory,
  putIdDeletedCategory,
  showLoaderToAddCategory,
  showLoaderToCategories,
  showLoaderToDeleteCategory,
  showLoaderToEditCategory,
} from "../categories";
import {
  putCopiedExpense,
  putExpense,
  putExpenses,
  putIdDeletedExpense,
  showLoaderToAddExpense,
  showLoaderToCopyExpense,
  showLoaderToDeleteExpense,
  showLoaderToExpenses,
} from "../expenses";

const loadData = async (api, method, body) => {
  const data = await fetch(api, {
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then((res) => res.json());

  return data;
};

export function* workerLoadCategories({ payload }) {
  const { api, method } = payload;

  yield put(showLoaderToCategories());

  const data = yield call(loadData, api, method);

  yield put(putCategories(data));
}

export function* workerLoadExpenses({ payload }) {
  const { api, method } = payload;

  yield put(showLoaderToExpenses());

  const data = yield call(loadData, api, method);

  yield put(putExpenses(data));
}

export function* workerAddExpense({ payload }) {
  const { api, method, body } = payload;

  yield put(showLoaderToAddExpense());

  const data = yield call(loadData, api, method, body);

  yield put(putExpense(data));
}

export function* workerAddCategory({ payload }) {
  const { api, method, body } = payload;

  yield put(showLoaderToAddCategory());

  const data = yield call(loadData, api, method, body);

  yield put(putCategory(data));
}

export function* workerEditCategory({ payload }) {
  const { api, method, body } = payload;

  yield put(showLoaderToEditCategory());

  const data = yield call(loadData, api, method, body);

  yield put(putEditedCategory(data));
}

export function* workerDeleteCategory({ payload }) {
  const { api, method, id } = payload;

  yield put(showLoaderToDeleteCategory());

  yield call(loadData, api, method);

  yield put(putIdDeletedCategory(id));
}

export function* workerDeleteExpense({ payload }) {
  const { api, method, id } = payload;

  yield put(showLoaderToDeleteExpense());

  yield call(loadData, api, method);

  yield put(putIdDeletedExpense(id));
}

export function* workerCopyExpense({ payload }) {
  const { api, method, body } = payload;

  yield put(showLoaderToCopyExpense());

  const data = yield call(loadData, api, method, body);

  yield put(putCopiedExpense(data));
}
