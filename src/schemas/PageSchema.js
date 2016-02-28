import { Schema } from 'mongoose';
import RowSchema from './RowSchema';
const { ObjectId } = Schema;

const Page = new Schema({
  id: ObjectId,
  name: String,
  children: { type: [ RowSchema ], default: []}
});

export default Page;
