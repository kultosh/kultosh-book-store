const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title: {
        type: String,
        required: true
    },

    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Author'
    },

    publishDate: {
        type: Date,
        required: true
    },

    pageCount: {
        type: Number,
        required: true
    },

    coverImage: {
        type: String,
        required: true
    },

    description: {
        type: String
    }

}, {timestamps: true});

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;
