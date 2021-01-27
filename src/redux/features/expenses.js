import {
  ADD_EXPENSE,
  ADD_EXPENSE_STARTED,
  ADD_EXPENSE_SUCCEEDED,
  LOAD_EXPENSES,
  LOAD_EXPENSES_STARTED,
  LOAD_EXPENSES_SUCCEEDED
} from './types'

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
    case "expense/delete/started":
      return {
        ...state,
        deleting: action.payload,
      };
    case "expense/delete/succeed":
      return {
        ...state,
        deleting: false,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    case "expense/copy/started":
      return {
        ...state,
        copying: action.payload,
      };
    case "expense/copy/succeed":
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
      method: "GET"
    }
  }
};

export const showLoaderToExpenses = () => {
  return { type: LOAD_EXPENSES_STARTED }
}

export const putExpenses = (data) => {
  return {
    type: LOAD_EXPENSES_SUCCEEDED,
    payload: data
  }
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
        date
      }
    }
  }
};

export const showLoaderToAddExpense = () => {
  return { type: ADD_EXPENSE_STARTED }
}

export const putExpense = (payload) => {
  return {
    type: ADD_EXPENSE_SUCCEEDED,
    payload
  }
}

export const deleteExpense = (id) => {
  return (dispatch) => {
    dispatch({
      type: "expense/delete/started",
      payload: id,
    });

    fetch(`/expenses/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then((res) => res.json())
      .then(() => {
        dispatch({
          type: "expense/delete/succeed",
          payload: id,
        });
      });
  };
};

export const copyExpense = (expense, date) => {
  return (dispatch) => {
    dispatch({
      type: "expense/copy/started",
      payload: expense.id,
    });
    fetch("/expenses", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sum: expense.sum,
        comment: expense.comment,
        categoryId: expense.categoryId,
        date,
      }),
    })
      .then((res) => res.json())
      .then((expenses) => {
        dispatch({
          type: "expense/copy/succeed",
          payload: expenses,
        });
      });
  };
};


// (dispatch) => {
//   dispatch({ type: "expense/add/started" });
//   fetch("/expenses", {
//     method: "POST",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       categoryId,
//       sum,
//       comment,
//       date,
//     }),
//   })
//     .then((res) => res.json())
//     .then((expense) => {
//       dispatch({
//         type: "expense/add/succeed",
//         payload: expense,
//       });
//     });
// };