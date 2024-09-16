const express = require('express')
const app = express()
const ejs = require('ejs')
const mongoose = require('mongoose')
const expressSession = require('express-session')
const flash = require('connect-flash')

// นำเข้า controllers
const indexController = require('./controllers/indexController')
const loginController = require('./controllers/loginController')
const registerController = require('./controllers/registerController')
const storeUserController = require('./controllers/storeUserController')
const loginUserController = require('./controllers/loginUserController')
const logoutController = require('./controllers/logoutController')
const homeController = require('./controllers/homeController')
const profileController = require('./controllers/profileController')
const myboardController = require('./controllers/myboardController')
const otherController = require('./controllers/otherController')
const createpostController = require('./controllers/createpostController')
const { createPost } = require('./controllers/addpostController')
const redirectIfAuth = require('./middleware/redirectIfAuth')
const authMiddieware = require('./middleware/authMiddieware')

// นำเข้าโมเดล Post
const Post = require('./models/createpost')

// เชื่อมต่อกับ MongoDB
mongoose.connect('mongodb+srv://darktee6:Tee0612454246@darktee24.pevzrfy.mongodb.net/?retryWrites=true&w=majority&appName=DarkTee24');

// กำหนดค่าเริ่มต้นสำหรับตัวแปร global
global.loggedIn = null

// ใช้งาน middleware
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true })) // ปรับออปชันให้ถูกต้อง
app.use(flash())
app.use(expressSession({
    secret: "node secret"
}))

// กำหนดค่า loggedIn ในทุก ๆ request
app.use("*", (req, res, next) => {
    loggedIn = req.session.userId
    next()
})

// ตั้งค่า view engine
app.set('view engine', 'ejs')

// กำหนดเส้นทางต่าง ๆ
app.get('/', indexController)
app.get('/home', authMiddieware, homeController)
app.get('/profile', authMiddieware, profileController)
app.get('/myboard', authMiddieware, myboardController)
app.get('/createpost', authMiddieware, createpostController)
app.post('/create-post', createPost)
app.get('/other', authMiddieware, otherController)
app.get('/login', redirectIfAuth, loginController)
app.get('/register', redirectIfAuth, registerController)
app.post('/user/register', redirectIfAuth, storeUserController)
app.post('/user/login', redirectIfAuth, loginUserController)
app.get('/logout', logoutController)

// เส้นทางสำหรับแสดงข้อมูลจาก MongoDB
app.get('/show', async (req, res) => {
    try {
        const posts = await Post.find({});
        res.json(posts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

// เริ่มต้นเซิร์ฟเวอร์
app.listen(4000, () => {
    console.log("App listening on port 4000")
})
