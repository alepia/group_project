const getUsers = "SELECT * FROM users";
const getUserByEmail = "SELECT * FROM users WHERE email = $1";
const checkEmailExits = "SELECT FROM users WHERE email = $1";

const addUser =
  "INSERT INTO users (email, first_name, last_name, password) values ($1, $2, $3, $4)";
const removeUser = "DELETE FROM users WHERE email = $1";
const updateUser = "UPDATE users SET name = $1 WHERE email = $2";
const getUserByEmailAndPassword =
  "SELECT * FROM users WHERE email = $1 and password = $2";

module.exports = {
  getUsers,
  getUserByEmail,
  checkEmailExits,
  addUser,
  removeUser,
  getUserByEmailAndPassword,
};
