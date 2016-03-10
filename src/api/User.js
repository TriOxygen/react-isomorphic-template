import getModel from 'schemas';
import { NotFoundError } from 'Errors';
import { makeMiddleware } from 'api';
const User = getModel('User');

const apiCall = makeMiddleware;


export default router => {
  router.route('/users')
    .post(apiCall(newUser))
    .get(apiCall(getUsers));

  router.route('/users/:userId')
    .get(apiCall(getUser))
    .put(apiCall(updateUser))
    .delete(apiCall(deleteUser));
}

async function newUser(body, params) {
  const user = new User(body);
  return await user.save();
}

async function getUsers(body, params) {
  return await User.find({}).select('name email lastLogin');
}

async function getUser(body, params) {
  const user = await User.findById(params.userId);
  if (!user) {
    throw new NotFoundError();
  }
  return user;
}

async function updateUser(body, params) {
  const user = await User.findByIdAndUpdate(params.userId, body, { new: true });
  if (!user) {
    throw new NotFoundError();
  }
  return user;
}

async function deleteUser(body, params) {
  const { userId } = params;
  const user = await User.findByIdAndRemove(userId);
  if (!user) {
    throw new NotFoundError();
  }
  return user;
}
