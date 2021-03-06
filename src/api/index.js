import bodyParser from 'body-parser';
import express from 'express';
import profile, { createEmptyProfile } from './Profile';
import course from './Course';
import user from './User';
import locale from './Locale';
import mail from './Mail';
import { UnknownError } from 'Errors';
import persistentStorage from 'lib/persistentStorage';
import { setLocale } from 'lib/I18n';

export class NoSuchEndpointError extends UnknownError {
  code = 404;
  static messages = [
    'This tree doesn\'t have that many leaves',
    'Are you sure this is where you left it?',
  ];
}

const wrap = fn => (...args) => fn(...args).catch(args[2]);

export function makeMiddleware() {
  const middlewares = [...arguments];
  const apiFunc = middlewares.pop();
  return wrap(async function (req, res, next) {
    try {
      middlewares.forEach(middleware => middleware(req.body, req.params, req.session.profile));
      const [data, message] = await apiFunc(req.body, req.params, req.session.profile) || [];
      res.data = data;
      res.message = message;
      next();
    } catch (e) {
      next(e);
    }
  })
}

export default function api (app) {

  const router = new express.Router();

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.use(function (req, res, next) {
    const { session } = req;
    persistentStorage.setStorage(session);
    const profile = req.session.profile || createEmptyProfile();
    const { locale, defaultCurrency } = profile.settings.locale;
    setLocale(locale, defaultCurrency);
    next();
  });



  profile(router);
  locale(router);
  mail(router);
  user(router);
  course(router);

  router.get('/', function(req, res) {
    res.set({ 'content-type': 'application/json; charset=utf-8' });
    res.json({ message: 'hooray! welcome to our api!' });
  });

  router.use(function apiHandler(req, res) {
    res.set({ 'content-type': 'application/json; charset=utf-8' });
    // res.set('ETag', '1235');
    if (res.data || res.message) {
      res.json({
        error: false,
        data: res.data,
        message: res.message
      });
    } else {
      res.status(404);
      res.json({
        error: new NoSuchEndpointError()
      });
    }
  });


  return router;
}