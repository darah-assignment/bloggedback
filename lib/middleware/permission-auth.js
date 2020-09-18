'use strict';

module.exports = capability => {
  return (req, res, next) => {
    console.log('CONSOLE ===== capabilities', req.user);
    try {
      if (req.user.capabilities.capabilities.includes(capability)) {
        next();
      } else {
        next('Permission to access denied.');
      }
    } catch (err) {
      next('Invalid Login');
    }
  };
};
