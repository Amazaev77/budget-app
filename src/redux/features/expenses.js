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
        deleting: true,
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
        copying: true,
      };
    case "expense/copy/succeed":
      return {
        ...state,
        copying: false,
        items: [
          ...state.items,
          {
            ...action.payload.expense,
            id: action.payload.expensesLength + 1,
          },
        ],
      };
    case "expense/edit/started":
      return {
        ...state,
        editing: true,
      };
    case "expense/edit/succeed":
      return {
        ...state,
        editing: false,
        items: state.items.map((item) => {
          if (item.id === action.payload.id) {
            return action.payload;
          }

          return item;
        }),
      };
    default:
      return state;
  }
}

export const loadExpenses = () => {
  return (dispatch) => {
    dispatch({ type: "expenses/load/started" });
    fetch("http://localhost:3010/expenses")
      .then((res) => res.json())
      .then((expense) =>
        dispatch({
          type: "expenses/load/succeed",
          payload: expense,
        })
      );
  };
};

export const addExpense = (category, sum, comment, expensesLength, date) => {
  return (dispatch) => {
    dispatch({ type: "expense/add/started" });
    fetch("http://localhost:3010/expenses", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        category,
        sum,
        comment,
        date,
        id: expensesLength + 1
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
    dispatch({ type: "expense/delete/started" });

    fetch(`http://localhost:3010/expenses/${id}`, {
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

export const copyExpense = (expense, expensesLength) => {
  return (dispatch) => {
    dispatch({ type: "expense/copy/started" });

    fetch("http://localhost:3010/expenses", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        ...expense,
        id: expensesLength + 1,
      }),
    })
      .then((res) => res.json())
      .then((expense) => {
        dispatch({
          type: "expense/copy/succeed",
          payload: {
            expense,
            expensesLength,
          },
        });
      });
  };
};

export const editExpense = (id, sum, comment, category) => {
  return (dispatch) => {
    dispatch({ type: "expense/edit/started" });

    fetch(`http://localhost:3010/expenses/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sum,
        comment,
        category,
      }),
    })
      .then((res) => res.json())
      .then((expense) => {
        dispatch({
          type: "expense/edit/succeed",
          payload: expense,
        });
      });
  };
};
