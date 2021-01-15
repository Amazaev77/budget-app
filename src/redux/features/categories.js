const initialState = {
  items: [],
  loading: false,
  editing: false,
  adding: false,
  deleting: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "categories/load/started":
      return {
        ...state,
        loading: true,
      };
    case "categories/load/succeed":
      return {
        ...state,
        loading: false,
        items: action.payload,
      };
    case "category/add/started":
      return {
        ...state,
        adding: true,
      };
    case "category/add/succeed":
      return {
        ...state,
        adding: false,
        items: [...state.items, action.payload],
      };
    case "category/edit/started":
      return {
        ...state,
        editing: true,
      };
    case "category/edit/succeed":
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
    case "category/delete/started":
      return {
        ...state,
        deleting: true,
      };
    case "category/delete/succeed":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    default:
      return state;
  }
}

export const loadCategories = () => {
  return (dispatch) => {
    dispatch({ type: "categories/load/started" });

    fetch("http://localhost:3010/categories")
      .then((res) => res.json())
      .then((categories) => {
        dispatch({
          type: "categories/load/succeed",
          payload: categories,
        });
      });
  };
};

export const addCategory = (category) => {
  return (dispatch) => {
    dispatch({ type: "category/add/started" });
    fetch("http://localhost:3010/categories", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: category,
      }),
    })
      .then((res) => res.json())
      .then((expense) => {
        dispatch({
          type: "category/add/succeed",
          payload: {
            id: expense.id,
            text: category,
          },
        });
      });
  };
};

export const editCategory = (id, category) => {
  return (dispatch) => {
    dispatch({ type: "category/edit/started" });

    fetch(`http://localhost:3010/categories/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: category,
      }),
    })
      .then((res) => res.json())
      .then((category) => {
        dispatch({
          type: "category/edit/succeed",
          payload: category,
        });
      });
  };
};

export const deleteCategory = (id) => {
  return (dispatch) => {
    dispatch({ type: "category/delete/started" });

    fetch(`http://localhost:3010/categories/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        dispatch({
          type: "category/delete/succeed",
          payload: id,
        });
      });
  };
};
