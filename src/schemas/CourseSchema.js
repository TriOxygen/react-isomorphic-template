import { Schema } from 'mongoose';
import ChapterSchema from './ChapterSchema';
const { ObjectId } = Schema;

const Course = new Schema({
  id: ObjectId,
  name: String,
  description: String,
  theme: { type: String, default: 'default' },
  children: { type: [ ChapterSchema ], default: [] }
});

export default Course;
