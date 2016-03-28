import api from 'lib/api';
import createStore from 'lib/createStore';
import persistentStorage from 'lib/persistentStorage';

const SEND = 'mail/send';

const initialState = {
};

export default createStore(initialState, {
  [SEND]: (state, action) => {
    const auth = action.data.data;
    console.log(auth);
    return {
    }
  }
});

export function send(body) {
  return {
    type: SEND,
    promise: api.put('mail', body)
  };
}
