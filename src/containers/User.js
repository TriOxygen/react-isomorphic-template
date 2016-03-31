import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as userActions from 'reducers/userReducer';

class User extends Component {
  static propTypes = {
    children: PropTypes.node,
  };

  render() {
    return (
      <div />
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getUser: bindActionCreators(userActions.getUser, dispatch),
  };
}

function mapStateToProps(state) {
  return {
    user: state.selectedUser,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(User);
