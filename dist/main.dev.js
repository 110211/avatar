"use strict";

var express = require('express');

var bodyParser = require('body-parser');

var db = require('./lib/mongo');

var jwt = require('./lib/jwt');

var app = express();
var port = process.env.PORT || 3000;
process.env.TZ = 'Asia/Ho_Chi_Minh';
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json({
  extended: true
}));
app.use(express["static"](__dirname));
app.get('/', function (req, res) {
  res.sendFile('./index.html', {
    root: __dirname
  });
});
app.get('/login', function (req, res) {
  res.sendFile('./login.html', {
    root: __dirname
  });
});
app.get('/me', function (req, res) {
  res.setHeader("content-type", "application/json; charset=utf-8");
  var header = req.header('authorization');
  var token = jwt.getTokenFromHeader(header);
  var verify = jwt.verifyJWTToken(token);

  if (!verify) {
    res.send(JSON.stringify({
      message: "Token không hợp lệ hoặc đã hết hạn",
      success: false
    }));
  } else {
    res.send(JSON.stringify({
      message: 'Kiểm tra thông tin thành công',
      user: verify.user,
      success: true
    }));
  }
});
app.get('/admin', function (req, res) {
  res.sendFile('./adpanel.html', {
    root: __dirname
  });
}); /// api

app.post('/api/login', function _callee(req, res) {
  var user, password, data;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          user = req.body.user;
          password = req.body.password;
          _context.next = 4;
          return regeneratorRuntime.awrap(db.findData('plantszombie', 'users', {
            user: user,
            password: password
          }));

        case 4:
          data = _context.sent;
          res.setHeader("content-type", "application/json; charset=utf-8");

          if (data.length > 0) {
            res.send(JSON.stringify({
              success: true,
              token: jwt.createJWTToken({
                user: user
              }),
              right: data[0].right,
              message: "Login thành công"
            }));
          } else {
            res.send(JSON.stringify({
              success: false,
              message: "Sai tài khoản hoặc mật khẩu"
            }));
          }

        case 7:
        case "end":
          return _context.stop();
      }
    }
  });
});
app.listen(port, function () {
  console.log("server is running on port 3000");
});
//# sourceMappingURL=main.dev.js.map
