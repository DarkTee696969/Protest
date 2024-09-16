const express = require('express');
const router = express.Router();
const Post = require('../models/createpost');

router.get('/show', async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });  // เรียงลำดับจากโพสต์ใหม่สุด
        res.json(posts);  // ส่งข้อมูลแบบ JSON กลับไป
    } catch (error) {
        res.status(500).send('Error occurred while fetching posts');
    }
});

module.exports = router;
