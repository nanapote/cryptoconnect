var express = require('express');
var router = express.Router();
var User = require('../models/user');


// GET route for reading data
router.get('/', function (req, res, next) {
  return res.sendFile(path.join(__dirname + '/views/index.html'));
});


//POST route for updating data
router.post('/', function (req, res, next) {
  // confirm that user typed same password twice
  // if (req.body.password !== req.body.passwordConf) {
  //   var err = new Error('Passwords do not match.');
  //   err.status = 400;
  //   res.send("passwords dont match");
  //   return next(err);
  // }

  if (req.body.fullname &&
    req.body.username &&
    req.body.email &&
    req.body.password
  ) {

    var userData = {
      fullname: req.body.fullname,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      reference: req.body.reference,
    }

    User.create(userData, function (error, user) {
      if (error) {
        return next(error);
      } else {
        req.session.userId = user._id;
        return res.redirect('/login');
      }
    });

  } else if (req.body.logemail && req.body.logpassword) {
    User.authenticate(req.body.logemail, req.body.logpassword, function (error, user) {
      if (error || !user) {
        var err = new Error('Wrong email or password.');
        err.status = 401;
        return next(err);
      } else {
        req.session.userId = user._id;
        return res.redirect('/dashboard');
      }
    });
  } else {
    return res.redirect('/registration');
    // var err = new Error('All fields required.');
    // err.status = 400;
    // return next(err);
  }
})

// GET route after registering
// router.get('/profile', function (req, res, next) {
//   User.findById(req.session.userId)
//     .exec(function (error, user) {
//       console.log("username= " +user.username);
//       if (error) {
//         return next(error);
//       } else {
//         if (user === null) {
//           var err = new Error('Not authorized! Go back!');
//           err.status = 400;
//           return next(err);
//         } else {
//           // return res.send('<h1>Name: </h1>' + user.username + '<h2>Mail: </h2>' + user.email + '<br><a type="button" href="/logout">Logout</a>')
//           return res.send(user.fullname)
//         }
//       }
//     });
// });

router.get("/login", function (req, res) {
    res.render("login");
});

router.get("/dashboard", function (req, res,next) {
  
    User.findById(req.session.userId)
    .exec(function (error, user) {
      console.log("username= " +user.username);
      if (error) {
        return next(error);
      } else {
        if (user === null) {
          var err = new Error('Not authorized! Go back!');
          err.status = 400;
          return next(err);
        } else {
          console.log("Inside else username= " +user.username);
          // return res.send('<h1>Name: </h1>' + user.username + '<h2>Mail: </h2>' + user.email + '<br><a type="button" href="/logout">Logout</a>')
          return res.render('dashboard', {user:user});
        }
      }
    });
});

router.get("/profile", function (req, res,next) {
  console.log("Profile before if username= " +req.body.fullname);
  
    User.findById(req.session.userId)
    .exec(function (error, user) {
console.log("username= " +user.username);
      if (error) {
        return next(error);
      } else {
        if (user === null) {
          var err = new Error('Not authorized! Go back!');
          err.status = 400;
          return next(err);
        } else {

          console.log("Profile Inside else username= " +user.username);
          console.log("Profile Inside else username= " +req.body.fullname);
          // var userUpdate = {$set:  {
          //     password: req.body.password
          //   } }
    
          // User.updateOne({_id:req.session.userId}, {$set: {username:"Jessica"}}, function(err, res) {
          //   if (error) {
          //     return next(error);
              
          //   } else {
          //     req.session.userId = user._id;
          //     console.log("1 document updated");
          //     // return res.redirect('/login.html');
          //   }

          // });
          // return res.send('<h1>Name: </h1>' + user.username + '<h2>Mail: </h2>' + user.email + '<br><a type="button" href="/logout">Logout</a>')
          return res.render('profile', {user:user});
          validate();
        }
      }
    });
});

function validate() {
  console.log("Inside validate function");
        var ra = document.getElementById("uname").value;
        var rag = document.getElementById("pwd").value;
        $.ajax({
       type: "POST",
        url: "/login",
            contentType: "application/json",
         dataType: 'json',
       data:JSON.stringify({
           username:ra,
           password:rag
       }),
       success: function() {
         alert('success');
       }
    });
        console.log(ra, rag)

    }


router.get("/updatepassword", function (req, res,next) {
  
    User.findById(req.session.userId)
    .exec(function (error, user) {
      console.log("username= " +user.username);
      if (error) {
        return next(error);
      } else {
        if (user === null) {
          var err = new Error('Not authorized! Go back!');
          err.status = 400;
          return next(err);
        } else {

          console.log("Inside else username= " +user.username);
          console.log("Inside else username= " +req.body.fullname);
          var userUpdate = {$set:  {
              password: req.body.password
            } }
    
          User.updateOne({_id:req.session.userId}, {$set: {username:"Nana"}}, function(err, res) {
            if (error) {
              return next(error);
              
            } else {
              req.session.userId = user._id;
              console.log("1 document updated");
              // return res.redirect('/login.html');
            }

          });
          // return res.send('<h1>Name: </h1>' + user.username + '<h2>Mail: </h2>' + user.email + '<br><a type="button" href="/logout">Logout</a>')
          return res.render('profile', {user:user});
        }
      }
    });
});

router.get("/registration", function (req, res) {
    res.render("registration"); 
});

router.get("/network", function (req, res,next) {
  
    User.findById(req.session.userId)
    .exec(function (error, user) {
      console.log("network username= " +user.username);
      if (error) {
        return next(error);
      } 
      else {
          console.log("Inside network else username= " +user.username);
          // return res.send('<h1>Name: </h1>' + user.username + '<h2>Mail: </h2>' + user.email + '<br><a type="button" href="/logout">Logout</a>')
          return res.render('network', {user:user});
        }
    });
});

router.get("/member", function (req, res,next) {
  
    User.findById(req.session.userId)
    .exec(function (error, user) {
      console.log("network username= " +user.username);
      if (error) {
        return next(error);
      } 
      else {
          console.log("Inside network else username= " +user.username);
          // return res.send('<h1>Name: </h1>' + user.username + '<h2>Mail: </h2>' + user.email + '<br><a type="button" href="/logout">Logout</a>')
          return res.render('member', {user:user});
        }
    });
});


// GET for logout logout
router.get('/logout', function (req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    });
  }
});

module.exports = router;