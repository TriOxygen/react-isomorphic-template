import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as userActions from 'reducers/userReducer';
import * as userMessageActions from 'reducers/userMessageReducer';
import ContentClear from 'oxygen-md-svg-icons/lib/SvgIcons/ContentClear';
import { addMessages, translate as _l } from 'lib/I18n';
import { routeActions } from 'react-router-redux';

import { IconButton, Toolbar, DialogTitle, DialogContent, TextField, Toggle, DialogActions, RaisedButton } from 'oxygen-md';


addMessages({
  ['en-US']: {
    'First name': 'First name',
    'Last name': 'Last name',
    'E-mail': 'E-mail',
    'Password': 'Password',
    'Active': 'Active',
    'Locked': 'Locked',
    'Save': 'Save',
  }
});

class UserEditForm extends Component {
  static propTypes = {
    children: PropTypes.node,
    user: PropTypes.object,
    addMessage: PropTypes.func,
    updateUser: PropTypes.func,
    go: PropTypes.func,
  };

  static needs = [
    userActions.getUser
  ];

  goBack = () => {
    this.props.go('/users');
  };

  save = () => {
    const { user, updateUser } = this.props;
    updateUser(user._id, {
      name: {
        first: this.refs.first.getValue(),
        last: this.refs.last.getValue(),
      },
      email: this.refs.email.getValue(),
      password: this.refs.password.getValue(),
    }, _l`User updated` ).then(res => {
      if (res.message) {
        this.props.addMessage(res.message);
      }
    });
  }

  render() {
    const { user } = this.props;
    if (!user) {
      return <div>No user</div>;
    }
    return (
      <div>
        <Toolbar transparent rightElement={<IconButton onTouchTap={this.goBack}><ContentClear block/></IconButton>}>Hi</Toolbar>
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
          <RaisedButton fullWidth secondary onTouchTap={this.save} label={'Save'}/>
        </DialogActions>

      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    go: bindActionCreators(routeActions.push, dispatch),
    addMessage: bindActionCreators(userMessageActions.addMessage, dispatch),
    updateUser: bindActionCreators(userActions.updateUser, dispatch),
  };
}

function mapStateToProps(state, props) {
  return {
    user: state.users[props.params.userId],
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserEditForm);
