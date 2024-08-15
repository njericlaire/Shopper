const pool = require('../config/db');

// Get user by email
const getUserByEmail = async (email) => {

  const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
  
  return rows[0];
};

// Register new user
const createUser = async (userData) => {
  const {
    first_name,
    last_name,
    email,
    password,
    phone,
    created_on,
    updated_on
  } = userData;

  const [result] = await pool.query(
    `INSERT INTO users 
     (first_name, last_name, email, password, phone, created_on, updated_on)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      first_name,
      last_name,
      email,
      password,
      phone,
      created_on,
      updated_on
    ]
  );
  console.log(result)

  return result.insertId;
};

module.exports = {
  getUserByEmail,
  createUser,
};
