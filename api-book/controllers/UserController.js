const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require('nodemailer');
const saltRound = 10;

async function addUser(req, res) {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      res
        .status(400)
        .send({ success: false, message: "User Already Exsists.." });
    } else {
      let password = bcrypt.hashSync(req.body.password, saltRound);
      user = new User(req.body);
      user.password = password;
      await user.save();
      // here is the meaasage send for user who is singup on our website
      let message = 'Dear user Your Account has been created sucessfull on our platfrom. You can login on our platfrom. \n Regards:\n Admin Department \n R.D Book Store';
      let trasnporter = nodemailer.createTransport({
        service: 'gmail',  // Use your gmail provider
        auth: {
          user: 'shubhamsharma21505@gmail.com',
          pass: 'dfjy druy npco naaz'
        }
      });
      let mailOptions = {
        from: 'shubhamsharma21505@gmail.com',
        to: req.body.email,
        subject: 'Reagarding to Account creation on our RD Book Store',
        text: message,
      }
      trasnporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.log(err, ' error in mail sending')
        } else {
          console.log('Email hasb been sent sucessfull...')
          res.status(200).send({ success: true });
        }
      })
      res.status(200).send({ success: true });
    }
  } catch (err) {
    console.log(err);
  }
}

async function getUsers(req, res) {
  try {
    let users = await User.find({});
    // console.log(users, "users");
    res.status(200).send({ success: true, data: users });
  } catch (err) {
    console.log(err);
    res.status(400).send({ success: false, data: {} });
  }
}

async function doLogin(req, res) {
  try {
    // console.log(req.body, "req.body");
    let secret_key = "b2Vfb3ZlcnRoZXJlX29yX3NvbWV0aGluZ19lbHNld2hlcmU";
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(400).send({ success: false, message: "User does not exists" });
    } else {
      const isMatch = await bcrypt.compare(req.body.password, user.password);
      if (!isMatch) {
        return res.status(401).send("Password is incorrect");
      }
      // if (user.password === req.body.password) {
      user.lastLogin = new Date();
      await user.save();
      const token = jwt.sign({ id: user._id, email: user.email }, secret_key, {
        expiresIn: "1h"
      });
      // console.log(token);
      res.status(200).send({
        success: true,
        message: "login success",
        token: token,
        data: user
      });
      // } else {
      //   res.status(400).send({ success: false, message: "Wrong Password..." });
      // }
    }
  } catch (err) {
    console.log(err);
    res.status(400).send({ success: false, message: "Something went wrong.." });
  }
}

async function doadminLogin(req, res) {
  try {
    // console.log(req.body);
    let secret_key = "b2Vfb3ZlcnRoZXJlX29yX3NvbWV0aGluZ19lbHNld2hlcmU";
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(400).send({ success: false, message: 'User doesn`t exist' });
    } else {
      if (user.password === req.body.password) {
        user.lastLogin = new Date();
        await user.save();
        const token = jwt.sign({ id: user._id, email: user.email }, secret_key, {
          expiresIn: "1h"
        });
        res.status(200).send({ success: true, message: 'Login Scuesssfull' })
      } else {
        res.status(400).send({ success: false, message: 'something went wrong' })
      }
    }
  } catch (error) {
    console.log(error.message, 'msg')
    res.status(400).send({ success: false, message: ' Error in admin login API' })
  }
}

module.exports = {
  addUser,
  getUsers,
  doLogin,
  doadminLogin
};
