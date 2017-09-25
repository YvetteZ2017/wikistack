var express = require('express');
var router = express.Router();
var wikiRouter = require('./wiki.js');
var userRouter = require('./user.js');
var models = require('../models');
var Page = models.Page;
var User = models.User;


router.get('/', (req, res) => {
  //res.send('this is the home page')
  Page.findAll().then(pages=>{
    res.render('index', {
      pages: pages
    })
    //res.render()
  })
})

router.use('/wiki', wikiRouter);

module.exports = router;
