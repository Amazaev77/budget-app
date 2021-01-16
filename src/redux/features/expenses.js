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
    case "expenses/load/started":
      return {
        ...state,
        loading: true,
      };
    case "expenses/load/succeed":
      return {
        ...state,
        loading: false,
        items: action.payload,
      };
    case "expense/add/started":
      return {
        ...state,
        adding: true,
      };
    case "expense/add/succeed":
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
  return (dispatch) => {
    dispatch({ type: "expenses/load/started" });
    fetch("/expenses")
      .then((res) => res.json())
      .then((expense) =>
        dispatch({
          type: "expenses/load/succeed",
          payload: expense,
        })
      );
  };
};

export const addExpense = (categoryId, sum, comment, date) => {
  return (dispatch) => {
    dispatch({ type: "expense/add/started" });
    fetch("/expenses", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        categoryId,
        sum,
        comment,
        date,
      }),
    })
      .then((res) => res.json())
      .then((expense) => {
        dispatch({
          type: "expense/add/succeed",
          payload: expense,
        });
      });
  };
};

export const deleteExpense = (id) => {
  return (dispatch) => {
    dispatch({
      type: "expense/delete/started",
      payload: id,
    });

    fetch(`/expenses/${id}`, {
      method: "DELETE",
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
