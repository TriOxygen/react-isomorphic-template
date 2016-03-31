import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as userActions from 'reducers/userReducer';
import fetchComponentData from 'lib/fetchComponentData';
import ContentClear from 'oxygen-md-svg-icons/lib/SvgIcons/ContentClear';
import { addMessages, translate as _l } from 'lib/I18n';
import { routeActions } from 'react-router-redux';

import { Toolbar, DialogTitle, DialogContent, TextField, Toggle, DialogActions, FlatButton } from 'oxygen-md';

class User extends Component {
  static propTypes = {
    children: PropTypes.node,
  };

  static needs = [
    userActions.getUser
  ];

  goBack = () => {
    this.props.go('/users');
  };

  render() {
    const { user } = this.props;
    if (!user) {
      return <div>No user</div>;
    }
    return (
      <div>
        <Toolbar transparent onTouchTapRightIcon={this.goBack} rightIcon={<ContentClear block/>}>Hi</Toolbar>
        <DialogTitle>{_l`User`}</DialogTitle>
        <DialogContent>
          <TextField autoFocus ref="first" value={user.name.first} floatingLabelText={_l`First name`}/>
          <TextField ref="last" value={user.name.last} floatingLabelText={_l`Last name`}/>
          <TextField ref="email" value={user.email} floatingLabelText={_l`E-mail`}/>
          <TextField type="password" ref="password" floatingLabelText={_l`Password`}/>
          <Toggle ref="active" checked={user.active} label={_l`Active`} />
          <Toggle ref="locked" checked={user.locked} label={_l`Locked`} />
        </DialogContent>
        <DialogActions>
          <FlatButton primary onTouchTap={this.save} label={'Save'}/>
          <FlatButton onTouchTap={this.clear} label={_l`Clear`}/>
        </DialogActions>

      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    go: bindActionCreators(routeActions.push, dispatch),
    goBack: bindActionCreators(routeActions.goBack, dispatch),
    getUser: bindActionCreators(userActions.getUser, dispatch),
  };
}

function mapStateToProps(state, props) {
  return {
    user: state.users[props.params.userId],
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(User);
