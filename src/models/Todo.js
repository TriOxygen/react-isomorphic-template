import mongoose, { Schema } from 'mongoose';

const Todo = new Schema({
    text: String,
    completed: Boolean,
    date: { type: Date, default: Date.now }
});

export default mongoose.model('Todo', Todo);