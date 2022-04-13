const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load User Model
const userModel = require("../../models/User");

// function to generate unique confirmation code for user registeration
function getConfirmationCode(){
    const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let token = '';
    for (let i = 0; i < 25; i++) {
        token += characters[Math.floor(Math.random() * characters.length )];
    }
    return token
}

// Register POST Route
// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);
    // Check validation
    if (!isValid) {
      return res
        .status(200)
        .json({ success: false, message: "Invalid Data Entered" });
    }
  
    userModel.findOne({ email: req.body.email }, (err, user) => {
      if (user) {
        return res
          .status(200)
          .json({ success: false, message: "This email is already registered with another account! Kindly use a different email address." });
      } else {
        const newUser = new userModel({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: req.body.password,
          confirmationCode: getConfirmationCode()
        });
  
        // Hash password before saving in database
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then((user) =>
                res.status(200).json({
                  success: true,
                  error: false,
                  user:user,
                  message: "User successfully registered!",
                })
              )
              .catch((err) => {
                return res
                  .status(200)
                  .json({ success: false, message: "Please try agin later" });
              });
          });
        });
      }
    });
  });

  // Login POST Route
// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);
  
    // Check validation
    if (!isValid) {
      return res.status(200).json({ message: "Invalid Data Entered" });
    }
    const email = req.body.email;
    const password = req.body.password;
  
    // Find User by email
    userModel.findOne({ email: email, is_deleted: false }).then((user) => {
      // Check if user exists
      if (!user) {
        return res
        .status(200)
        .json({ success: false, message: "Can not find account with this email." });
      }
      // Check password
      bcrypt.compare(password, user.password).then((isMatch) => {
        if (isMatch) {
          // User matched, create jwt payload
          const payload = {
            id: user._id,
            email: user.email,
            firstName: user.firstName
          };
  
          // Sign token
          jwt.sign(
            payload,
            process.env.ENCRYPTION_SECRET,
            { expiresIn: 31556926 },
            (err, token) => {
              res.json({
                success: true,
                token: token,
              });
            }
          );
        } else {
          return res
          .status(200)
          .json({ success: false, message: "Password incorrect!" });
        }
      });
    });
  });


  module.exports = router;