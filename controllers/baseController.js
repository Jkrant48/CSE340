const utilities = require("../utilities/");
const baseController = {};

baseController.buildHome = async (req, res) => {
  const nav = await utilities.getNav();
  res.render("index", {
    title: "Home Page",
    nav,
  });
};

module.exports = baseController;
