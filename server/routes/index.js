import express from 'express';
import user from './user';
// const jwt from 'express-jwt';
// const auth = jwt({
//   secret: 'mernblog',
//   userProperty: 'payload'
// });
const router = express.Router();

router.use('/*', (req, res, next) => {
  res.setHeader("Expires", "-1");
  res.setHeader("Cache-Control", "must-revalidate, private");
  next();
});

// DATA FOR USER
router.use('/user', user);

export default router;
