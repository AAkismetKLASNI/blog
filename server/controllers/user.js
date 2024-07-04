const { generate } = require('../helpers/token');
const bcrypt = require('bcrypt');
const ROLES = require('../constants/roles');
const User = require('../models/User');

module.exports = {
  register,
  login,
  deleteUser,
  updateUser,
  getRoles,
  getUsers,
};

async function register(login, password) {
  if (!password) throw new Error('Error not exist');

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await User.create({ login, password: passwordHash });

  const token = generate({ id: user.id });

  return { user, token };
}

async function login(login, password) {
  const user = await User.findOne({ login });

  if (!user) {
    throw new Error('User not found');
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    throw new Error('Wrong password');
  }

  const token = generate({ id: user.id });

  return { user, token };
}

async function getUsers() {
  const users = await User.find();

  return users;
}

async function deleteUser(id) {
  await User.deleteOne({ _id: id });
}

async function updateUser(id, userData) {
  const newUser = await User.findByIdAndUpdate(id, userData, {
    returnDocument: 'after',
  });

  return newUser;
}

function getRoles() {
  return [
    { id: ROLES.ADMIN, name: 'Admin' },
    { id: ROLES.MODERATOR, name: 'Moderator' },
    { id: ROLES.READER, name: 'Reader' },
    { id: ROLES.GUEST, name: 'Guest' },
  ];
}
