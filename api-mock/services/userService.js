const path = require('path');
const { readJson, writeJson, nextId } = require('./jsonDb');

const USERS_FILE = path.join(__dirname, '..', '..', 'db', 'users.json');

async function getUsers() {
  return readJson(USERS_FILE, []);
}

async function findUserByUsername(username) {
  const users = await getUsers();
  return users.find((user) => user.username.toLowerCase() === username.toLowerCase());
}

async function createUser(user) {
  const users = await getUsers();
  const existing = users.find(
    (entry) => entry.username.toLowerCase() === user.username.toLowerCase(),
  );
  if (existing) {
    const error = new Error('Username already exists');
    error.status = 409;
    throw error;
  }

  const newUser = {
    id: nextId(users),
    username: user.username,
    passwordHash: user.passwordHash,
    role: user.role || 'student',
  };

  users.push(newUser);
  await writeJson(USERS_FILE, users);
  return newUser;
}

module.exports = {
  getUsers,
  findUserByUsername,
  createUser,
};
