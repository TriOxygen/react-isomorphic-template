import createStore from 'lib/createStore';

const TOGGLE_DRAWER = 'home/toggleDrawer';
const SET_DRAWER_POSITION = 'home/setDrawerPosition';

const initialState = {
  drawerPosition: 0
};

export default createStore(initialState, {
  [TOGGLE_DRAWER]: (state, action) => {
    return {
      ...state,
      drawerPosition: state.drawerPosition > 0 ? 0 : 1
    };
  },
  [SET_DRAWER_POSITION]: (state, action) => {
    return {
      ...state,
      drawerPosition: action.drawerPosition
    };
  }
})

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
