
var express = require('express');
var models = require('../models');
var router = express.Router();
var Page = models.Page;
var User = models.User;

router.get('/', function(req, res, next) {
    // res.send('got to GET /wiki/');
    res.redirect('/wiki/add')

  });

router.post('/', function(req, res, next) {
  let author = req.body.author;
  let email = req.body.email;
  let title = req.body.title;
  let content = req.body.content;
  let status = req.body.status;

  var page = Page.build({
    title: title,
    content: content
  });

  // STUDENT ASSIGNMENT:
  // make sure we only redirect *after* our save is complete!
  // note: `.save` returns a promise or it can take a callback.
  page.save().then(res.json(page)).catch(function(err){
    console.log(err);
  });
  // -> after save -> res.redirect('/');

});

router.get('/add', function(req, res, next) {
  res.render('addpage')
});


router.get('/:urltitle', function(req, res, next) {
  var urltitle = req.params.urltitle;
  Page.findOne({
    where: {urlTitle: urltitle}
  }).then(data => {
    res.json(data)
  }).catch(next);

})

// console.log(router);

module.exports = router;
