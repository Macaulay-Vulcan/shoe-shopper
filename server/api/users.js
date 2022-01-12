const router = require('express').Router();
const {
  models: { User },
} = require('../db');

const { requireToken, isAdmin } = require('./gateKeepingMiddleWare');

//before I hit '/' route, I will make sure I am logged in first w/ requireToken
//also I will make sure I am an admin, once I'm logged in!
//If both true, continue
//test in local browser or postman
router.get('/', requireToken, isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'username'],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
