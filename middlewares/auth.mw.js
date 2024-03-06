/**
 * Create a mw will check if the request body is proper and correct
 *
 */

const user_model = require("../models/user.model")

const verifydignUpBody = (req, res, next) => {
  try {
    //check for the name
    if (!req.body.name) {
      return res.status(400).send({
        message: "Name is provided",
      })
    }
    //check for the email
    if (!req.body.email) {
      return res.status(400).send({
        message: "email is provided",
      })
    }
    //check for the UserId
    if (!req.body.UserId) {
      return res.status(400).send({
        message: "UserId is provided",
      })
    }
    //
  } catch (err) {
    console.log("Error while validating the body")
    res.status(500).send({
      message: "Error while validating ",
    })
  }
}

module.exports = verifydignUpBody
