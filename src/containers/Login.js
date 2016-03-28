import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as authActions from 'reducers/AuthReducer';
import { Layout, TextField, RaisedButton } from 'oxygen-md';
import { addMessages, translate as _l } from 'lib/I18n';
import MainAppBar from 'components/MainAppBar';

addMessages({
  ['en-US']: {
    'E-mail': 'E-mail',
    'Password': 'Password',
    'Login': 'Login',
    'Logout': 'Logout'
  }
});

class Login extends Component {

  static propTypes = {
    auth: PropTypes.object,
    login: PropTypes.func,
    logout: PropTypes.func,
  };

  login = () => {
    const { login } = this.props;
    const email = this.refs.email.getValue();
    const password = this.refs.password.getValue();
    login(email, password);
  };

  logout = () => {
    const { logout } = this.props;
    logout();
  };

  render() {
    const { auth } = this.props;
    return (
      <Layout>
        <MainAppBar />
        {! auth.loggedIn ? <div>
          <TextField ref="email" floatingLabelText={_l`E-mail`}/>
          <TextField type="password" ref="password" floatingLabelText={_l`Password`}/>
          <RaisedButton primary onTouchTap={this.login} label={_l`Login`}/>
        </div> :
        <RaisedButton primary onTouchTap={this.logout} label={_l`Logout`}/>
      }
      </Layout>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    login: bindActionCreators(authActions.login, dispatch),
    logout: bindActionCreators(authActions.logout, dispatch),
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);