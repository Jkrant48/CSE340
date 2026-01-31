const utilities = require("../utilities/");
const baseController = {};

baseController.buildHome = async (req, res) => {
  const nav = await utilities.getNav();
  //req.flash("notice", "This is a flash message test!");
  res.render("index", {
    title: "Home Page",
    nav,
  });
};

module.exports = baseController;
