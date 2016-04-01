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
    'Create a new user': 'Create a new user',
    'First name': 'First name',
    'Last name': 'Last name',
    'E-mail': 'E-mail',
    'Password': 'Password',
    'Active': 'Active',
    'Locked': 'Locked',
    'Save': 'Save',
    'Clear': 'Clear',
  }
});

class UserCreateForm extends Component {
  static propTypes = {
    children: PropTypes.node,
    go: PropTypes.func,
    createUser: PropTypes.func,
    addMessage: PropTypes.func,
  };

  goBack = () => {
    this.props.go('/users');
  };

  createUser = () => {
    const { createUser } = this.props;
    createUser({
      name: {
        first: this.refs.first.getValue(),
        last: this.refs.last.getValue(),
      },
      email: this.refs.email.getValue(),
      password: this.refs.password.getValue(),
    }).then(res => {
      if (res.message) {
        this.props.addMessage(res.message);
      }
    })
  };


  render() {
    return (
      <div>
        <Toolbar transparent rightElement={<IconButton onTouchTap={this.goBack}><ContentClear block/></IconButton>}>
          Some title
        </Toolbar>
        <DialogTitle>{_l`Create a new user`}</DialogTitle>
        <DialogContent>
          <TextField autoFocus ref="first" floatingLabelText={_l`First name`}/>
          <TextField ref="last" floatingLabelText={_l`Last name`}/>
          <TextField ref="email" floatingLabelText={_l`E-mail`}/>
          <TextField type="password" ref="password" floatingLabelText={_l`Password`}/>
          <Toggle ref="active" checked={true} label={_l`Active`} />
          <Toggle ref="locked" checked={false} label={_l`Locked`} />
        </DialogContent>
        <DialogActions>
          <RaisedButton fullWidth secondary onTouchTap={this.createUser} label={'Save'}/>
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
    createUser: bindActionCreators(userActions.createUser, dispatch),
  };
}

function mapStateToProps(state, props) {
  return {
    user: state.users[props.params.userId],
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserCreateForm);
