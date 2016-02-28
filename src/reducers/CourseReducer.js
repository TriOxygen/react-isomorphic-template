import request from 'axios';
import createStore from 'lib/createStore';

//const API_URL = 'https://webtask.it.auth0.com/api/run/wt-milomord-gmail_com-0/redux-tutorial-backend?webtask_no_cache=1';
const API_URL = 'http://localhost:3001/api/v1';
const GET_COURSES = 'courses/get';
const CREATE_COURSE = 'courses/create';
const EDIT_COURSE = 'courses/edit';
const DELETE_COURSE = 'courses/delete';

export default createStore([], {
  [GET_COURSES]: (state, action) => {
    return action.data.data;
  },
  [CREATE_COURSE]: (state, action) => {
    return [...state, action.data.data];
  },
  [EDIT_COURSE]: (state, action) => {
    const updatedCourse = action.data.data;
    return state.map((todo) => {
      if (todo._id === updatedCourse._id) {
        return updatedCourse;
      }
      return todo;
    })
  },
  [DELETE_COURSE]: (state, action) => {
    const deletedCourse = action.data.data;
    return state.filter(todo => {
      return todo._id !== deletedCourse._id;
    });
  }
})

export function getCourses () {
  return {
    type: GET_COURSES,
    promise: request.get(`${API_URL}/courses`)
  };
}

export function createCourse (course) {
  return {
    type: CREATE_COURSE,
    promise: request.post(`${API_URL}/courses`, course)
  };
}

export function editCourse (id, course) {
  return {
    type: EDIT_COURSE,
    promise: request.put(`${API_URL}/courses/${id}`, course)
  };
}

export function deleteCourse (id) {
  return {
    type: DELETE_COURSE,
    promise: request.delete(`${API_URL}/courses/${id}`)
  };
}
