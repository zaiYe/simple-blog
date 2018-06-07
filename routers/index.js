const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  let msg = req.user || 'Hello world!';
  res.send(msg);
});

module.exports = router;
