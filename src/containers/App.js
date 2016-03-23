import React, { PropTypes } from 'react';
import CSSPropertyOperations from 'react/lib/CSSPropertyOperations';
import { connect } from 'react-redux';
import { setLocale } from 'lib/I18n';
import { Drawer, DrawerHeader, MenuItem } from 'oxygen-md';
import { addMessages, translate as _l } from 'lib/I18n';
import SocialPerson from 'oxygen-md-svg-icons/lib/SvgIcons/SocialPerson';
import ImagePalette from 'oxygen-md-svg-icons/lib/SvgIcons/ImagePalette';
import ActionHome from 'oxygen-md-svg-icons/lib/SvgIcons/ActionHome';
import { bindActionCreators } from 'redux';
import { routeActions } from 'react-router-redux';
import * as homeActions from 'reducers/HomeReducer';
import Hammer from 'components/Hammer';

addMessages({
  ['en-US']: {
    'Home': 'Home',
    'Users': 'Users',
    'Theme Changer': 'Theme Changer'
  }
});

const appStyles = oxygenCss({
  HTML: {
    width: '100%',
    height: '100%',
    fontFamily: `'Source Sans Pro', sans-serif`,
    fontSize: 14,
    fontWeight: 300,
  },
  BODY: {
    width: '100%',
    height: '100%',
    fontFamily: `'Source Sans Pro', sans-serif`,
    fontSize: 14,
    fontWeight: 300,
  },
  root: {
    height: '100%',
    position: 'relative',
    zIndex: 1,
  }
})

import { Colors, Theme } from 'oxygen-md/Styles';
const { material } = Colors;

class App extends React.Component {

  static childContextTypes = {
    theme: PropTypes.object,
  };

  static propTypes = {
    children: PropTypes.object,
    locale: PropTypes.object,
    drawerPosition: PropTypes.number,
    toggleDrawer: PropTypes.func,
    setDrawerPosition: PropTypes.func,
    theme: PropTypes.object
  };

  state = {
    position: 0
  };

  constructor() {
    super(...arguments);
    const { primary, secondary, tertiary, main } = this.props.theme;
    this.theme = new Theme(material[primary], material[secondary], material[tertiary], main);
  }

  getChildContext() {
    return {
      theme: this.theme
    };
  }

  componentDidMount() {
    // const node = document.getElementById('app');
    // node.className = appStyles.root;
    // CSSPropertyOperations.setValueForStyles(node, this.getStyle());
  }

  componentDidUpdate() {
    const node = document.getElementById('app');
    CSSPropertyOperations.setValueForStyles(node, this.getStyle());
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.theme !== nextProps.theme) {
      const { primary, secondary, tertiary, main } = nextProps.theme;
      this.theme.setTheme(material[primary], material[secondary], material[tertiary], main);
      this.forceUpdate();
    }
    if (this.props.locale !== nextProps.locale) {
      const { locale, defaultCurrency } = nextProps.locale;
      setLocale(locale, defaultCurrency);
      this.forceUpdate();
    }
  }

  getStyle() {
    const theme = this.theme;
    return {
      backgroundColor: theme.theme.background.hex,
      color: theme.text.default,
    };
  }

  drawer = (event) => {
    const { toggleDrawer } = this.props;
    toggleDrawer();
  };

  pan = (event) => {
    const position = event.deltaX > 500 ? 1 : event.deltaX / 500;
    const { drawerPosition } = this.props;
    if (position > 0.5 && event.deltaX > 0) {
      this.props.setDrawerPosition(1);
    } else if (position < 0.5 && event.deltaX < 1) {
      this.props.setDrawerPosition(0);
    } else if (Math.abs(position - drawerPosition) > 0.1) {
      console.log(position);
      this.props.setDrawerPosition(position);
    }
    //console.log(event.deltaX);
  };

  go = (link) => {
    this.props.go(link);
  };

  renderMenu() {
    const { drawerPosition } = this.props;
    return (
      <Drawer position={drawerPosition} onRequestClose={this.drawer} onRequestOpen={this.drawer}>
        <DrawerHeader primary>{_l`Home`}</DrawerHeader>
        <MenuItem href={'/'} onTouchTap={this.go} icon={<ActionHome/>}>{_l`Home`}</MenuItem>
        <MenuItem href={'/users'} onTouchTap={this.go} autoFocus icon={<SocialPerson/>}>{_l`Users`}</MenuItem>
        <MenuItem href={'/theme'} onTouchTap={this.go} icon={<ImagePalette/>}>{_l`Theme Changer`}</MenuItem>
      </Drawer>
    );
  }

  render() {
    const menu = this.renderMenu();
    return (
      <Hammer
        onPan={this.pan}
      >
        <div style={this.getStyle()} className={appStyles.root}>
          {this.props.children}
          {menu}
        </div>
      </Hammer>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    go: bindActionCreators(routeActions.push, dispatch),
    toggleDrawer: bindActionCreators(homeActions.toggleDrawer, dispatch),
    setDrawerPosition: bindActionCreators(homeActions.setDrawerPosition, dispatch)
  }
}


function mapStateToProps(state) {
  return {
    theme: state.theme,
    drawerPosition: state.home.drawerPosition
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
