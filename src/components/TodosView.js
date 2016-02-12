import React from 'react';
import { PropTypes } from 'react';

const css = oxygenCss({
  root: {
    margin: 14
  },
});

const css2 = oxygenCss({
  root: {
    fontSize: 10,
    '@phone': {
      fontSize: 11
    }
  }
});

const css3 = oxygenCss({
  root: {
    fontSize: 20,
    '@phone': {
      fontSize: 12
    },
    '@desktop': {
      fontSize: 20
    }
  }
});

export default class TodosView extends React.Component {
  static propTypes = {
    todos: PropTypes.array.isRequired,
    editTodo: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired
  };

  handleDelete = (id) => {
    this.props.deleteTodo(id);
  };

  handleEdit = (id, currentVal) => {
    // For a cutting edge UX
    let text = window.prompt('', currentVal);

    this.props.editTodo(id, text);
  };

  render() {
    const btnStyle = {
      'margin': '1em 0 1em 1em'
    };

    return (
      <div className={css.root}>
        <div className={css2.root}>Wuth</div>
      123
        {
          this.props.todos.map(function (todo, index) {
            return (
              <div style={btnStyle} key={todo._id}>
                <span className={css3.root}>{todo.text}</span>

                <button style={btnStyle} data-id={index} onClick={this.handleDelete.bind(this, todo._id)}>X</button>
                <button style={btnStyle} data-id={index} onClick={this.handleEdit.bind(this, todo._id, todo.text)}>Edit</button>
              </div>
            );
          }.bind(this))
        }
      </div>
    );
  }
}
