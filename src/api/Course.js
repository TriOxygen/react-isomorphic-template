import getModel from 'schemas';
import { NotFoundError } from 'Errors';
import { apiCall } from 'api';
const Course = getModel('Course');
const Chapter = getModel('Chapter');
const Page = getModel('Page');

// function apiCall(fn) {
//   return fn;
// }

export default router => {
  router.route('/courses')
    .post(apiCall(newCourse))
    .get(apiCall(getCourses));

  router.route('/courses/:courseId')
    .get(apiCall(getCourse))
    .put(apiCall(updateCourse))
    .delete(apiCall(deleteCourse));

  router.route('/courses/:courseId')
    .post(apiCall(newChapter));

  router.route('/courses/:courseId/chapter/:chapterId')
    .put(apiCall(updateChapter))
    .delete(apiCall(deleteChapter));
}

async function newCourse(body, params) {
  const course = new Course(body);
  return await course.save();
}

async function getCourses(body, params) {
  return await Course.find({}).select('name theme children');
}

async function getCourse(body, params) {
  const course = await Course.findById(params.courseId);
  if (!course) {
    throw new NotFoundError();
  }
  return course;
}

async function updateCourse(body, params) {
  const course = await Course.findByIdAndUpdate(params.courseId, body, { new: true });
  if (!course) {
    throw new NotFoundError();
  }
  return course;
}

async function deleteCourse(body, params) {
  const { courseId } = params;
  const course = await Course.findByIdAndRemove(courseId, body);
  if (!course) {
    throw new NotFoundError();
  }
  return course;
}

async function newChapter(body, params) {
  const course = await Course.findById(params.courseId);

  course.children = course.children || [];
  const chapter = new Chapter(body);
  await chapter.save();
  course.children.push(chapter);

  return await course.save();
}

async function updateChapter(body, params) {
  const { courseId, chapterId } = params;
  const course = await Course.findById(courseId);

  let foundChapter;
  course.children.every(chapter => {
    if (chapter.id === chapterId) {
      foundChapter = chapter;
    }
  });
  if (foundChapter) {
    Object.assign(foundChapter, body);
    await foundChapter.save();
  }

  return await course.save();
}

async function deleteChapter(body, params) {
  const { courseId, chapterId } = params;
  return await Course.findByIdAndUpdate(courseId, {
    '$pull': {
      'children': { _id: chapterId }
    }
  });
}
