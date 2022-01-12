/*
stores all functions that act as middleware between
request and response and use as we see fit
*/

const {
  models: { User },
} = require('../db');

const requireToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = await User.findByToken(token);
    req.user = user;
  } catch (error) {
    next(error);
  }
};

const isAdmin = (req, res, next) => {
  if (!req.user.isAdmin) {
    return res
      .status(403)
      .send('Must be an administrator to view this page!');
  } else {
    next();
  }
};
module,
  (exports = {
    requireToken,
    isAdmin,
  });
