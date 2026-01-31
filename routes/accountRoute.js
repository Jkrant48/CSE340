const express = require("express");
const utilities = require("../utilities/");
const accountController = require("../controllers/accountController");
const router = new express.Router();
const regValidation = require("../utilities/account-validation");

/**Accounts Route **/
router.get("/login", utilities.handleErrors(accountController.buildLogin));

//register route
router.get(
  "/register",
  utilities.handleErrors(accountController.buildRegister),
);

//enable post route for register form submission
router.post(
  "/register",
  regValidation.registerRules(),
  regValidation.checkRegisterData,
  utilities.handleErrors(accountController.registerAccount),
);

//process the login attempt
router.post(
  "/login",
  regValidation.logInRules(),
  regValidation.checkLoginData,
  (req, res) => {
    res.status(200).send("login Process");
  },
);

//export module
module.exports = router;
