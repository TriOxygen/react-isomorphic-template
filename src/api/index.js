import bodyParser from 'body-parser';
import express from 'express';
import mongoose from 'mongoose';
import todo from './Todo';


export default function (app) {

  const router = express.Router();

  mongoose.connect('mongodb://localhost/todo');

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  todo(router);

  router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
  });

  return router;
}