import mongoose, { Schema } from 'mongoose';
import SettingsSchema from './SettingsSchema';
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
    first: {
      type: String,
      required: true
    },
    last: {
      type: String,
      required: true
    }
  },
  email: {
    required: true,
    type: String,
  },
  password: {
    require: true,
    type: String,
  },
  settings: SettingsSchema,
  loginAttempts: Number,
  lastLogin: { type: Date, default: Date.now },
  lastUpdate: { type: Date, default: Date.now },
  active: {
    type: Boolean,
    default: true,
  },
  locked: {
    type: Boolean,
    default: false,
  }
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
