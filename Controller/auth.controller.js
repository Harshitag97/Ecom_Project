const bcrypt = require("bcrypt")
const user_model = require("../models/user.model")
const jwt = require("jsonwebtoken")
const secret = require("../configs/auth.config")

exports.signup = async (req, res) => {
  /**
   * Logic to create the user
   */

  // 1 . Read the request body
  const request_body = req.body
  // 2. Insert the data in the Users collection in MongoDB

  const userObj = {
    name: request_body.name,
    userId: request_body.userId,
    email: request_body.email,
    userType: request_body.userType,
    password: bcrypt.hashSync(request_body.password, 8),
  }

  try {
    const user_created = await user_model.create(userObj)
    const res_obj = {
      name: user_created.name,
      userId: user_created.userId,
      email: user_created.email,
      userType: user_created.userType,
    }
    console.log(res_obj)

    res.status(200).send({
      message: res_obj,
    })
  } catch (err) {
    console.log("Error" + err)
    res.status(500).send({
      message: "Some error occured",
    })
  }
  // 3. Return the response back to the user

  res.status(201)
}

exports.signin = async (req, res) => {
  // check if the user is present in the db

  const user = await user_model.findOne({ userId: req.body.userId })

  if (user == null) {
    res.status(400).send({
      message: "user id is not valid",
    })
  }

  // check of the password provided by the user is correct

  const isPasswordValid = bcrypt.compareSync(req.body.password, user.password)

  console.log(isPasswordValid)
  console.log(req.body.password)

  if (!isPasswordValid) {
    res.status(401).send({
      message: "wrong password passed",
    })
  }

  // after login is succesfull then need to provide the access token using JWT

  const token = jwt.sign({ id: user.userId }, secret.secret, {
    expiresIn: 120,
  })

  res.status(200).send({
    name: user.name,
    userId: user.userId,
    email: user.email,
    userType: user.userType,
    accessToken: token,
  })
}
