const lightText = {
  divider: 'rgba(255, 255, 255, 0.12)',
  disabled: 'rgba(255, 255, 255, 0.30)',
  secondary: 'rgba(255, 255, 255, 0.70)',
  default: 'rgba(255, 255, 255, 1)',
};

const darkText = {
  divider: 'rgba(0, 0, 0, 0.12)',
  disabled: 'rgba(0, 0, 0, 0.26)',
  secondary: 'rgba(0, 0, 0, 0.54)',
  default: 'rgba(0, 0, 0, 0.87)',
};

const textColors = {
  light: lightText,
  dark: darkText
};

const materialColors = {
  red: {
    '50': { hex: '#FFEBEE', text: darkText },
    '100': { hex: '#FFCDD2', text: darkText },
    '200': { hex: '#EF9A9A', text: darkText },
    '300': { hex: '#E57373', text: darkText },
    '400': { hex: '#EF5350', text: lightText },
    '500': { hex: '#F44336', text: lightText },
    '600': { hex: '#E53935', text: lightText },
    '700': { hex: '#D32F2F', text: lightText },
    '800': { hex: '#C62828', text: lightText },
    '900': { hex: '#B71C1C', text: lightText },
    'A100': { hex: '#FF8A80', text: darkText },
    'A200': { hex: '#FF5252', text: lightText },
    'A400': { hex: '#FF1744', text: lightText },
    'A700': { hex: '#D50000', text: lightText },
  },
  pink: {
    '50': { hex: '#FCE4EC', text: darkText },
    '100': { hex: '#F8BBD0', text: darkText },
    '200': { hex: '#F48FB1', text: darkText },
    '300': { hex: '#F06292', text: lightText },
    '400': { hex: '#EC407A', text: lightText },
    '500': { hex: '#E91E63', text: lightText },
    '600': { hex: '#D81B60', text: lightText },
    '700': { hex: '#C2185B', text: lightText },
    '800': { hex: '#AD1457', text: lightText },
    '900': { hex: '#880E4F', text: lightText },
    'A100': { hex: '#FF80AB', text: darkText },
    'A200': { hex: '#FF4081', text: lightText },
    'A400': { hex: '#F50057', text: lightText },
    'A700': { hex: '#C51162', text: lightText },
  },
  purple: {
    '50': { hex: '#F3E5F5', text: darkText },
    '100': { hex: '#E1BEE7', text: darkText },
    '200': { hex: '#CE93D8', text: darkText },
    '300': { hex: '#BA68C8', text: lightText },
    '400': { hex: '#AB47BC', text: lightText },
    '500': { hex: '#9C27B0', text: lightText },
    '600': { hex: '#8E24AA', text: lightText },
    '700': { hex: '#7B1FA2', text: lightText },
    '800': { hex: '#6A1B9A', text: lightText },
    '900': { hex: '#4A148C', text: lightText },
    'A100': { hex: '#EA80FC', text: darkText },
    'A200': { hex: '#E040FB', text: lightText },
    'A400': { hex: '#D500F9', text: lightText },
    'A700': { hex: '#AA00FF', text: lightText },
  },
  deepPurple: {
    '50': { hex: '#EDE7F6', text: darkText },
    '100': { hex: '#D1C4E9', text: darkText },
    '200': { hex: '#B39DDB', text: darkText },
    '300': { hex: '#9575CD', text: lightText },
    '400': { hex: '#7E57C2', text: lightText },
    '500': { hex: '#673AB7', text: lightText },
    '600': { hex: '#5E35B1', text: lightText },
    '700': { hex: '#512DA8', text: lightText },
    '800': { hex: '#4527A0', text: lightText },
    '900': { hex: '#311B92', text: lightText },
    'A100': { hex: '#B388FF', text: darkText },
    'A200': { hex: '#7C4DFF', text: lightText },
    'A400': { hex: '#651FFF', text: lightText },
    'A700': { hex: '#6200EA', text: lightText },
  },
  indigo: {
    '50': { hex: '#E8EAF6', text: darkText },
    '100': { hex: '#C5CAE9', text: darkText },
    '200': { hex: '#9FA8DA', text: darkText },
    '300': { hex: '#7986CB', text: lightText },
    '400': { hex: '#5C6BC0', text: lightText },
    '500': { hex: '#3F51B5', text: lightText },
    '600': { hex: '#3949AB', text: lightText },
    '700': { hex: '#303F9F', text: lightText },
    '800': { hex: '#283593', text: lightText },
    '900': { hex: '#1A237E', text: lightText },
    'A100': { hex: '#8C9EFF', text: darkText },
    'A200': { hex: '#536DFE', text: lightText },
    'A400': { hex: '#3D5AFE', text: lightText },
    'A700': { hex: '#304FFE', text: lightText },
  },
  blue: {
    '50': { hex: '#E3F2FD', text: darkText },
    '100': { hex: '#BBDEFB', text: darkText },
    '200': { hex: '#90CAF9', text: darkText },
    '300': { hex: '#64B5F6', text: darkText },
    '400': { hex: '#42A5F5', text: darkText },
    '500': { hex: '#2196F3', text: lightText },
    '600': { hex: '#1E88E5', text: lightText },
    '700': { hex: '#1976D2', text: lightText },
    '800': { hex: '#1565C0', text: lightText },
    '900': { hex: '#0D47A1', text: lightText },
    'A100': { hex: '#82B1FF', text: darkText },
    'A200': { hex: '#448AFF', text: lightText },
    'A400': { hex: '#2979FF', text: lightText },
    'A700': { hex: '#2962FF', text: lightText },
  },
  lightBlue: {
    '50': { hex: '#E1F5FE', text: darkText },
    '100': { hex: '#B3E5FC', text: darkText },
    '200': { hex: '#81D4FA', text: darkText },
    '300': { hex: '#4FC3F7', text: darkText },
    '400': { hex: '#29B6F6', text: darkText },
    '500': { hex: '#03A9F4', text: darkText },
    '600': { hex: '#039BE5', text: lightText },
    '700': { hex: '#0288D1', text: lightText },
    '800': { hex: '#0277BD', text: lightText },
    '900': { hex: '#01579B', text: lightText },
    'A100': { hex: '#80D8FF', text: darkText },
    'A200': { hex: '#40C4FF', text: darkText },
    'A400': { hex: '#00B0FF', text: darkText },
    'A700': { hex: '#0091EA', text: lightText },
  },
  cyan: {
    '50': { hex: '#E0F7FA', text: darkText },
    '100': { hex: '#B2EBF2', text: darkText },
    '200': { hex: '#80DEEA', text: darkText },
    '300': { hex: '#4DD0E1', text: darkText },
    '400': { hex: '#26C6DA', text: darkText },
    '500': { hex: '#00BCD4', text: darkText },
    '600': { hex: '#00ACC1', text: darkText },
    '700': { hex: '#0097A7', text: lightText },
    '800': { hex: '#00838F', text: lightText },
    '900': { hex: '#006064', text: lightText },
    'A100': { hex: '#84FFFF', text: darkText },
    'A200': { hex: '#18FFFF', text: darkText },
    'A400': { hex: '#00E5FF', text: darkText },
    'A700': { hex: '#00B8D4', text: darkText },
  },
  teal: {
    '50': { hex: '#E0F2F1', text: darkText },
    '100': { hex: '#B2DFDB', text: darkText },
    '200': { hex: '#80CBC4', text: darkText },
    '300': { hex: '#4DB6AC', text: darkText },
    '400': { hex: '#26A69A', text: darkText },
    '500': { hex: '#009688', text: lightText },
    '600': { hex: '#00897B', text: lightText },
    '700': { hex: '#00796B', text: lightText },
    '800': { hex: '#00695C', text: lightText },
    '900': { hex: '#004D40', text: lightText },
    'A100': { hex: '#A7FFEB', text: darkText },
    'A200': { hex: '#64FFDA', text: darkText },
    'A400': { hex: '#1DE9B6', text: darkText },
    'A700': { hex: '#00BFA5', text: darkText },
  },
  green: {
    '50': { hex: '#E8F5E9', text: darkText },
    '100': { hex: '#C8E6C9', text: darkText },
    '200': { hex: '#A5D6A7', text: darkText },
    '300': { hex: '#81C784', text: darkText },
    '400': { hex: '#66BB6A', text: darkText },
    '500': { hex: '#4CAF50', text: darkText },
    '600': { hex: '#43A047', text: lightText },
    '700': { hex: '#388E3C', text: lightText },
    '800': { hex: '#2E7D32', text: lightText },
    '900': { hex: '#1B5E20', text: lightText },
    'A100': { hex: '#B9F6CA', text: darkText },
    'A200': { hex: '#69F0AE', text: darkText },
    'A400': { hex: '#00E676', text: darkText },
    'A700': { hex: '#00C853', text: darkText },
  },
  lightGreen: {
    '50': { hex: '#F1F8E9', text: darkText },
    '100': { hex: '#DCEDC8', text: darkText },
    '200': { hex: '#C5E1A5', text: darkText },
    '300': { hex: '#AED581', text: darkText },
    '400': { hex: '#9CCC65', text: darkText },
    '500': { hex: '#8BC34A', text: darkText },
    '600': { hex: '#7CB342', text: darkText },
    '700': { hex: '#689F38', text: lightText },
    '800': { hex: '#558B2F', text: lightText },
    '900': { hex: '#33691E', text: lightText },
    'A100': { hex: '#CCFF90', text: darkText },
    'A200': { hex: '#B2FF59', text: darkText },
    'A400': { hex: '#76FF03', text: darkText },
    'A700': { hex: '#64DD17', text: darkText },
  },
  lime: {
    '50': { hex: '#F9FBE7', text: darkText },
    '100': { hex: '#F0F4C3', text: darkText },
    '200': { hex: '#E6EE9C', text: darkText },
    '300': { hex: '#DCE775', text: darkText },
    '400': { hex: '#D4E157', text: darkText },
    '500': { hex: '#CDDC39', text: darkText },
    '600': { hex: '#C0CA33', text: darkText },
    '700': { hex: '#AFB42B', text: darkText },
    '800': { hex: '#9E9D24', text: darkText },
    '900': { hex: '#827717', text: lightText },
    'A100': { hex: '#F4FF81', text: darkText },
    'A200': { hex: '#EEFF41', text: darkText },
    'A400': { hex: '#C6FF00', text: darkText },
    'A700': { hex: '#AEEA00', text: darkText },

  },
  yellow: {
    '50': { hex: '#FFFDE7', text: darkText },
    '100': { hex: '#FFF9C4', text: darkText },
    '200': { hex: '#FFF59D', text: darkText },
    '300': { hex: '#FFF176', text: darkText },
    '400': { hex: '#FFEE58', text: darkText },
    '500': { hex: '#FFEB3B', text: darkText },
    '600': { hex: '#FDD835', text: darkText },
    '700': { hex: '#FBC02D', text: darkText },
    '800': { hex: '#F9A825', text: darkText },
    '900': { hex: '#F57F17', text: darkText },
    'A100': { hex: '#FFFF8D', text: darkText },
    'A200': { hex: '#FFFF00', text: darkText },
    'A400': { hex: '#FFEA00', text: darkText },
    'A700': { hex: '#FFD600', text: darkText },

  },
  amber: {
    '50': { hex: '#FFF8E1', text: darkText },
    '100': { hex: '#FFECB3', text: darkText },
    '200': { hex: '#FFE082', text: darkText },
    '300': { hex: '#FFD54F', text: darkText },
    '400': { hex: '#FFCA28', text: darkText },
    '500': { hex: '#FFC107', text: darkText },
    '600': { hex: '#FFB300', text: darkText },
    '700': { hex: '#FFA000', text: darkText },
    '800': { hex: '#FF8F00', text: darkText },
    '900': { hex: '#FF6F00', text: darkText },
    'A100': { hex: '#FFE57F', text: darkText },
    'A200': { hex: '#FFD740', text: darkText },
    'A400': { hex: '#FFC400', text: darkText },
    'A700': { hex: '#FFAB00', text: darkText },

  },
  orange: {
    '50': { hex: '#FFF3E0', text: darkText },
    '100': { hex: '#FFE0B2', text: darkText },
    '200': { hex: '#FFCC80', text: darkText },
    '300': { hex: '#FFB74D', text: darkText },
    '400': { hex: '#FFA726', text: darkText },
    '500': { hex: '#FF9800', text: darkText },
    '600': { hex: '#FB8C00', text: darkText },
    '700': { hex: '#F57C00', text: darkText },
    '800': { hex: '#EF6C00', text: lightText },
    '900': { hex: '#E65100', text: lightText },
    'A100': { hex: '#FFD180', text: darkText },
    'A200': { hex: '#FFAB40', text: darkText },
    'A400': { hex: '#FF9100', text: darkText },
    'A700': { hex: '#FF6D00', text: darkText },

  },
  deepOrange: {
    '50': { hex: '#FBE9E7', text: darkText },
    '100': { hex: '#FFCCBC', text: darkText },
    '200': { hex: '#FFAB91', text: darkText },
    '300': { hex: '#FF8A65', text: darkText },
    '400': { hex: '#FF7043', text: darkText },
    '500': { hex: '#FF5722', text: lightText },
    '600': { hex: '#F4511E', text: lightText },
    '700': { hex: '#E64A19', text: lightText },
    '800': { hex: '#D84315', text: lightText },
    '900': { hex: '#BF360C', text: lightText },
    'A100': { hex: '#FF9E80', text: darkText },
    'A200': { hex: '#FF6E40', text: darkText },
    'A400': { hex: '#FF3D00', text: lightText },
    'A700': { hex: '#DD2C00', text: lightText },

  },
  brown: {
    '50': { hex: '#EFEBE9', text: darkText },
    '100': { hex: '#D7CCC8', text: darkText },
    '200': { hex: '#BCAAA4', text: darkText },
    '300': { hex: '#A1887F', text: lightText },
    '400': { hex: '#8D6E63', text: lightText },
    '500': { hex: '#795548', text: lightText },
    '600': { hex: '#6D4C41', text: lightText },
    '700': { hex: '#5D4037', text: lightText },
    '800': { hex: '#4E342E', text: lightText },
    '900': { hex: '#3E2723', text: lightText },
  },
  grey: {
    '50': { hex: '#FAFAFA', text: darkText },
    '100': { hex: '#F5F5F5', text: darkText },
    '200': { hex: '#EEEEEE', text: darkText },
    '300': { hex: '#E0E0E0', text: darkText },
    '400': { hex: '#BDBDBD', text: darkText },
    '500': { hex: '#9E9E9E', text: darkText },
    '600': { hex: '#757575', text: lightText },
    '700': { hex: '#616161', text: lightText },
    '800': { hex: '#424242', text: lightText },
    '850': { hex: '#303030', text: lightText },
    '900': { hex: '#212121', text: lightText },
  },
  blueGrey: {
    '50': { hex: '#ECEFF1', text: darkText },
    '100': { hex: '#CFD8DC', text: darkText },
    '200': { hex: '#B0BEC5', text: darkText },
    '300': { hex: '#90A4AE', text: darkText },
    '400': { hex: '#78909C', text: lightText },
    '500': { hex: '#607D8B', text: lightText },
    '600': { hex: '#546E7A', text: lightText },
    '700': { hex: '#455A64', text: lightText },
    '800': { hex: '#37474F', text: lightText },
    '900': { hex: '#263238', text: lightText },
  },
  white: { hex: '#FFFFFF', text: darkText },
  black: { hex: '#000000', text: lightText },

};

