import { Schema, model } from 'mongoose';
import { ObjectId } from 'bson';

/**
 * Schema for Book model
 */
const bookSchema = new Schema({
  timestamp: { type: Date, required: true },
  name: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String },
});

const Book = model('Book', bookSchema);


export { Book };
