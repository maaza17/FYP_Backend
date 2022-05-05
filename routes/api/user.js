const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load User Model
const userModel = require("../../models/User");

// Load nodemailer transport object
const transport = require('../../config/nodemailer')

// function to generate unique confirmation code for user registeration
function getConfirmationCode(){
    const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let token = '';
    for (let i = 0; i < 25; i++) {
        token += characters[Math.floor(Math.random() * characters.length )];
    }
    return token
}

// Get Profile POST Route
// @router POST api/users/getprofile
// @desc Fetch user profile
// @access Public
router.post("/getprofile", (req, res) => {
  jwt.verify(req.body.token, keys.secretOrKey, function (err, decoded) {
    if (err) {
      return res
        .status(200)
        .json({ error: true, message: "Unable to fetch profile" });
    }
    if (decoded) {
      const id = decoded.id;
      userModel.findOne({ _id: id, is_deleted: false }).then((user) => {
        if (user) {
          return res
            .status(200)
            .json({
              error: false,
              data: {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                registerDate: user.registerDate,
                status: user.status
              },
              message: "User found.",
            });
        } else {
          return res
            .status(200)
            .json({ error: true, message: "Unexpected error occured. Please try later." });
        }
      });
    }
  });
});

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
        .json({
          error: true,
          error_message: errors,
          message: "Check error messages!"
        });
    }
  
    userModel.findOne({ email: req.body.email }, (err, user) => {
      if (user) {
        return res
          .status(200)
          .json({
            error: true,
            message: "This email is already registered with another account! Kindly use a different email address."
          });
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
              .then((user) => {

                var mailOptions = {
                  from: '"TCGFISH" <maaz.haque17@gmail.com>',
                  to: newUser.email,
                  subject: 'TCGFISH ACCOUNT VERIFICATION',
                  html: `<body><h2>Hello ${newUser.firstName}</h2><p> Please follow the link below to verify your account:</p><a href=http://www.google.com/confirm/${confirmationCode}>VERIFY</a></body>`
                };

                transport.sendMail(mailOptions, (error, info) => {
                  if (error) {
                    console.log(error)
                    return res.status(200).json({
                      error: true,
                      message: error.message,
                    });
                  }
                  console.log('Message sent: %s', info.messageId);
                    res.status(200).json({
                    error: false,
                    error: false,
                    user:user,
                    message: "User successfully registered! Check email for account verification!",
                  })
                })
              })
              .catch((err) => {
                return res
                  .status(200)
                  .json({
                    error: true,
                    message: "Unexpected error occured. Please try agin later"
                  });
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
      return res.status(200).json({
        error:true,
        error_message: errors,
        message: "Check error messages."
      });
    }
    const email = req.body.email;
    const password = req.body.password;
  
    // Find User by email
    userModel.findOne({ email: email, is_deleted: false }).then((user) => {
      // Check if user exists
      if (!user) {
        return res
        .status(200)
        .json({
          error: true,
          message: "Can not find account with this email."
        });
      } else if(user.status === "Pending"){
        return res
        .status(200)
        .json({
          error: false,
          message: "Account verification pending. Follow the link sent to your registered email address to verify account!"
        })
      }
      // Check password
      bcrypt.compare(password, user.password).then((isMatch) => {
        if (isMatch) {
          // User matched, create jwt payload
          const payload = {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            registerDate: user.registerDate,
            status: user.status
          };
  
          // Sign token
          jwt.sign(
            payload,
            process.env.ENCRYPTION_SECRET,
            { expiresIn: 31556926 },
            (err, token) => {
              res.json({
                error: false,
                token: token,
              });
            }
          );
        } else {
          return res
          .status(200)
          .json({
            error: true,
            message: "Password incorrect!"
          });
        }
      });
    });
  });



// user Verification GET Route
// @route GET api/users/verifyuser/:confirmationcode
// @desc Activate user account once registered by following link sent to to email
// @access Limited
  router.get('/verifyuser/:confirmationCode', (req, res, next) => {
    userModel.findOne({
      confirmationCode: req.params.confirmationCode,
    })
      .then((user) => {
        if (!user) {
          return res.status(200).json({
            error: true,
            message: "User Not found."
          });
        }

        if(user.status == "Active"){
          return res.status(200).json({
            error: false,
            message: "Account already verified."
          });
        }
  
        user.status = "Active";
        user.save((err) => {
          if (err) {
            return res.status(200).json({
              error: true,
              message: "Unexpected error occured. Please try again later."
            });
          } else {
            return res.status(200).json({
              error: false,
              message: "Success: Account Verified."
            });
          }
        });
      })
      .catch((e) => console.log("error", e));
  })


// get user favourites POST Route
// @route POST api/users/getfavourites
// @desc get favourite cards for any user
// @access Limited
router.post('/getfavourites', (req, res) => {
  let token = req.body.token

  jwt.verify(token, process.env.ENCRYPTION_SECRET, (err, decoded) => {
    if(err){
      return res.status(200).json({
        error: true,
        message: err.message
      })
    } else {
      userModel.findById(decoded.id, {favourites: 1}, (error, docs) => {
        if(error){
          return res.status(200).json({
            error: true,
            message: 'Unexpected error occured!'
          })
        } else {
          return res.status(200).json({
            error: false,
            message: 'Found favourites for user!',
            data: docs
          })
        }
      })
    }
  })
})

// add card to user favourites POST Route
// @route POST api/users/addfavourite
// @desc add card to any user's favourites
// @access Limited
router.post('/addfavourite', (req, res) => {
  let token = req.body.token
  let card_id = req.body.card_id

  jwt.verify(token, process.env.ENCRYPTION_SECRET, (err, decoded) => {
    if(err){
      return res.status(200).json({
        error: true,
        message: err.message
      })
    } else {
      if(decoded){
        userModel.findById(decoded.id, (error, user) => {
          if(error){
            return res.status(200).json({
              error: true,
              message: error.message
            })
          } else {
            if(user){
              let temp = {card_id: card_id}
              if(user.favourites.length == 0){
                user.favourites.push(temp)
                user.save((err2) => {
                  if(err2){
                    return res.status(200).json({
                      error: true,
                      message: 'Unexpected error occured.'
                    })
                  } else {
                    return res.status(200).json({
                      error: false,
                      message: 'Card added to favourites.'
                    })
                  }
                })
              } else {
                user.favourites.find((post, index) => {
                  if(post.card_id == temp.card_id){
                    return res.status(200).json({
                      error: true,
                      message: 'Card is already favourited.'
                    })
                  } else {
                    user.favourites.push(temp)
                    user.save((err2) => {
                      if(err2){
                        return res.status(200).json({
                          error: true,
                          message: 'Unexpected error occured.'
                        })
                      } else {
                        return res.status(200).json({
                          error: false,
                          message: 'Card added to favourites.'
                        })
                      }
                    })
                  }
                })
              }

            } else {
              return res.status(200).json({
                error: true,
                message: 'User not found!.'
              })
            }
          }
        })
      } else {
        return res.status(200).json({
          error: true,
          message: 'Unexpected error occured.'
        })
      }     
    }
  })


})




// remove card from user favourites POST Route
// @route POST api/users/removefavourite
// @desc remove card from any user's favourites
// @access Limited
router.post('/removefavourite', (req, res) => {
  let token = req.body.token
  let card_id = req.body.card_id

  jwt.verify(token, process.env.ENCRYPTION_SECRET, (err, decoded) => {
    if(err){
      return res.status(200).json({
        error: true,
        message: err.message
      })
    } else {
      if(decoded){
        userModel.findById(decoded.id, (error, user) => {
          if(error){
            return res.status(200).json({
              error: true,
              message: error.message
            })
          } else {
            if(user){              
              user.favourites = user.favourites.filter(x => x.card_id != card_id)
              user.save((err2) => {
                if(err2){
                  return res.status(200).json({
                    error: true,
                    message: 'Unexpected error occured.'
                  })
                } else {
                  return res.status(200).json({
                    error: false,
                    message: 'Card removed from favourites.'
                  })
                }
              })

            } else {
              return res.status(200).json({
                error: true,
                message: 'User not found!.'
              })
            }
          }
        })
      } else {
        return res.status(200).json({
          error: true,
          message: 'Unexpected error occured.'
        })
      }     
    }
  })
})

module.exports = router;
  



  //  //token verification code snippet 
  // jwt.verify(token, process.env.ENCRYPTION_SECRET, (err, decoded) => {
  //   if(err){
  //     return res.status(200).json({
  //       error: true,
  //       message: err.message
  //     })
  //   } else {
      
  //   }
  // })