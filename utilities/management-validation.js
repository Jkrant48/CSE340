const utilities = require(".");
const { body, validationResult } = require("express-validator");
const validate = {};

validate.classificationRules = () => {
  return [
    body("classification_name")
      .trim()
      .isAlphanumeric()
      .withMessage(
        "Classification name cannot be empty, contain spaces or special characters.",
      ),
  ];
};

validate.checkNewClassificationData = async (req, res, next) => {
  const { classification_name } = req.body;
  let errors = [];
  errors = validationResult(req);
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav();
    return res.render("inventory/add-classification", {
      title: "Add Classification",
      nav,
      errors,
      classification_name,
    });
  }
  next();
};

validate.inventoryRules = () => {
  return [
    body("inv_make").trim().notEmpty().withMessage("Make is required."),

    body("inv_model").trim().notEmpty().withMessage("Model is required."),

    body("inv_year")
      .notEmpty()
      .isInt({ min: 1900 })
      .withMessage("Valid year required."),

    body("inv_description")
      .trim()
      .notEmpty()
      .withMessage("Description required."),

    body("inv_image").trim().notEmpty().withMessage("Image path required."),

    body("inv_thumbnail")
      .trim()
      .notEmpty()
      .withMessage("Thumbnail path required."),

    body("inv_price")
      .notEmpty()
      .isFloat({ min: 0 })
      .withMessage("Valid price required."),

    body("inv_miles")
      .notEmpty()
      .isInt({ min: 0 })
      .withMessage("Valid mileage required."),

    body("inv_color").trim().notEmpty().withMessage("Color is required."),

    body("classification_id")
      .notEmpty()
      .withMessage("Classification required."),
  ];
};

validate.checkInventoryData = async (req, res, next) => {
  let errors = [];
  errors = validationResult(req);

  if (!errors.isEmpty()) {
    let nav = await utilities.getNav();
    let classificationList = await utilities.buildClassificationList(
      req.body.classification_id,
    );

    return res.render("inventory/add-inventory", {
      title: "Add Inventory",
      nav,
      classificationList,
      errors,
    });
  }
  next();
};

module.exports = validate;
