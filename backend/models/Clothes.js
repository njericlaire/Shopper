const pool = require('../config/db');


const getUserById = async (cloth_id) => {

    const [rows] = await pool.query('SELECT * FROM clothes WHERE cloth_id = ?', [cloth_id]);
    
    return rows[0];
  };

const createCloth = async (clothData) => {
    const {
        type,
        size,
        old_price, 
        new_price,
        image
    } = clothData;
  
    const [result] = await pool.query(
      `INSERT INTO users 
       (type, size, old_price, new_price, image)
       VALUES (?, ?, ?, ?, ?)`,
      [
        type, size, old_price, new_price, image
      ]
    );
    console.log(result)
  
    return result.insertId;
  };
  module.exports = {
    createCloth,
  };