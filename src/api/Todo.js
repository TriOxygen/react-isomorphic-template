import Todo from 'models/Todo';

export default router => {

  router.route('/todo')
    .post((request, response) => {
      const todo = new Todo();
      todo.text = request.body.text;

      todo.save((error, createdTodo) => {
        if (error) {
          response.send(error);
        }
        response.json(createdTodo);
      })
    })

    .get((request, response) => {
      Todo.find({}).select('text completed date').exec(function (error, todos) {
        if (error) {
          return console.error(error);
        }
        response.json(todos);
      });
    });

  router.route('/todo/:id')
    .put((request, response) => {
      Todo.findByIdAndUpdate(request.params.id, request.body, { new: true }, function (error, todo) {
        if (error) {
          return console.error(error);
        }
        response.json(todo);
      });
    })
    .delete((request, response) => {
      Todo.findByIdAndRemove(request.params.id, request.body, function (error, post) {
        if (error) {
          return console.error(error);
        }
        response.json(post);
      });
    });
}