const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: String,
    content: String,
    position: String,
    username: {
        type: String,
        required: true // กำหนดให้เป็นฟิลด์ที่ต้องการ
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
