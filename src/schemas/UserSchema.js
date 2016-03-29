import mongoose, { Schema } from 'mongoose';
import { addMessages, translate as _l } from 'lib/I18n';
const { ObjectId } = Schema;

addMessages({
  ['en-US']: {
    'This email is already in use.': 'This email is already in use.',
  }
});

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

const model = mongoose.model('User', User);

User.path('email').validate(function(value, done) {
  model.count({ email: value, _id: { $ne: this._id } }, (err, count) => {
    if (err) {
      return done(err);
    }
    done(!count);
  });
}, _l`This email is already in use.`);


export default User;
