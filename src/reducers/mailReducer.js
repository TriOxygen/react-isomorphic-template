import api from 'lib/api';
import createReducer from 'lib/createReducer';

const SEND = 'mail/send';

const initialState = {
};

export default createReducer(initialState, {
  [SEND]: (state, action) => {
    return {
      ...action.data
    }
  }
});

export function send(body) {
  return {
    type: SEND,
    promise: api.put('mail', body),
  };
}
