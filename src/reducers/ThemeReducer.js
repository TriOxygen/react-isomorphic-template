import createStore from 'lib/createStore';

const CHANGE_THEME = 'theme/change';

const initialState = {
  primary: 'red',
  secondary: 'indigo',
  tertiary: 'grey',
  main: 'light'
};

export default createStore(initialState, {
  [CHANGE_THEME]: (state, action) => {
    const { type, ...other } = action;
    return {
      ...state,
      ...other
    };
  }
})

export function changeTheme (primary, secondary, tertiary, main) {
  return {
    type: CHANGE_THEME,
    primary,
    secondary,
    tertiary,
    main
  };
}
