
var express = require('express');
var router = express.Router();
var models = require('../models');
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
  let authorId;
  
  
  User.findOrCreate({where:{
    name: author,
    email: email
  }}).spread((user, created) => {
    return Page.create({
      title: title,
      content: content,
      status: status
    })
  }).catch(err => console.log(err))

  var page = Page.build({
    title: title,
    content: content,
  });

 

  // STUDENT ASSIGNMENT:
  // make sure we only redirect *after* our save is complete!
  // note: `.save` returns a promise or it can take a callback.
  page.save().then(function(savedPage) {
    res.redirect(savedPage.route)
  }).catch(function(err){
    console.log(err);
  });
  // -> after save -> res.redirect('/');

});

router.get('/add', function(req, res, next) {
  res.render('addpage', {

  })
});


router.get('/:urltitle', function(req, res, next) {
  var urltitle = req.params.urltitle;
  Page.findOne({
    where: {urlTitle: urltitle}
  }).then(data => {
    
    // res.json(data)
    res.render('wikipage', {
      title: data.title,
      content: data.content,
      urlTitle: data.urlTitle
      // page: data
    })
  }).catch(next);

})

// console.log(router);

module.exports = router;
