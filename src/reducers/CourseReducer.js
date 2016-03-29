import api from 'lib/api';
import createStore from 'lib/createStore';

const GET_COURSES = 'courses/get';
const CREATE_COURSE = 'courses/create';
const EDIT_COURSE = 'courses/edit';
const DELETE_COURSE = 'courses/delete';

export default createStore([], {
  [GET_COURSES]: (state, action) => {
    return action.data;
  },
  [CREATE_COURSE]: (state, action) => {
    return [...state, action.data];
  },
  [EDIT_COURSE]: (state, action) => {
    const updatedCourse = action.data;
    return state.map((todo) => {
      if (todo._id === updatedCourse._id) {
        return updatedCourse;
      }
      return todo;
    })
  },
  [DELETE_COURSE]: (state, action) => {
    const deletedCourse = action.data;
    return state.filter(todo => {
      return todo._id !== deletedCourse._id;
    });
  }
})

export function getCourses (successMessage, errorMessage) {
  return {
    type: GET_COURSES,
    promise: api.get(`courses`),
    successMessage,
    errorMessage
  };
}

export function createCourse (course, successMessage, errorMessage) {
  return {
    type: CREATE_COURSE,
    promise: api.post(`courses`, course),
    successMessage,
    errorMessage
  };
}

export function editCourse (id, course, successMessage, errorMessage) {
  return {
    type: EDIT_COURSE,
    promise: api.put(`courses/${id}`, course),
    successMessage,
    errorMessage
  };
}

export function deleteCourse (id, successMessage, errorMessage) {
  return {
    type: DELETE_COURSE,
    promise: api.delete(`courses/${id}`),
    successMessage,
    errorMessage
  };
}
