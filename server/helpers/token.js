const jwt = require('jsonwebtoken');

const sign = 'testpassword';

module.exports = {
  generate: function (data) {
    return jwt.sign(data, sign, { expiresIn: '30d' });
  },
  verify: function (token) {
    return jwt.verify(token, sign);
  },
};
