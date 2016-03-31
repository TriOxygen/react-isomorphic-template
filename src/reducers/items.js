import createReducer from 'lib/createReducer';

const DELETE_ITEM = 'items/delete';
const ADD_ITEM = 'items/add';
const EDIT_ITEM = 'items/edit';

export default createReducer([], {
  [ADD_ITEM]: (state, action) => {
    const item = {
      id: action.content,
      content: action.content
    };
    return [...state, item];
  },
  [DELETE_ITEM]: (state, action) => {
    return state.filter(item => {
      return item.id !== action.id;
    });
  },
  [EDIT_ITEM]: (state, action) => {
    return state.map(item => {
      if (item.id === action.id) {
        return {
          ...item,
          content: action.content
        };
      }
      return item;
    });
  }
})

export function deleteItem (id) {
  return {
    type: DELETE_ITEM,
    id
  };
}

export function editItem (id, content) {
  return {
    type: EDIT_ITEM,
    id,
    content
  };
}

export function addItem (content) {
  return {
    type: ADD_ITEM,
    content: content,
    id: content
  };
}
