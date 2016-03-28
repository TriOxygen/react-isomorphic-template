import bodyParser from 'body-parser';
import express from 'express';
import auth from './Auth';
import course from './Course';
import user from './User';
import mail from './Mail';
import { UnknownError } from 'Errors';

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
      middlewares.forEach(middleware => middleware(req.body, req.params, req.session.user));
      const { data, message } = await apiFunc(req.body, req.params, req.session.user);
      if (data) {
        res.data = data;
        res.message = message;
        next();
      }
    } catch (e) {
      next(e);
    }
  })
}

export default function api (app) {

  const router = new express.Router();

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());


  auth(router);
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
    if (res.data) {
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