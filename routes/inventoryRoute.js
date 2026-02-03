//needed resources
const express = require("express");
const router = new express.Router();
const utilities = require("../utilities/");
const invController = require("../controllers/invController");
const m_validator = require("../utilities/management-validation");

//route to inventory by classification

router.get(
  "/type/:classificationId",
  utilities.handleErrors(invController.buildByClassificationId),
);

router.get(
  "/detail/:inv_id",
  utilities.handleErrors(invController.buildByInventoryId),
);

/* Inventory management view*/
router.get("/", utilities.handleErrors(invController.buildManagementView));

/* add classification */
router.get(
  "/add-classification",
  utilities.handleErrors(invController.buildAddClassificationView),
);

/* post form */
router.post(
  "/add-classification",
  m_validator.classificationRules(),
  m_validator.checkNewClassificationData,
  utilities.handleErrors(invController.addClassification),
);

/* add inventory */
router.get(
  "/add-inventory",
  utilities.handleErrors(invController.buildAddInventoryView),
);

router.post(
  "/add-inventory",
  m_validator.inventoryRules(),
  m_validator.checkInventoryData,
  utilities.handleErrors(invController.addInventory),
);

module.exports = router;
