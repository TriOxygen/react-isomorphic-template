import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as homeActions from 'reducers/homeReducer';
import { Toolbar, IconButton } from 'oxygen-md';
import NavigationMenu from 'oxygen-md-svg-icons/lib/SvgIcons/NavigationMenu';

class MainAppBar extends Component {

  static propTypes = {
    children: PropTypes.node,
    toggleDrawer: PropTypes.func,
    closeDrawer: PropTypes.func,
    openDrawer: PropTypes.func
  };

  closeDrawer = () => {
    const { closeDrawer } = this.props;
    closeDrawer();
  };

  openDrawer = () => {
    const { openDrawer } = this.props;
    openDrawer();
  };

  render() {
    const { children } = this.props;
    return (
      <Toolbar
        primary
        leftElement={<IconButton onTouchTap={this.openDrawer}><NavigationMenu block/></IconButton>}
      >
        {children}
      </Toolbar>
    );
  }

}

function mapDispatchToProps(dispatch) {
  return {
    toggleDrawer: bindActionCreators(homeActions.toggleDrawer, dispatch),
    closeDrawer: bindActionCreators(homeActions.closeDrawer, dispatch),
    openDrawer: bindActionCreators(homeActions.openDrawer, dispatch),
  }
}

function mapStateToProps(state) {
  return {
    drawerPosition: state.home.drawerPosition
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainAppBar);
