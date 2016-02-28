import getModel from 'schemas';
import { NotFoundException } from 'Exceptions';
const Todo = getModel('Todo');

export default router => {

  router.route('/todo')
    .post((request, response, next) => {
      const todo = new Todo();
      todo.text = request.body.text;

      todo.save((error, createdTodo) => {
        if (error) {
          next(error);
        } else {
          response.data = createdTodo;
          next();
        }
      });
    })

    .get((request, response, next) => {
      Todo.find({}).select('text completed date').exec(function (error, todos) {
        next( new NotFoundException());
        if (error) {
          next(error);
        } else {
          response.data = todos || [];
          next();
        }
      });
    });

  router.route('/todo/:id')
    .put((request, response, next) => {
      Todo.findByIdAndUpdate(request.params.id, request.body, { new: true }, function (error, todo) {
        if (error) {
          next(error);
        } else {
          response.data = todo;
          next();
        }
      });
    })
    .delete((request, response, next) => {
      Todo.findByIdAndRemove(request.params.id, request.body, function (error, post) {
        if (error) {
          return next(error);
        } else {
          response.data = post;
          next();
        }
      });
    });
}