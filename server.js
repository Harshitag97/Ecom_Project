/*
This will be the starting file of the project

*/

const express = require("express")
const bcrypt = require("bcrypt")
const mongoose = require("mongoose")

const app = express()
const server_config = require("./configs/server.config")
const db_config = require("./configs/dbconfig")
const user_model = require("./models/user.model")

app.use(express.json())

/**
 * Create an admin user
 *
 */

/*
connection with mongo db
*/
try {
  mongoose.connect("mongodb://127.0.0.1:27017/ecom_db")

  const db = mongoose.connection

  db.on("error", () => {
    console.log("Error while connecting to DB")
  })

  db.once("open", () => {
    console.log("DB connected")
    init()
  })
} catch (error) {}

async function init() {
  const user = await user_model.findOne({ userId: "admin" })
  if (user) {
    console.log("Admin User already created")
    return
  }

  try {
    user = await user_model.create({
      name: "Harshit",
      userId: "admin",
      email: "harsh@gmail.com",
      userType: "ADMIN",
      password: bcrypt.hashSync("welcome", 8),
    })
    console.log("Admin created", user)
  } catch (error) {}
}
/*

Start the server
*/

/**
 * Stich the route to the server
 */

require("./routes/auth.routes")(app)

app.listen(server_config.PORT, () => {
  console.log("server Started at PORT NO : " + server_config.PORT)
})
