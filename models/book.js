const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const path = require('path');
const coverImageBasePath = 'uploads/bookCovers'

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

bookSchema.virtual('coverImagePath').get(function() {
    if(this.coverImage != null)
    {
        return path.join('/', coverImageBasePath, this.coverImage)
    }
})

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;
module.exports.coverImageBasePath = coverImageBasePath;
