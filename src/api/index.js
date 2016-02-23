import bodyParser from 'body-parser';
import express from 'express';
import todo from './Todo';

export default function api (app) {

  const router = new express.Router();

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  todo(router);

  router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
  });

  return router;
}