import bodyParser from 'body-parser';
import express from 'express';
import todo from './Todo';
import course from './Course';
import user from './User';
import { UnknownError } from 'Errors';

export class NoSuchEndpointError extends UnknownError {
  static messages = [
    'This tree doesn\'t have that many leaves'
  ];
}

const wrap = fn => (...args) => fn(...args).catch(args[2]);

export function makeMiddleware() {
  const middlewares = [...arguments];
  const apiFunc = middlewares.pop();
  return wrap(async function (req, res, next) {
    try {
      middlewares.forEach(middleware => middleware(req.body, req.params));
      const data = await apiFunc(req.body, req.params);
      if (data) {
        res.data = data;
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
        data: res.data
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