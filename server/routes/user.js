import express from 'express';
import passport from 'passport';
import User from '../models/user';
const router = express.Router();

/*
    ACCOUNT SIGN UP: POST /api/user/signup
    BODY SAMPLE: {
      "email": "test",
      "name": "test",
      "password": "test",
    }
    ERROR CODES:
      1: BAD USERNAME
      2: BAD PASSWORD
      3: USERNAME EXISTS
*/
router.post('/signup', (req, res) => {
  // CHECK USERNAME FORMAT
  // 정규식 for Email 만들기
  // let usernameRegex = /^[a-z0-9]+$/;
  //
  // if(!usernameRegex.test(req.body.username)) {
  //   return res.status(400).json({
  //     error: "BAD USERNAME",
  //     code: 1,
  //   });
  // }

  // CHECK PASS LENGTH
  if(req.body.password.length < 4 || typeof req.body.password !== "string") {
    return res.status(400).json({
      error: "BAD PASSWORD",
      code: 2,
    });
  }

  // CHECK USER EXISTANCE
  User.findOne({email: req.body.email}, (err, exists) => {
    if (err) throw err;
    if(exists) {
      return res.status(409).json({
        error: "EMAIL EXISTS",
        code: 3,
      });
    }

    // CREATE ACCOUNT
    let user = new User();
    user.email = req.body.email;
    user.name = req.body.name;
    user.setPassword(req.body.password);

    // SAVE IN THE DATABASE
    user.save( (err, user) => {
      if(err) throw err;
      return res.json({success: true});
      // res.render('profile', {user: req.session.user});
    });
  });
});

/*
    ACCOUNT SIGN IN: POST /api/user/signin
    BODY SAMPLE: {
      "email": "test",
      "password": "test",
    }
    ERROR CODES:
      1: SIGN IN FAILED
*/
router.post('/signin', (req, res) => {
  if(typeof req.body.password !== 'string') {
    return res.status(401).send({
      failReason: 'Password you put is not characters.',
    });
  }

  passport.authenticate('local', function(err, user, info) {
    if(err) {
      return res.status(401).send({
        failReason: 'err authenticate in server ' + err,
      });
    }
    if(user) {
      let token = user.generateJwt();
      return res.json({
        token: token,
      });
    } else {
      res.status(401).send({
        failReason: 'info authenticate in server ' + info,
      });
    }
  })(req, res);
});

export default router;
