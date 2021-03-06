import getModel from 'schemas';
import { AccessDeniedError, ValidationError, NotFoundError } from 'Errors';
import { makeMiddleware } from 'api';
import bcrypt from 'bcrypt';
import { addMessages, translate as _l } from 'lib/I18n';

const User = getModel('User');
const Settings = getModel('Settings');
const apiCall = makeMiddleware;

addMessages({
  ['en-US']: {
    'User updated': 'User updated',
  },
});


const fullUserProjection = {
  name: true,
  email: true,
  lastLogin: true,
  active: true,
  locked: true
};

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

  user.password = bcrypt.hashSync(body.password, bcrypt.genSaltSync(10));

  try {
    await user.save();
  } catch (error) {
    if (error.name === 'ValidationError') {
      throw new ValidationError(error);
    }
  }
  return [user];
}

async function getUsers(body, params) {
  const users = await User.find({}).select('name email lastLogin');
  const map = users.reduce((prev, current) => {
    prev[current._id] = current;
    return prev;
  }, {});
  return [map];
}

async function getUser(body, params) {
  const user = await User.findById(params.userId, fullUserProjection);
  if (!user) {
    throw new NotFoundError();
  }
  return [user];
}

async function updateUser(body, params, loggedInUser) {
  const user = await User.findById(params.userId);
  if (!user) {
    throw new NotFoundError();
  }
  if (!bcrypt.compareSync(body.password, user.password)) {
    throw new AccessDeniedError();
  }
  delete body.password;
  user.lastUpdate = Date.now();
  Object.keys(body).forEach(field => {
    user[field] = body[field];
  });
  try {
    await user.save();
  } catch (error) {
    if (error.name === 'ValidationError') {
      throw new ValidationError(error);
    }
  }
  return [user, _l`User updated`];
}

async function deleteUser(body, params) {
  const { userId } = params;
  const user = await User.findByIdAndRemove(userId);
  if (!user) {
    throw new NotFoundError();
  }
  return [user];
}
