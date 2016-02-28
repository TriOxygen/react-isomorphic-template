import mongoose from 'mongoose';

export default function getSchema(modelName) {
  try {
    if (mongoose.model(modelName)) {
      const model = mongoose.model(modelName);
      return model;
    }
  } catch(e) {
    if (e.name === 'MissingSchemaError') {
      const schema = require('./' + modelName + 'Schema').default;
      const model = mongoose.model(modelName, schema);
      return model;
    }
  }
}