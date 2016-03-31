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
import * as homeActions from 'reducers/homeReducer';
import MainSnackBar from 'components/MainSnackBar';
import shallowCompare from 'react-addons-shallow-compare';

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

class App extends React.Component {

  static propTypes = {
    children: PropTypes.object,
    auth: PropTypes.object,
    drawerPosition: PropTypes.number,
    toggleDrawer: PropTypes.func,
    closeDrawer: PropTypes.func,
    openDrawer: PropTypes.func,
    setDrawerPosition: PropTypes.func,
    message: PropTypes.object,
  };

  static contextTypes = {
    theme: PropTypes.object
  };

  componentDidMount() {
    const node = document.getElementById('app');
    node.className = appStyles.root;
    CSSPropertyOperations.setValueForStyles(node, this.getStyle());
  }

  componentDidUpdate() {
    const node = document.getElementById('app');
    CSSPropertyOperations.setValueForStyles(node, this.getStyle());
  }

  getStyle() {
    const theme = this.context.theme;
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
    const { drawerPosition, profile } = this.props;
    return (
      <Drawer overlay={false} position={drawerPosition} onRequestClose={this.closeDrawer} onRequestOpen={this.openDrawer}>
        <DrawerHeader primary>{profile.loggedIn && profile.name.first + ' ' + profile.name.last}</DrawerHeader>
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
    profile: state.profile,
    drawerPosition: state.home.drawerPosition
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
