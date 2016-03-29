import getModel from 'schemas';
import { AccessDeniedError } from 'Errors';
import { makeMiddleware } from 'api';
import bcrypt from 'bcrypt';
import persistentStorage from 'lib/persistentStorage';
import { addMessages, setLocale as switchLocale, translate as _l } from 'lib/I18n';

addMessages({
  ['en-US']: {
    'You are logged in.': 'Jacked into the matrix.',
    'You are logged out.': 'Succesfully taken the red pill.',
    'Access denied.': 'Matrix configuration mismatch.'
  },
});


const User = getModel('User');
const Settings = getModel('Settings');

const apiCall = makeMiddleware;

export default router => {
  router.route('/profile')
    .put(apiCall(login))
    .delete(apiCall(logout));

  router.route('/profile/locale')
    .put(apiCall(setLocale))
    .get(apiCall(getLocale));

  router.route('/profile/theme')
    .put(apiCall(setTheme))
    .get(apiCall(getTheme));


}

async function login(body, params) {
  const { email, password } = body;
  const user = await User.findOne({ email }).select('name password email settings.locale settings.theme lastLogin');
  if (!user || !bcrypt.compareSync(password, user.password)) {
    throw new AccessDeniedError(_l`Access denied.`);
  }
  user.lastLogin = Date.now();
  await user.save();
  const profile = {
    _id: user._id,
    name: user.name,
    email: user.email,
    settings: user.settings,
    lastLogin: user.lastLogin,
    loggedIn: true
  };
  persistentStorage.set('profile', profile);
  return [profile, _l`You are logged in.`];
}

async function logout(body, params) {
  persistentStorage.set('profile', {});
  return [{
    loggedIn: false
  }, _l`You are logged out.`];
}

async function setLocale(body, params, profile) {
  const { locale, defaultCurrency } = body;
  const user = await User.findById(profile._id);
  user.setttings = user.settings || new Settings();
  user.settings.locale.locale = locale;
  user.settings.locale.defaultCurrency = defaultCurrency;
  await user.save();
  const _profile = {
    _id: user._id,
    name: user.name,
    email: user.email,
    settings: user.settings,
    lastLogin: user.lastLogin,
    loggedIn: true
  };
  switchLocale(locale, defaultCurrency);
  persistentStorage.set('profile', _profile);
  return [_profile, _l`Locale changed.`];
}

async function getLocale(body, params, profile) {
  const user = await User.findById(profile._id);
  if (!user.settings) {
    user.settings = new Settings();
    await user.settings.save();
  }
  return [user.settings.locale];
}

async function setTheme(body, params, profile) {
  const { primary, secondary, tertiary, main } = body;
  const user = await User.findById(profile._id);
  user.setttings = user.settings || new Settings();
  user.settings.theme = {
    ...user.settings.theme,
    primary,
    secondary,
    tertiary,
    main
  };
  await user.save();
  const _profile = {
    _id: user._id,
    name: user.name,
    email: user.email,
    settings: user.settings,
    lastLogin: user.lastLogin,
    loggedIn: true
  };
  persistentStorage.set('profile', _profile);
  return [_profile, _l`Locale changed.`];
}

async function getTheme(body, params, profile) {
  const user = await User.findById(profile._id);
  if (!user.settings) {
    user.settings = new Settings();
    await user.settings.save();
  }
  return [user.settings.theme];
}
