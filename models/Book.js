

import mongoose from 'mongoose'

const BookSchema = new mongoose.Schema({
  bookName: {
    type: String,
  },
  bookGenre: {
    type: String,
  },
  Price: Number,
  Author:String,
  url:String

});

const Book = mongoose.model('Book', BookSchema);
export default Book