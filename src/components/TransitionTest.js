import React, { PropTypes, Component } from 'react';
import Transition from 'react-motion-ui-pack';
import shallowCompare from 'react-addons-shallow-compare';
import Scrollable from 'components/Scrollable';
import { Styles, FlatButton, Layout, Toolbar, RaisedButton } from 'oxygen-md';
import ActionAccountCircle from 'oxygen-md-svg-icons/lib/SvgIcons/ActionAccountCircle';
import fetchComponentData from 'lib/fetchComponentData';
import MainAppBar from 'components/MainAppBar';

import { Grid, GridCell } from 'oxygen-md';
import { Card, CardMedia, CardContent, CardImage, CardTitle, CardActions } from 'oxygen-md';

import * as itemActions from 'reducers/items';
import * as courseActions from 'reducers/courseReducer';
import * as mailActions from 'reducers/mailReducer';
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

  addItem = () => {
    const { createCourse } = this.props;
    createCourse({
      name: Math.random()
    });
  };

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

  sendMail = () => {

    const mail = {
      from: '"Özgür Ayten 👥" <ozgur.ucamaz@gmail.com>',
      to: 'ozgur.gene@gmail.com',
      subject: 'Hello ✔',
      text: 'Hello world 🐴',
      attachment: [
        { data: '<html>i <i>hope</i> this works! 🐴 🐴</html>', alternative: true },
      ]
    }
    this.props.sendMail(mail);
    // send mail with defined transport object

  }

  render() {
    const { courses } = this.props;
    return (
      <Layout>
        <MainAppBar>
          <RaisedButton label='Add' onTouchTap={this.addItem} />
        </MainAppBar>
        <Scrollable>
          <Grid gutter>
            {
              courses.map(course =>
                <GridCell size={1/3} key={course._id}>
                  <Card zDepth={1} onTouchTap={this.edit.bind(this, course)} >
                    <CardTitle>{course.name}</CardTitle>
                    <CardMedia>
                      <img src="http://fpoimg.com/1600x900" className='oz'/>
                    </CardMedia>
                    <CardContent>{course.description}</CardContent>
                    <CardActions>
                      <FlatButton secondary onTouchTap={this.edit.bind(this, course)} label='Edit' />
                      <FlatButton primary onTouchTap={this.delete.bind(this, course)} label='Del' />
                      <FlatButton primary onTouchTap={this.sendMail} label='Mail' />
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
    sendMail: bindActionCreators(mailActions.send, dispatch),
  }
}

function mapStateToProps(state) {
  return {
    items: state.items,
    courses: state.courses
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TransitionTest);
