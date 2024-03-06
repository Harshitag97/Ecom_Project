const authController = require("../Controller/auth.controller")

module.exports = (app) => {
  /**
   * Router to signup
   */
  app.post("/ecom/api/v1/auth/signup", authController.signup)

  //  Router to signin

  app.post("/ecom/api/v1/auth/signin", authController.signin)

  //
}
