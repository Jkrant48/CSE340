//needed resources
const express = require("express");
const router = new express.Router();
const utilities = require("../utilities/");
const invController = require("../controllers/invController");

//route to inventory by classification

router.get(
  "/type/:classificationId",
  utilities.handleErrors(invController.buildByClassificationId),
);

router.get(
  "/detail/:inv_id",
  utilities.handleErrors(invController.buildByInventoryId),
);

module.exports = router;
