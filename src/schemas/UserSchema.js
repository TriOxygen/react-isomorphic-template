import { Schema } from 'mongoose';
const { ObjectId } = Schema;

const User = new Schema({
  id: ObjectId,
  name: {
    first: String,
    last: String
  },
  email: String,
  password: String,
  loginAttempts: Number,
  lastLogin: { type: Date, default: Date.now },
  lastUpdate: { type: Date, default: Date.now },
  active: Boolean,
  locked: Boolean
});

export default User;
