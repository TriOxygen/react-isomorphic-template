import React, { PropTypes, Component } from 'react';
import Transition from 'react-motion-ui-pack';
import shallowCompare from 'react-addons-shallow-compare';
import Scrollable from 'components/Scrollable';
import { Styles, FlatButton, Layout, Toolbar, RaisedButton } from 'oxygen-md';
import ActionAccountCircle from 'oxygen-md-svg-icons/lib/SvgIcons/ActionAccountCircle';
import fetchComponentData from 'lib/fetchComponentData';

import { Grid, GridCell } from 'oxygen-md';
import { Card, CardContent, CardImage, CardTitle, CardActions } from 'oxygen-md';

import * as itemActions from 'reducers/Items';
import * as courseActions from 'reducers/CourseReducer';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const { Units } = Styles;

const css = oxygenCss({
  item: {
    boxSizing: 'border-box',
    padding: Units.phone.gutter.mini,
    // transition: 'all ease 0.25s',
    position: 'relative',
    height: 256,
    width: '25%'
  },
  course: {
    padding: Units.phone.gutter.mini,
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

  static contextTypes = {
    theme: PropTypes.object
  };

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

  getStyle() {
    const theme = this.props.theme || this.context.theme;
    return Object.assign({}, {
      backgroundColor: theme.theme.background.hex
    })
  }

  render() {
    const { courses } = this.props;
    return (
      <Layout>
        <Toolbar primary leftIcon={<ActionAccountCircle block/>} rightIcon={<ActionAccountCircle block/>}>
          <RaisedButton onTouchTap={this.addItem.bind(this)} fullWidth label={'Add'} />
        </Toolbar>
        <Scrollable>
          <Grid gutter>
            {
              courses.map(course =>
                <GridCell size={1/4} key={course._id}>
                  <Card zDepth={1} onTouchTap={this.edit.bind(this, course)} >
                    <CardImage title={course.name} src="http://loremflickr.com/320/200/cat" />
                    <CardContent>{course.description}</CardContent>
                    <CardActions>
                      <FlatButton secondary onTouchTap={this.edit.bind(this, course)} label='Edit' />
                      <FlatButton primary onTouchTap={this.delete.bind(this, course)} label='Del' />
                    </CardActions>
                  </Card>
                </GridCell>
              )
            }
          </Grid>
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