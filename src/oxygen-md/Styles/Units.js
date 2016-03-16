const keylineIncrement = 64;

const button = {
  height: 36,
  width: 64,
  fontSize: 14,
  lineHeight: 48,
  dense: {
    height: 32,
    width: 64,
  }
};

const gutter = {
  default: 24,
  more: 32,
  less: 16,
  mini: 8,
};

const floatingActionButton = {
  size: 56,
  miniSize: 40,
};

const dropdown = {
  menuItem: {
    height: 32,
    fontSize: 15,
  },
};

const toolbar = {
  height: 56,
};

const menu = {
  padding: 8,
  margin: 16,
  item: {
    padding: 16,
    margin: 16,
    height: 48,
    dense: {
      height: 32,
    },
  }
};

const list = {
  padding: 8,
  margin: 16,
  item: {
    padding: 16,
    margin: 16,
    height: 56,
    dense: {
      height: 48,
    },
  }
};

const desktop = {
  iconSize: 24,
  borderRadius: 2,
  menu,
  list,
  button,
  floatingActionButton,
  gutter,
  dropdown,
  toolbar,
  keylineIncrement,
  leftNavMenuItemHeight: 48,
  subheaderHeight: 48,
};

const tablet = {
  iconSize: 24,
  borderRadius: 2,
  menu,
  list,
  button,
  floatingActionButton,
  gutter,
  dropdown,
  toolbar,
  keylineIncrement,
  leftNavMenuItemHeight: 48,
  subheaderHeight: 48,
};

const phone = {
  iconSize: 24,
  borderRadius: 2,
  menu,
  list,
  button,
  floatingActionButton,
  gutter,
  dropdown,
  toolbar,
  keylineIncrement,
  leftNavMenuItemHeight: 48,
  subheaderHeight: 48,
};

export default {
  phone,
  tablet,
  desktop
}