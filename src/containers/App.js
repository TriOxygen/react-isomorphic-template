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
import MainSnackBar from 'components/MainSnackBar';

addMessages({
  ['en-US']: {
    'Home': 'Home',
    'Users': 'Users',
    'Theme Changer': 'Theme Changer',
    'Login': 'Login'
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
  },
  app: {
    height: '100%',
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
    auth: PropTypes.object,
    drawerPosition: PropTypes.number,
    toggleDrawer: PropTypes.func,
    closeDrawer: PropTypes.func,
    openDrawer: PropTypes.func,
    setDrawerPosition: PropTypes.func,
    theme: PropTypes.object,
    message: PropTypes.object,
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
    const node = document.getElementById('app');
    node.className = appStyles.root;
    CSSPropertyOperations.setValueForStyles(node, this.getStyle());
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

  closeDrawer = (event) => {
    const { closeDrawer } = this.props;
    closeDrawer();
  };

  openDrawer = (event) => {
    const { openDrawer } = this.props;
    openDrawer();
  };

  go = (link) => {
    this.props.go(link);
    this.closeDrawer();
  };

  renderMenu() {
    const { drawerPosition, auth } = this.props;
    return (
      <Drawer position={drawerPosition} onRequestClose={this.closeDrawer} onRequestOpen={this.openDrawer}>
        <DrawerHeader primary>{auth.loggedIn && auth.name.first + ' ' + auth.name.last}</DrawerHeader>
        <MenuItem href={'/'} onTouchTap={this.go} autoFocus icon={<ActionHome/>}>{_l`Home`}</MenuItem>
        <MenuItem href={'/users'} onTouchTap={this.go} icon={<SocialPerson/>}>{_l`Users`}</MenuItem>
        <MenuItem href={'/theme'} onTouchTap={this.go} icon={<ImagePalette/>}>{_l`Theme Changer`}</MenuItem>
        <MenuItem href={'/login'} onTouchTap={this.go} icon={<ActionHome/>}>{_l`Login`}</MenuItem>
      </Drawer>
    );
  }

  render() {
    const menu = this.renderMenu();
    return (
      <div className={appStyles.app}>
        {this.props.children}
        {menu}
        <MainSnackBar />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    go: bindActionCreators(routeActions.push, dispatch),
    toggleDrawer: bindActionCreators(homeActions.toggleDrawer, dispatch),
    closeDrawer: bindActionCreators(homeActions.closeDrawer, dispatch),
    openDrawer: bindActionCreators(homeActions.openDrawer, dispatch),
    setDrawerPosition: bindActionCreators(homeActions.setDrawerPosition, dispatch)
  }
}


function mapStateToProps(state) {
  return {
    theme: state.theme,
    auth: state.auth,
    locale: state.locale,
    drawerPosition: state.home.drawerPosition
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
