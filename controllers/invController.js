const invModel = require("../models/inventory-model");
const utilities = require("../utilities/");

const invCont = {};

/***********************************
 * Builds the inventory by classification view
 ***********************************/
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId;
  const data = await invModel.getInventoryByClassificationId(classification_id);
  const grid = await utilities.buildClassificationGrid(data);
  let nav = await utilities.getNav();
  const className = data[0].classification_name;
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  });
};

/***********************************
 * Builds the inventory detail view
 ***********************************/
invCont.buildByInventoryId = async function (req, res, next) {
  const inventory_id = req.params.inv_id;
  const data = await invModel.getInventoryById(inventory_id);
  const detailView = await utilities.buildInventoryDetailView(data);
  let nav = await utilities.getNav();
  res.render("./inventory/detail", {
    title: data.inv_year + " " + data.inv_make + " " + data.inv_model,
    nav,
    detailView,
  });
};

/******************************
 * Build Management View
 *****************************/
invCont.buildManagementView = async function (req, res, next) {
  let nav = await utilities.getNav();

  res.render("inventory/management", {
    title: "Inventory Management",
    nav,
  });
};

//still working on the add classification
invCont.buildAddClassificationView = async function (req, res, next) {
  let nav = await utilities.getNav();

  res.render("inventory/add-classification", {
    title: "Add Classification",
    nav,
    errors: null,
  });
};

invCont.addClassification = async function (req, res, next) {
  const { classification_name } = req.body;
  const addResult = await invModel.addClassification(classification_name);
  if (addResult) {
    req.flash("notice", "Classification added successfully.");
    res.redirect("/inv/");
  } else {
    req.flash("notice", "Failed to add classification.");
    res.redirect("/inv/add-classification");
  }
};

invCont.buildAddInventoryView = async function (req, res) {
  let nav = await utilities.getNav();
  let classificationList = await utilities.buildClassificationList();

  res.render("inventory/add-inventory", {
    title: "Add Inventory",
    nav,
    classificationList,
    errors: null,
  });
};

invCont.addInventory = async function (req, res) {
  const addResult = await invModel.addInventory(req.body);

  if (addResult) {
    req.flash("notice", "Inventory item successfully added.");
    res.redirect("/inv/");
  } else {
    req.flash("notice", "Failed to add inventory item.");
    res.redirect("/inv/add-inventory");
  }
};

module.exports = invCont;
