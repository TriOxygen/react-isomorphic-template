import getModel from 'schemas';
import { AccessDeniedError } from 'Errors';
import { makeMiddleware } from 'api';
import bcrypt from 'bcrypt';
import persistentStorage from 'lib/persistentStorage';
import { addMessages, translate as _l } from 'lib/I18n';

addMessages({
  ['en-US']: {
    'You are logged in.': 'Jacked into the matrix.',
    'You are logged out.': 'Succesfully taken the red pill.',
    'Access denied.': 'Matrix configuration mismatch.'
  },
});


const User = getModel('User');

const apiCall = makeMiddleware;

export default router => {
  router.route('/auth')
    .put(apiCall(login))
    .delete(apiCall(logout));
}

async function login(body, params) {
  const { email, password } = body;
  const user = await User.findOne({ email }).select('name password email lastLogin');
  if (!user || !bcrypt.compareSync(password, user.password)) {
    throw new AccessDeniedError(_l`Access denied.`);
  }
  user.lastLogin = Date.now();
  user.save();
  const auth = {
    name: user.name,
    email: user.email,
    lastLogin: user.lastLogin,
    loggedIn: true
  };
  persistentStorage.set('auth', auth);
  return [auth, _l`You are logged in.`];
}

async function logout(body, params) {
  persistentStorage.set('auth', {});
  return [{
    loggedIn: false
  }, _l`You are logged out.`];
}
