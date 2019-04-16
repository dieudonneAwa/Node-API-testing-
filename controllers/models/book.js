const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//book schema definition
const BookSchema = new Schema(
    {
        title: { type: String },
        author: { type: String },
        year: { type: Number },
        pages: { type: Number, required: true, min: 1 },
        createdAt: { type: Date, default: Date.now },
    },
    {
        versionKey: false
    }
);

// Sets the createdAt parameter equal to the current time
BookSchema.pre('save', next => {
    now = new Date();
    if (!this.createdAt) {
        this.createdAt = now;
    }
    next();
});

//Exports the BookSchema for use elsewhere.
module.exports = mongoose.model('book', BookSchema);