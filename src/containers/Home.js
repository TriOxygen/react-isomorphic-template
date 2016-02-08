import React, { PropTypes } from 'react';
import TodosView from 'components/TodosView';
import TodosForm from 'components/TodosForm';
import { bindActionCreators } from 'redux';
import * as TodoActions from 'reducers/TodoReducer';
import { connect } from 'react-redux';
import classNames from 'classnames';
// import theme from '../style/theme';
import { Colors, Theme, Units, Typography } from 'oxygen-md/Styles';
import Section from 'containers/Section';
import MaterialTest from 'containers/MaterialTest';
import View from 'oxygen-md/View';

import { Layout, Toolbar, RaisedButton } from 'oxygen-md';
const { material } = Colors;

const theme = new Theme(material.red, material.amber, material.grey, 'light');

import ActionAccountCircle from 'oxygen-md-svg-icons/lib/SvgIcons/ActionAccountCircle';


const css = oxygenStyle({
  caseStudy: {
    padding: Units.phone.gutter.mini,
    flexGrow: 0
  },
  title: {
    display: 'block',
    fontSize: Typography.desktop.title.fontSize,
    fontWeight: Typography.desktop.title.fontWeight,
  }
});

class Home extends React.Component {
  static propTypes = {
    todos: PropTypes.any.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  // static needs = [
  //   TodoActions.getTodos
  // ];

  static childContextTypes = {
    theme: PropTypes.object
  };

  getChildContext() {
    return {
      theme: theme
    };
  }


  render() {
    const { todos, dispatch } = this.props;

    return (
      <div>
      </div>
    );
  }
}

export default connect(state => ({ todos: state.todos }))(Home)