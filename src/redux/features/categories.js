import {
  ADD_CATEGORY,
  ADD_CATEGORY_STARTED,
  ADD_CATEGORY_SUCCEEDED,
  DELETE_CATEGORY,
  DELETE_CATEGORY_STARTED,
  DELETE_CATEGORY_SUCCEEDED,
  EDIT_CATEGORY,
  EDIT_CATEGORY_STARTED,
  EDIT_CATEGORY_SUCCEEDED,
  LOAD_CATEGORIES,
  LOAD_CATEGORIES_STARTED,
  LOAD_CATEGORIES_SUCCEEDED,
} from "./types";

const initialState = {
  items: [],
  loading: false,
  editing: false,
  adding: false,
  deleting: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_CATEGORIES_STARTED:
      return {
        ...state,
        loading: true,
      };
    case LOAD_CATEGORIES_SUCCEEDED:
      return {
        ...state,
        loading: false,
        items: action.payload,
      };
    case ADD_CATEGORY_STARTED:
      return {
        ...state,
        adding: true,
      };
    case ADD_CATEGORY_SUCCEEDED:
      return {
        ...state,
        adding: false,
        items: [...state.items, action.payload],
      };
    case EDIT_CATEGORY_STARTED:
      return {
        ...state,
        editing: true,
      };
    case EDIT_CATEGORY_SUCCEEDED:
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
    case DELETE_CATEGORY_STARTED:
      return {
        ...state,
        deleting: true,
      };
    case DELETE_CATEGORY_SUCCEEDED:
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    default:
      return state;
  }
}

export const loadCategories = () => {
  return {
    type: LOAD_CATEGORIES,
    payload: {
      api: "/categories",
      method: "GET",
    },
  };
};

export const showLoaderToCategories = () => {
  return { type: LOAD_CATEGORIES_STARTED };
};

export const putCategories = (data) => {
  return {
    type: LOAD_CATEGORIES_SUCCEEDED,
    payload: data,
  };
};

export const addCategory = (category) => {
  return {
    type: ADD_CATEGORY,
    payload: {
      api: "/categories",
      method: "POST",
      body: { text: category },
    },
  };
};

export const showLoaderToAddCategory = () => {
  return { type: ADD_CATEGORY_STARTED };
};

export const putCategory = (payload) => {
  return {
    type: ADD_CATEGORY_SUCCEEDED,
    payload,
  };
};

export const editCategory = (id, category) => {
  return {
    type: EDIT_CATEGORY,
    payload: {
      api: `/categories/${id}`,
      method: "PATCH",
      body: { text: category },
    },
  };
};

export const showLoaderToEditCategory = () => {
  return { type: EDIT_CATEGORY_STARTED };
};

export const putEditedCategory = (payload) => {
  return {
    type: EDIT_CATEGORY_SUCCEEDED,
    payload,
  };
};

export const deleteCategory = (id) => {
  return {
    type: DELETE_CATEGORY,
    payload: {
      api: `/categories/${id}`,
      method: "DELETE",
      id,
    },
  };
};

export const showLoaderToDeleteCategory = () => {
  return { type: DELETE_CATEGORY_STARTED };
};

export const putIdDeletedCategory = (deletedId) => {
  return {
    type: DELETE_CATEGORY_SUCCEEDED,
    payload: deletedId,
  };
};
