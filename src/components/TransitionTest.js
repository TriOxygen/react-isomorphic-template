import React, { PropTypes, Component } from 'react';
import Transition from 'react-motion-ui-pack';
import shallowCompare from 'react-addons-shallow-compare';
import Scrollable from 'components/Scrollable';
import { Layout, Toolbar, RaisedButton } from 'oxygen-md';
import ActionAccountCircle from 'oxygen-md-svg-icons/lib/SvgIcons/ActionAccountCircle';
import fetchComponentData from 'lib/fetchComponentData';

import {List, ListDivider, ListItem} from 'oxygen-md';

import * as itemActions from 'reducers/Items';
import * as courseActions from 'reducers/CourseReducer';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

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

  static needs = [
    courseActions.getCourses
  ];

  componentWillMount() {
    fetchComponentData(this.props.dispatch, [this.constructor]);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  addItem() {
    const { createCourse } = this.props;
    createCourse({
      name: Math.random()
    });
  }

  delete(course) {
    const { deleteCourse } = this.props;
    deleteCourse(course._id);
  }

  edit(course) {
    const { editCourse } = this.props;
    editCourse(course._id, {
      name: 'Changed!' + Math.random()
    });
  }

  render() {
    const { courses } = this.props;
    return (
      <Layout>
        <Toolbar primary leftIcon={<ActionAccountCircle block/>} rightIcon={<ActionAccountCircle block/>}>
          <RaisedButton onClick={this.addItem.bind(this)} fullWidth label={'Add'} />
        </Toolbar>
        <Scrollable className={css.content} >
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
              courses.map(course =>
                <ListItem key={course._id}>
                  {course.name}
                  <RaisedButton secondary onClick={this.edit.bind(this, course)} label='Edit' />
                  <RaisedButton primary onClick={this.delete.bind(this, course)} label='Del' />
                </ListItem>
              )
            }
          </Transition>
          </List>
        </Scrollable>
      </Layout>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    addItem: bindActionCreators(itemActions.addItem, dispatch),
    editItem: bindActionCreators(itemActions.editItem, dispatch),
    deleteItem: bindActionCreators(itemActions.deleteItem, dispatch),
    createCourse: bindActionCreators(courseActions.createCourse, dispatch),
    editCourse: bindActionCreators(courseActions.editCourse, dispatch),
    deleteCourse: bindActionCreators(courseActions.deleteCourse, dispatch),
  }
}

function mapStateToProps(state) {
  return {
    items: state.items,
    courses: state.courses
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TransitionTest);