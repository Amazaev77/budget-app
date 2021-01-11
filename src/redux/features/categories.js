const initialState = {
  items: [],
  loading: false,
  adding: false
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "categories/load/started":
      return {
        ...state,
        loading: true
      };
    case "categories/load/succeed":
      return {
        ...state,
        loading: false,
        items: action.payload
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
        items: [
          ...state.items,
          action.payload
        ]
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

export const addCategory = (category, categoriesLength) => {
  return dispatch => {
    console.log(category, categoriesLength)
    dispatch({ type: 'category/add/started' });
    fetch('http://localhost:3010/categories', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        "Content-Type": 'application/json'
      },
      body: JSON.stringify({
        id: categoriesLength + 1,
        text: category
      })
    })
      .then(res => res.json())
      .then(expense => {
        dispatch({
          type: 'category/add/succeed',
          payload: {
            id: categoriesLength + 1,
            text: category
          }
        })
      })
  }
}
