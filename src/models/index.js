import mongoose from 'mongoose';

export default function getModel(modelName) {
  try {
    if (mongoose.model(modelName)) {
      return mongoose.model(modelName);
    }
  } catch(e) {
    if (e.name === 'MissingSchemaError') {
      const model = require('./' + modelName);
      return mongoose.model(modelName, model);
    }
  }
}