const themeColors = {
  light: {
    statusBar: materialColors.grey[300],
    appBar: materialColors.grey[100],
    background: materialColors.grey[50],
    card: materialColors.white,
  },
  dark: {
    statusBar: materialColors.black,
    appBar: materialColors.grey[900],
    background: materialColors.grey[850],
    card: materialColors.grey[800],
  }
};

const buttonColors = {
  light: {
    flat: {
      hover: 'rgba(153, 153, 153, 0.2)',
      active: 'rgba(153, 153, 153, 0.4)',
    },
    raised: {
      disabled: 'rgba(0, 0, 0, 0.12)'
    }
  },
  dark: {
    flat: {
      hover: 'rgba(204, 204, 204, 0.15)',
      active: 'rgba(204, 204, 204, 0.25)',
    },
    raised: {
      disabled: 'rgba(255, 255, 255, 0.12)'
    }
  }
};

const snackBar = {
  light: {
    background: 'rgba(0, 0, 0, 0.75)',
    text: textColors.light.default,
  },
  dark: {
    background: 'rgba(255, 255, 255, 0.75)',
    text: textColors.dark.default,
  }
}

const Colors = {
  material: materialColors,
  text: textColors,
  theme: themeColors,
  button: buttonColors,
  snackBar: snackBar,
  black: '#000000',
  white: '#ffffff',

  transparent: 'rgba(0, 0, 0, 0)',
  fullBlack: 'rgba(0, 0, 0, 1)',
  darkBlack: 'rgba(0, 0, 0, 0.87)',
  lightBlack: 'rgba(0, 0, 0, 0.54)',
  minBlack: 'rgba(0, 0, 0, 0.26)',
  faintBlack: 'rgba(0, 0, 0, 0.12)',
  fullWhite: 'rgba(255, 255, 255, 1)',
  darkWhite: 'rgba(255, 255, 255, 0.87)',
  lightWhite: 'rgba(255, 255, 255, 0.54)',
  minWhite: 'rgba(255, 255, 255, 0.26)',
  faintWhite: 'rgba(255, 255, 255, 0.12)',
};

export default Colors;
