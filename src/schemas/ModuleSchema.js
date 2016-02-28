import { Schema } from 'mongoose';
const { ObjectId } = Schema;
const { Mixed } = Schema.Types;

const Module = new Schema({
  id: ObjectId,
  type: { type: String, default: 'Text' },
  data: Mixed
});

export default Module;
