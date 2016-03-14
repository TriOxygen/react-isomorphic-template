import React, { PropTypes, Component } from 'react';
import Transition from 'react-motion-ui-pack';
import shallowCompare from 'react-addons-shallow-compare';
import Scrollable from 'components/Scrollable';
import { Portal, View, Paper, Layout, Toolbar, TextField, RaisedButton } from 'oxygen-md';
import ActionAccountCircle from 'oxygen-md-svg-icons/lib/SvgIcons/ActionAccountCircle';
import fetchComponentData from 'lib/fetchComponentData';

import { List, ListItem } from 'oxygen-md';

import * as userActions from 'reducers/UserReducer';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { addMessages, translate as _l } from 'lib/I18n';

addMessages({
  ['en-US']: {
    'First name': 'First name',
    'Last name': 'Last name',
    'E-mail': 'E-mail',
    'Add': 'Add',
    'Clear': 'Clear',
    'Save': 'Save',
    'Portal': 'Portal',
    'Password': 'Password',
  },
});



const css = oxygenCss({
  item: {
    // transition: 'all ease 0.25s',
    position: 'relative',
  },
  container: {
    position: 'relative'
  },
  content: {
    flex: 1
  },
});

class TransitionTest extends Component {
  state = {
    edit: null,
    portal: false
  };

  static propTypes = {
    dispatch: PropTypes.func,
  };

  static needs = [
    userActions.getUsers
  ];

  componentWillMount() {
    fetchComponentData(this.props.dispatch, [this.constructor]);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  addUser = () => {
    const { createUser } = this.props;
    createUser({
      name: {
        first: this.refs.first.getValue(),
        last: this.refs.last.getValue(),
      },
      email: this.refs.email.getValue(),
      password: this.refs.password.getValue(),
    });
  };

  delete(user) {
    const { deleteUser } = this.props;
    deleteUser(user._id);
  }

  save = () => {
    if (this.state.edit) {
      this.updateUser();
    } else {
      this.addUser();
    }
    this.setState({ edit: null});
  };

  edit(user) {
    this.setState({ edit: user });
  }

  updateUser() {
    const { updateUser } = this.props;
    const { edit } = this.state;
    updateUser(edit._id, {
      name: {
        first: this.refs.first.getValue(),
        last: this.refs.last.getValue(),
      },
      email: this.refs.email.getValue(),
      password: this.refs.password.getValue(),
    });
  }

  clear = () => {
    this.setState({ edit: null });
  };

  portal = () => {
    this.setState({ portal: !this.state.portal });
  };

  render() {
    const { users } = this.props;
    const { edit, portal } = this.state;
    const { name, email } = edit || {};

    const label = edit ? _l`Save` : _l`Add`;
    return (
      <Layout>
        <Toolbar primary leftIcon={<ActionAccountCircle block/>} rightIcon={<ActionAccountCircle block/>} />
        <Scrollable className={css.content} >
          <Paper padded spaced>
            <TextField ref="first" value={edit && name.first} floatingLabelText={_l`First name`}/>
            <TextField ref="last" value={edit && name.last} floatingLabelText={_l`Last name`}/>
            <TextField ref="email" value={edit && email} floatingLabelText={_l`E-mail`}/>
            <TextField type="password" ref="password" floatingLabelText={_l`Password`}/>
            <View row>
              <View grow={1} column>
                <RaisedButton onTouchTap={this.save} fullWidth primary label={label}/>
              </View>
              <View grow={1} column>
                <RaisedButton onTouchTap={this.clear} fullWidth label={_l`Clear`}/>
              </View>
            </View>
          </Paper>
          <RaisedButton onTouchTap={this.portal} fullWidth label={_l`Portal`} />
          <List>
          <Transition
            className={css.container}
            enter={{
              height: 56,
              // left: 0,
              scale: 1,
              opacity: 1,
            }}
            leave={{
              height: 0,
              scale: 0.5,
              opacity: -1,
            }}
            appear={{
              height: 0,
              scale: 0.5,
              // left: 0,
              opacity: 1,
            }}
          >
            {
              users.map(user =>
                <ListItem divider key={user._id}>
                  <View grow={1}><span>{user.name.first} {user.name.last} ({user.email})</span></View>
                  <View grow={0}>
                    <RaisedButton secondary onTouchTap={this.edit.bind(this, user)} label='Edit' />
                    <RaisedButton primary onTouchTap={this.delete.bind(this, user)} label='Del' />
                  </View>
                </ListItem>
              )
            }
          </Transition>
          </List>
        </Scrollable>
        {portal ? <Portal tooltip>
          <p>
            Hiiiii
          </p>
        </Portal> : null}
      </Layout>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    createUser: bindActionCreators(userActions.createUser, dispatch),
    updateUser: bindActionCreators(userActions.updateUser, dispatch),
    deleteUser: bindActionCreators(userActions.deleteUser, dispatch),
  }
}

function mapStateToProps(state) {
  return {
    users: state.users
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TransitionTest);