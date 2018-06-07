const express = require('express');
const router = express.Router();
const Post = require('../models/post');

router.get('/', (req, res) => {
    Post.find({}).sort({created_at: -1})
      .then(list => {
        return res.json({success: true, data: list});
      })
      .catch(err => {
        return res.json({success: false, msg: err});
      })
    // Post.find({}, (err,list) => {
    //   if(err){
    //     return res.json({success: false, msg: err});
    //   }
    //   return res.json({success: true, data: list});
    // });
  })
  .post('/', (req, res) => {
    const user = req.user;
    if (!user) {
      return res.json({success: false, msg: '缺少token'});
    }
    const title = req.body.title,
      content = req.body.content,
      userName = user.userName;
    Post.create({title, content, auth: userName})
      .then(post => {
        res.json({success: true, data: true});
      })
      .catch(err => {
        res.json({success: false, msg: err});
      });

  });

router.get('/userPostList', (req, res) => {
  const user = req.user;
  if (!user) {
    return res.json({success: false, msg: '缺少token'});
  }
  Post.find({auth: user.userName}).sort({created_at: -1})
    .then(list => {
      return res.json({success: true, data: list});
    })
    .catch(err => {
      return res.json({success: false, msg: err});
    })

});

module.exports = router;
