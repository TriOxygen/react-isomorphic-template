import getModel from 'schemas';
import { NotFoundError } from 'Errors';
import { makeMiddleware } from 'api';
const Course = getModel('Course');
const Chapter = getModel('Chapter');
const Page = getModel('Page');

const apiCall = makeMiddleware;

// function apiCall(fn) {
//   return makeMiddleware((body, params) => {
//     // throw new NotFoundError('asdasdf');
//     console.log(body, params);
//   }, fn);
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

  router.route('/courses/:courseId/:chapterId')
    .put(apiCall(updateChapter))
    .delete(apiCall(deleteChapter));

  router.route('/courses/:courseId/:chapterId/:pageId')
    .put(apiCall(updatePage))
    .delete(apiCall(deletePage));
}

async function newCourse(body, params) {
  const course = new Course(body);
  course.description = stringGen(200);
  await course.save();
  return [course];
}

async function getCourses(body, params) {
  const courses = await Course.find({}).select('name theme description children');
  return [courses];
}

async function getCourse(body, params) {
  const course = await Course.findById(params.courseId);
  if (!course) {
    throw new NotFoundError();
  }
  return [course];
}

function stringGen(len) {
  let text = '';

  const charset = 'abcdefghijklmnopqrstuvwxyz';

  for( let i=0; i < len; i++ ) {
    text += charset.charAt(Math.floor(Math.random() * charset.length));
    if (Math.random() > 0.7) {
      text += ' ';
    }
  }

  return text;
}

async function updateCourse(body, params) {
  body.description = body.description || stringGen(200);
  const course = await Course.findByIdAndUpdate(params.courseId, body, { new: true });
  if (!course) {
    throw new NotFoundError();
  }
  return [course];
}

async function deleteCourse(body, params) {
  const { courseId } = params;
  const course = await Course.findByIdAndRemove(courseId, body);
  if (!course) {
    throw new NotFoundError();
  }
  return [course];
}

async function newChapter(body, params) {
  const course = await Course.findById(params.courseId);

  course.children = course.children || [];
  const chapter = new Chapter(body);
  await chapter.save();
  course.children.push(chapter);

  const course = await course.save();
  return [course];
}

async function updateChapter(body, params) {
  const { courseId, chapterId } = params;
  const course = await Course.findById(courseId);

  let foundChapter;
  course.children.every(chapter => {
    if (chapter.id === chapterId) {
      foundChapter = chapter;
      return false;
    }
  });
  if (foundChapter) {
    Object.assign(foundChapter, body);
    await foundChapter.save();
  }
  return [course];
}

async function deleteChapter(body, params) {
  const { courseId, chapterId } = params;
  const course = await Course.findByIdAndUpdate(courseId, {
    $pull: {
      children: { _id: chapterId }
    }
  });
  return [course];
}

async function updatePage(body, params) {
  const { courseId, chapterId, pageId } = params;
  const course = await Course.findById(courseId);

  let foundPage;
  course.children.every(chapter => {
    if (chapter.id === chapterId) {
      chapter.children.every(page => {
        if (page.id === pageId) {
          foundPage = page;
          return false;
        }
      });
      return false;
    }
  });
  if (foundPage) {
    Object.assign(foundPage, body);
    await foundPage.save();
  }
  return [course];
}

async function deletePage(body, params) {
  const { chapterId, pageId } = params;
  const chapter = await Chapter.findByIdAndUpdate(chapterId, {
    $pull: {
      children: { _id: pageId }
    }
  });
  return [chapter];
}