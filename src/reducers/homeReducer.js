import createReducer from 'lib/createReducer';

const TOGGLE_DRAWER = 'home/toggleDrawer';
const SET_DRAWER_POSITION = 'home/setDrawerPosition';
const OPEN_DRAWER = 'home/openDrawer';
const CLOSE_DRAWER = 'home/closeDrawer';

const initialState = {
  drawerPosition: 0
};

export default createReducer(initialState, {
  [TOGGLE_DRAWER]: (state) => {
    return {
      ...state,
      drawerPosition: state.drawerPosition > 0 ? 0 : 1
    };
  },
  [OPEN_DRAWER]: (state) => {
    return {
      ...state,
      drawerPosition: 1
    };
  },
  [CLOSE_DRAWER]: (state) => {
    return {
      ...state,
      drawerPosition: 0
    };
  },
  [SET_DRAWER_POSITION]: (state, action) => {
    return {
      ...state,
      drawerPosition: action.drawerPosition
    };
  }
})

export function openDrawer() {
  return {
    type: OPEN_DRAWER,
  };
}

export function closeDrawer() {
  return {
    type: CLOSE_DRAWER,
  };
}

export function toggleDrawer() {
  return {
    type: TOGGLE_DRAWER,
  };
}

export function setDrawerPosition(drawerPosition) {
  return {
    type: TOGGLE_DRAWER,
    drawerPosition
  };
}
