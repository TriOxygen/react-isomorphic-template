import bodyParser from 'body-parser';
import express from 'express';
import todo from './Todo';
import course from './Course';
import { Exception } from 'Exceptions';

export class NoSuchEndpointException extends Exception {
  static messages = [
    'This tree doesn\'t have that many leaves'
  ];
}

const wrap = fn => (...args) => fn(...args).catch(args[2]);

export function apiCall(fn) {
  return wrap(async function (req, res, next) {
    try {
      const result = await fn(req.body, req.params);
      if (result) {
        res.data = result;
        next();
      }
    } catch (e) {
      next(e);
    }
  });
}

export default function api (app) {

  const router = new express.Router();

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  todo(router);
  course(router);

  router.get('/', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.json({ message: 'hooray! welcome to our api!' });
  });

  router.use(function apiHandler(req, res) {
    res.setHeader('Content-Type', 'application/json');
    if (res.data) {
      res.json({
        error: false,
        data: res.data
      });
    } else {
      res.status(404);
      res.json({
        error: new NoSuchEndpointException()
      });
    }
  });


  return router;
}