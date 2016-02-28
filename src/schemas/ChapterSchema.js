import { Schema } from 'mongoose';
import PageSchema from './PageSchema';
const { ObjectId } = Schema;

const Chapter = new Schema({
  id: ObjectId,
  name: String,
  children: { type: [ PageSchema ], default: [] }
});

export default Chapter;
