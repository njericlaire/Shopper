const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Cloth =require('../models/Clothes');
require('dotenv').config();
const crypto= require('crypto');

 function generateToken() {
  return crypto.randomBytes(32).toString('hex');
}

exports.register = async (req, res) => {
  const { first_name, last_name, email, password, phone } = req.body;

  try {
    let user = await User.getUserByEmail(email);
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userData = {
      first_name,
      last_name,
      email,
      password: hashedPassword,
      phone,
      created_on: Math.floor(Date.now() / 1000),
      updated_on: Math.floor(Date.now() / 1000)
    };

    const userId = await User.createUser(userData);
    return res.status(200).json({ msg: 'User created successfully' });

    // const payload = { user: { id: userId } };

    // jwt.sign(
    //   payload,
    //   process.env.JWT_SECRET,
    //   { expiresIn: '1h' },
    //   (err, token) => {
    //     if (err) throw err;
    //     res.json({ token });
    //   }
    // );
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err.message);
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.getUserByEmail(email);
    if (!user) {
      return res.status(400).json({ msg: 'User does not exist' });

    }
   

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    //const payload = { user: { id: user.user_id } };

    const token = generateToken();
    return res.status(200).json({ msg: 'User logged in succesfully', token:token });
    

    // jwt.sign(
    //   payload,
    //   process.env.JWT_SECRET,
    //   { expiresIn: '1h' },
    //   (err, token) => {
    //     if (err) throw err;
    //     res.json({ token });
    //   }
    // );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};


exports.checkEmail=async(req,res)=>{
  const { email } = req.body;
  let user = await User.getUserByEmail(email);
  if (user) {
    res.json({ exists: true });
  } else {
    res.json({ exists: false });
  }
};

exports.makeCloth = async (req, res) => {
  const { type, size, old_price, new_price, image } = req.body;

  try {

    const clothData = {
      type, size, old_price, new_price, image
    };

    const clothId = await Cloth.createCloth(clothData);
    return res.status(200).json({ msg: 'New cloth added successfully' });

    // const payload = { user: { id: userId } };

    // jwt.sign(
    //   payload,
    //   process.env.JWT_SECRET,
    //   { expiresIn: '1h' },
    //   (err, token) => {
    //     if (err) throw err;
    //     res.json({ token });
    //   }
    // );
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err.message);
  }
};


