import { Schema } from 'mongoose';
import ModuleSchema from './ModuleSchema';
const { ObjectId } = Schema;

const Row = new Schema({
  id: ObjectId,
  name: String,
  children: { type: [ ModuleSchema ], default: [] }
});

export default Row;
