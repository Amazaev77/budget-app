import {
  ADD_EXPENSE,
  ADD_EXPENSE_STARTED,
  ADD_EXPENSE_SUCCEEDED,
  COPY_EXPENSE,
  COPY_EXPENSE_STARTED,
  COPY_EXPENSE_SUCCEEDED,
  DELETE_EXPENSE,
  DELETE_EXPENSE_STARTED,
  DELETE_EXPENSE_SUCCEEDED,
  LOAD_EXPENSES,
  LOAD_EXPENSES_STARTED,
  LOAD_EXPENSES_SUCCEEDED,
} from "./types";

const initialState = {
  items: [],
  loading: false,
  adding: false,
  deleting: false,
  copying: false,
  editing: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_EXPENSES_STARTED:
      return {
        ...state,
        loading: true,
      };
    case LOAD_EXPENSES_SUCCEEDED:
      return {
        ...state,
        loading: false,
        items: action.payload,
      };
    case ADD_EXPENSE_STARTED:
      return {
        ...state,
        adding: true,
      };
    case ADD_EXPENSE_SUCCEEDED:
      return {
        ...state,
        adding: false,
        items: [...state.items, action.payload],
      };
    case DELETE_EXPENSE_STARTED:
      return {
        ...state,
        deleting: action.payload,
      };
    case DELETE_EXPENSE_SUCCEEDED:
      return {
        ...state,
        deleting: false,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    case COPY_EXPENSE_STARTED:
      return {
        ...state,
        copying: action.payload,
      };
    case COPY_EXPENSE_SUCCEEDED:
      return {
        ...state,
        copying: false,
        items: [...state.items, action.payload],
      };
    default:
      return state;
  }
}

export const loadExpenses = () => {
  return {
    type: LOAD_EXPENSES,
    payload: {
      api: "/expenses",
      method: "GET",
    },
  };
};

export const showLoaderToExpenses = () => {
  return { type: LOAD_EXPENSES_STARTED };
};

export const putExpenses = (data) => {
  return {
    type: LOAD_EXPENSES_SUCCEEDED,
    payload: data,
  };
};

export const addExpense = (categoryId, sum, comment, date) => {
  return {
    type: ADD_EXPENSE,
    payload: {
      api: "/expenses",
      method: "POST",
      body: {
        categoryId,
        sum,
        comment,
        date,
      },
    },
  };
};

export const showLoaderToAddExpense = () => {
  return { type: ADD_EXPENSE_STARTED };
};

export const putExpense = (payload) => {
  return {
    type: ADD_EXPENSE_SUCCEEDED,
    payload,
  };
};

export const deleteExpense = (id) => {
  return {
    type: DELETE_EXPENSE,
    payload: {
      api: `/expenses/${id}`,
      method: "DELETE",
      id,
    },
  };
};

export const showLoaderToDeleteExpense = () => {
  return { type: DELETE_EXPENSE_STARTED };
};

export const putIdDeletedExpense = (deletedId) => {
  return {
    type: DELETE_EXPENSE_SUCCEEDED,
    payload: deletedId,
  };
};

export const copyExpense = (expense, date) => {
  return {
    type: COPY_EXPENSE,
    payload: {
      api: "/expenses",
      method: "POST",
      body: {
        sum: expense.sum,
        comment: expense.comment,
        categoryId: expense.categoryId,
        date,
      },
    },
  };
};

export const showLoaderToCopyExpense = () => {
  return { type: COPY_EXPENSE_STARTED };
};

export const putCopiedExpense = (expense) => {
  return {
    type: COPY_EXPENSE_SUCCEEDED,
    payload: expense,
  };
};
