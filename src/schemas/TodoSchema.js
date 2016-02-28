import { Schema } from 'mongoose';

const Todo = new Schema({
    text: String,
    completed: Boolean,
    date: { type: Date, default: Date.now }
});

export default Todo;

//export default mongoose.model('Todo', Todo);