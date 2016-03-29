import { Schema } from 'mongoose';
const { ObjectId } = Schema;

const Settings = new Schema({
  id: ObjectId,
  locale: {
    locale: {
      type: String,
      default: 'en-US'
    },
    defaultCurrency: {
      type: String,
      default: 'EUR'
    },
  },
  theme: {
    primary: {
      type: String,
      default: 'red'
    },
    secondary: {
      type: String,
      default: 'orange'
    },
    tertiary: {
      type: String,
      default: 'grey'
    },
    main: {
      type: String,
      default: 'light'
    }
  }
});

export default Settings;
