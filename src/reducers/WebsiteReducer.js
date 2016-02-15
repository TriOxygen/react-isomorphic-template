import SteelCompass from 'lib/SteelCompass';
import createStore from 'lib/createStore';

//const API_URL = 'https://webtask.it.auth0.com/api/run/wt-milomord-gmail_com-0/redux-tutorial-backend?webtask_no_cache=1';
const GET_COURSE = 'website/getCourseById';
const GET_PAGE = 'website/getPage';

const initialState = {
  pages: [],
  loading: false,
  loaded: false,
}

export default createStore(initialState, {
  [GET_COURSE]: (state, action) => {
    return {
      ...state,
      loaded: true,
      pages: action.res
    };
  },
  [GET_PAGE]: (state, action) => {
    return {
      ...state
    }
  }
});

export function getStructure() {
  return {
    type: GET_COURSE,
    promise: SteelCompass.getStructure()
  };
}

export function getPage (id) {
  return {
    type: GET_PAGE,
    promise: SteelCompass.getPage(id)
  };
}

