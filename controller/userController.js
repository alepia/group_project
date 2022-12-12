const pool = require("../db/db");
const queries = require("./userQueries");
const getUsers = (req, res) => {
  pool.query(queries.getUsers, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const getUserByEmail = (req, res) => {
  const email = req.params.email;
  console.log({ email });
  console.log(req.body.email); //to get the id parameter from url, it is string so we need to change to interger
  pool.query(queries.getUserByEmail, [email], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const userLogin = (req, res) => {
  const email = req.body.email;
  const password = req.body.password
  pool.query(queries.getUserByEmailAndPassword, [email, password], (error, results) => {
     if(results.rows.length === 0) res.send("Invalid email or password")
     res.send("successfully login");
  })
}

const addUser = (req, res) => {
  const { email, first_name, last_name, password } = req.body;
  //check if the email exits in database
  console.log({ email, first_name, last_name, password });
  pool.query(queries.checkEmailExits, [email], (error, results) => {
    if (results.rows.length) res.send("Email already exits.");
    //add students to db
  });
  pool.query(
    queries.addUser,
    [email, first_name, last_name, password],
    (error, results) => {
      if (error) throw error;
      res.status(201).send("Account create successful");
    }
  );
};

const removeUser = (req, res) => {
  const email = req.params.email;
  pool.query(queries.getUserByEmail, [email], (error, results) => {
    const noUserFund = !results.rows.length;
    if (noUserFund) {
      res.send("User can not be found in database");
    }
  });
  pool.query(queries.removeUser, [email], (error, results) => {
    if (error) throw error;
    res.status(200).send("User remove successfully");
  });
};

const updateUser = (req, res) => {
  const id = parseInt(req.params.id);
  const { name } = req.body;
  pool.query(queries.getUserById, [id], (error, results) => {
    const noUserFund = !results.rows.length;
    if (noUserFund) {
      res.send("User account can not be found in database");
    }
    pool.query(queries.updateUser, [name, id], (error, results) => {
      if (error) throw error;
      res.status(200).send("User account updated successfully");
    });
  });
};

module.exports = {
  getUsers,
  getUserByEmail,
  addUser,
  removeUser,
  updateUser,
  userLogin
};
