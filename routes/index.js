var express = require('express');
var router = express.Router();
var wikiRouter = require('./wiki.js');
var userRouter = require('./user.js');


router.get('/', (req, res) => {
  res.send('this is the home page')
})

router.use('/wiki', wikiRouter);

module.exports = router;
