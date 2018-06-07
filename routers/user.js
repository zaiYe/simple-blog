const express = require('express');
const crypto = require('crypto');
const assert = require('assert');
const jwt = require('jwt-simple');
const moment = require('moment');
const User = require('../models/user');
const jwtTokenSecret = require('../config/constant').jwtTokenSecret;
const router = express.Router();

router.post('/reg', (req, res) => {
    const userName = req.body.userName,
      email = req.body.email,
      password = req.body.password,
      md5 = crypto.createHash('md5');

    if (!userName || userName.length <= 3) {
      return res.json({success: false, msg: '用户名格式不正确!'});
    }
    if (!email || email.trim() === '') {
      return res.json({success: false, msg: '邮箱格式不正确!'});
    }
    if (!password || (password.length <= 3 && password.length > 10)) {
      return res.json({success: false, msg: '密码格式不正确!'});
    }

    const passwordForMd5 = md5.update(password).digest('hex');
    let newUser = new User({
      userName: userName,
      email: email,
      password: passwordForMd5
    });

    User.findOne({userName: userName})
      .then((user) => {
        if (user === null) {
          return newUser.save();
        } else {
          return Promise.reject('用户名已经被注册！');
        }
      })
      .then(user => {
        let userInfo = {userName: user.userName, email: user.email},
          token = createToken(user._id);
        return res.json({success: true, data: {userInfo, token}});
      })
      .catch(err => {
        return res.json({success: false, msg: err});
      });

    // User.create({
    //   userName: userName,
    //   email: email,
    //   password: passwordForMd5
    // }, (err, user) => {
    //   if (err) {
    //     res.json({success: false, msg: err});
    //   } else {
    //     res.json({success: true, data: true});
    //   }
    // });
  })
  .post('/login', (req, res) => {
    const userName = req.body.userName,
      password = req.body.password,
      md5 = crypto.createHash('md5');

    if (!userName || userName.trim() === '') {
      return res.json({success: false, msg: '用户名不能为空!'});
    }
    if (!password || password.trim() === '') {
      return res.json({success: false, msg: '密码不能为空!'});
    }
    let passwordForMd5 = md5.update(password).digest('hex');
    User.findOne({userName: userName})
      .then(user => {
        if (user.password !== passwordForMd5) {
          return Promise.reject('密码错误!');
        } else {
          let userInfo = {userName: user.userName, email: user.email},
            token = createToken(user._id);
          return res.json({success: true, data: {userInfo, token}});
        }
      })
      .catch(err => {
        try {
          assert.deepEqual(err, {});
          return res.json({success: false, msg: '用户名不存在！'});
        } catch (e) {
          return res.json({success: false, msg: err});
        }
      });
  });

module.exports = router;

function createToken(id) {
  let expires = moment().add(7, 'days').valueOf();
  return jwt.encode({
    iss: id,
    exp: expires
  }, jwtTokenSecret);
}
