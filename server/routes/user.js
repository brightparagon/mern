import express from 'express';
import passport from 'passport';
import User from '../models/user';
const router = express.Router();

/*
    ACCOUNT SIGNUP: POST /api/user/signup
    BODY SAMPLE: { "username": "test", "password": "test" }
    ERROR CODES:
        1: BAD USERNAME
        2: BAD PASSWORD
        3: USERNAM EXISTS
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
      // 여기서 로그인 유무 변수를 던져줘서 네비게이션을 통제
      const token = user.generateJwt();
      // 토큰을 만들었지만 프론트 프레임워크가 없기 때문에 지금은 필요가 없다 -> 직접 user 전달
      req.session.user = user;
      return res.json({success: true});
      // res.render('profile', {user: req.session.user});
    });
  });
});

// module.exports.signIn = function(req, res, next) {
//   passport.authenticate('local', function(err, user, info) {
//     if(err) {
//       res.status(404).json(err);
//       return;
//     }
//     if(user) {
//       const token = user.generateJwt();
//       req.session.user = user;
//       res.render('profile', {user: req.session.user});
//     } else {
//       res.status(401).json(info);
//     }
//   })(req, res);
// };
//
// module.exports.signOut = function(req, res, next) {
//   delete req.session.user;
//   res.redirect('/');
// };
//
// module.exports.profile = function(req, res, next) {
//   User.findById(req.query.userId).populate('posts')
//    .exec(function(err, user) {
//     if(err) return next(err);
//     res.render('profile', {user: user});
//   });
// };

export default router;
