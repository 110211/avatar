
const express = require('express')
const bodyParser = require('body-parser')
const db = require('./lib/mongo')
const jwt = require('./lib/jwt')
const app = express()
const port = process.env.PORT || 3000



process.env.TZ = 'Asia/Ho_Chi_Minh' 

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.urlencoded({extended: true}))
app.use(express.json({extended: true}))
app.use(express.static(__dirname))

app.get('/', (req, res) => {
    res.sendFile('./index.html', {root: __dirname})
})

app.get('/login', (req, res) => {
    res.sendFile('./login.html', {root: __dirname})
})

app.get('/me', (req, res) => {
    res.setHeader("content-type", "application/json; charset=utf-8")
    let header = req.header('authorization')
    let token = jwt.getTokenFromHeader(header)
    let verify = jwt.verifyJWTToken(token)
    if (!verify) {
        res.send(JSON.stringify({message: "Token không hợp lệ hoặc đã hết hạn", success: false}))
    } else {
        res.send(JSON.stringify({message: 'Kiểm tra thông tin thành công', user: verify.user, success: true}))
    }
}) 

app.get('/admin', (req, res) => {
    res.sendFile('./admin.html', {root: __dirname})
})
/// api

app.post('/api/login', async (req, res) => {
    let user = req.body.user
    let password = req.body.password
    let data = await db.findData('plantszombie', 'users', {user: user, password: password})
    res.setHeader("content-type", "application/json; charset=utf-8")
    if (data.length > 0) {
        res.send(JSON.stringify({
            success: true,
            token: jwt.createJWTToken({user: user}),
            right: data[0].right,
            message: "Login thành công"
        }))
    } else {
        
        res.send(JSON.stringify({
            success: false,
            message: "Sai tài khoản hoặc mật khẩu"
        }))
    }
})


app.listen(port, function(){
    console.log("server is running on port 3000")
})