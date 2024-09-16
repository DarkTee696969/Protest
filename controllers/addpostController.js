const Post = require('../models/createpost'); // ปรับเส้นทางตามที่ตั้งของไฟล์โมเดล

const createPost = async (req, res) => {
    const { title, content, position, username } = req.body;

    if (!title || !content || !position || !username) {
        return res.status(400).send('All fields are required');
    }

    try {
        const newPost = new Post({
            title,
            content,
            position,
            username, // เพิ่ม username ลงในเอกสาร
            createdAt: new Date(),
        });

        await newPost.save();

        console.log('New Post Created:', newPost);
        res.redirect('/myboard'); // Redirect to a page where users can see the new post
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = { createPost };
