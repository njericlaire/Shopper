const pool = require('../config/db');

require('dotenv').config();




exports.getProducts = async (req, res) => {
  try{
    const products = await pool.query('SELECT * FROM clothes' );
  
    return res.status(200).json({ msg: 'Success', products:products[0] });
    
  }
  
   catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
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


