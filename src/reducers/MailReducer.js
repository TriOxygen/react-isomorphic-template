import api from 'lib/api';
import createStore from 'lib/createStore';

const SEND = 'mail/send';

const initialState = {
};

export default createStore(initialState, {
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
