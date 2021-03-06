import createReducer from 'lib/createReducer';

const ADD = 'userMessage/add';
const NEXT = 'userMessage/next';

const initialState = {
  messages: [],
  id: 0,
  currentMessage: { time: null, message: null }
};

export default createReducer(initialState, {
  [ADD]: (state, action) => {
    if (!action.message) {
      return state;
    }
    const messages = [...state.messages, { time: Date.now(), message: action.message, id: state.id }];
    const currentMessage = messages[0] || { time: null, message: null };
    return {
      messages,
      id: state.id + 1,
      currentMessage
    };
  },
  [NEXT]: (state, action) => {
    const messages = [...state.messages];
    messages.shift();
    const currentMessage = messages[0] || { time: null, id: null, message: null };
    return {
      messages,
      currentMessage
    }
  }
})

export function addMessage (message) {
  return {
    type: ADD,
    message
  };
}

export function nextMessage () {
  return {
    type: NEXT,
  };
}
