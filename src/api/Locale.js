import { makeMiddleware } from 'api';
import persistentStorage from 'lib/persistentStorage';
import { addMessages, setLocale, translate as _l } from 'lib/I18n';

addMessages({
  ['en-US']: {
    'Locale changed.': 'Locale changed.'
  },
});

const apiCall = makeMiddleware;

export default router => {
  router.route('/locale')
    .put(apiCall(set))
    .get(apiCall(get));
}

async function set(body, params) {
  const { locale, defaultCurrency } = body;
  const loc = {
    locale,
    defaultCurrency
  };
  setLocale(locale, defaultCurrency);
  persistentStorage.set('locale', loc);
  return [loc, _l`Locale changed.`];
}

async function get(body) {
  const locale = persistentStorage.get('locale');
  return [locale];
}
