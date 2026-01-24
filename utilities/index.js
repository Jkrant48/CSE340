const invModel = require("../models/inventory-model");
const Util = {};

/************************************
 * constructs the nav HTML unordered list
 *************************************/
Util.getNav = async function (req, res, next) {
  let data = await invModel.getClassifications();
  let list = "<ul>";
  list += '<li><a href="/" title="Home page">Home</a></li>';
  data.rows.forEach((row) => {
    list += "<li>";
    list +=
      '<a href="/inv/type/' +
      row.classification_id +
      '" title="See our inventory of ' +
      row.classification_name +
      ' vehicles">' +
      row.classification_name +
      "</a>";
    list += "</li>";
  });
  list += "</ul>";
  return list;
};

/* **************
 * Build the classification view HTML
 * ************ */
Util.buildClassificationGrid = async function (data) {
  let grid;
  if (data.length > 0) {
    grid = '<ul id="inv-display">';
    data.forEach((vehicle) => {
      grid += "<li>";
      grid +=
        '<a href="../../inv/detail/' +
        vehicle.inv_id +
        '" title="View ' +
        vehicle.inv_make +
        " " +
        vehicle.inv_model +
        'details"><img src="' +
        vehicle.inv_thumbnail +
        '" alt="Image of ' +
        vehicle.inv_make +
        " " +
        vehicle.inv_model +
        ' on CSE Motors" /></a>';
      grid += '<div class="namePrice">';
      grid += "<hr />";
      grid += "<h2>";
      grid +=
        '<a href="../../inv/detail/' +
        vehicle.inv_id +
        '" title="View ' +
        vehicle.inv_make +
        " " +
        vehicle.inv_model +
        ' details">' +
        vehicle.inv_make +
        " " +
        vehicle.inv_model +
        "</a>";
      grid += "</h2>";
      grid +=
        "<span>$" +
        new Intl.NumberFormat("en-US").format(vehicle.inv_price) +
        "</span>";
      grid += "</div>";
      grid += "</li>";
    });
    grid += "</ul>";
  } else {
    grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>';
  }
  return grid;
};

Util.buildInventoryDetailView = async function (data) {
  let detailView;
  if (data) {
    detailView = '<div id="inv-detail-display">';
    detailView += '<div class="inv-image">';
    detailView +=
      '<img src="' +
      data.inv_image +
      '" alt="Image of ' +
      data.inv_make +
      " " +
      data.inv_model +
      ' on CSE Motors" />';
    detailView += "</div>";
    detailView += '<div class="inv-info">';
    detailView +=
      "<h2>" +
      data.inv_make +
      " " +
      data.inv_model +
      " " +
      " Details" +
      "</h2>";
    detailView +=
      "<h3>Price: $" +
      new Intl.NumberFormat("en-US").format(data.inv_price) +
      "</h3>";
    detailView +=
      '<p><span class="inv_headings">Description: ' +
      "</span>" +
      data.inv_description +
      "</p>";
    detailView += "<ul>";
    detailView +=
      '<li><span class="inv_headings">Color: ' +
      "</span>" +
      data.inv_color +
      "</li>";
    detailView +=
      '<li><span class="inv_headings">Miles: ' +
      "</span>" +
      new Intl.NumberFormat("en-US").format(data.inv_miles) +
      "</li>";
    detailView += "</ul>";
    detailView += "</div>";
    detailView += "</div>";
  }
  return detailView;
};

/* **************************
 * Middleware for handling errors
 * wrap other function in this for
 * general error handling
 * ************************** */
Util.handleErrors = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = Util;
