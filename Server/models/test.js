import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const testSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  }
});

export default model('test', testSchema);
