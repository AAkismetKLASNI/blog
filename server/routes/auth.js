const express = require('express');
const { login, register } = require('../controllers/user');
const mapUser = require('../helpers/mapUser');

const router = express.Router({ mergeParams: true });

router.post('/register', async (req, res) => {
  try {
    const { user, token } = await register(req.body.login, req.body.password);

    res
      .cookie('token', token, { httpOnly: true })
      .send({ error: null, user: mapUser(user) });
  } catch (error) {
    res.send({ error: error.message || 'Error!' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { user, token } = await login(req.body.login, req.body.password);

    res
      .cookie('token', token, { httpOnly: true })
      .send({ error: null, user: mapUser(user) });
  } catch (error) {
    res.send({ error: error.message || 'Error!' });
  }
});

router.post('/logout', async (req, res) => {
  res.cookie('token', '', { httpOnly: true }).send({});
});

module.exports = router;
