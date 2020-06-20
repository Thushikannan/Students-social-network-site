const mongoose = require('mongoose');

const videoSchama = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: { type: String, required: true },
    content: { type: String, required: true },
    postImage: { type: String, required: true },
    date: { type: String, required: true },
    postBy:{type:mongoose.Schema.Types.ObjectId, ref:'User'}
});

module.exports = mongoose.model('Video', videoSchama);