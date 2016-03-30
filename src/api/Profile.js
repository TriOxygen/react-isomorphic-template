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

function stripProfile(profile) {
  const { _id, name, email, lastLogin, settings } = profile;
  const { locale, theme } = settings;
  return {
    _id,
    name,
    email,
    lastLogin,
    settings: {
      locale,
      theme
    }
  }
}

export function createEmptyProfile() {
  return {
    name: {
      first: 'Guest',
      last: 'Person'
    },
    email: 'standing@middle.of.nowhere',
    lastLogin: Date.now(),
    settings: {
      locale: {
        locale: 'en-US',
        defaultCurrency: 'EUR'
      },
      theme: {
        main: 'light',
        primary: 'red',
        secondary: 'orange',
        tertiary: 'grey'
      }
    }
  }
}

async function login(body, params) {
  const { email, password } = body;
  const user = await User.findOne({ email }).select('name password email settings.locale settings.theme lastLogin');
  if (!user || !bcrypt.compareSync(password, user.password)) {
    throw new AccessDeniedError(_l`Access denied.`);
  }
  user.lastLogin = Date.now();
  await user.save();
  const profile = stripProfile(user);
  profile.loggedIn = true;
  persistentStorage.set('profile', profile);
  return [profile, _l`You are logged in.`];
}

async function logout(body, params) {
  const emptyProfile = createEmptyProfile();
  persistentStorage.set('profile', emptyProfile);
  return [emptyProfile, _l`You are logged out.`];
}

async function setLocale(body, params, loggedInUser) {
  const { locale, defaultCurrency } = body;
  const user = await User.findById(loggedInUser._id);
  user.setttings = user.settings || new Settings();
  user.settings.locale.locale = locale;
  user.settings.locale.defaultCurrency = defaultCurrency;
  await user.save();
  const profile = stripProfile(user);
  profile.loggedIn = true;
  switchLocale(locale, defaultCurrency);
  persistentStorage.set('profile', profile);
  return [profile, _l`Locale changed.`];
}

async function getLocale(body, params, profile) {
  const user = await User.findById(profile._id);
  if (!user.settings) {
    user.settings = new Settings();
    await user.settings.save();
  }
  return [user.settings.locale];
}

async function setTheme(body, params, loggedInUser) {
  const { primary, secondary, tertiary, main } = body;
  const user = await User.findById(loggedInUser._id);
  user.setttings = user.settings || new Settings();
  user.settings.theme = {
    ...user.settings.theme,
    primary,
    secondary,
    tertiary,
    main
  };
  await user.save();
  const profile = stripProfile(user);
  profile.loggedIn = true;
  persistentStorage.set('profile', profile);
  return [profile, _l`Locale changed.`];
}

async function getTheme(body, params, loggedInUser) {
  const user = await User.findById(loggedInUser._id);
  if (!user.settings) {
    user.settings = new Settings();
    await user.settings.save();
  }
  return [user.settings.theme];
}
