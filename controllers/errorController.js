const errorCont = {};

errorCont.triggerError = async (req, res, next) => {
  const err = new Error("This is a triggered error.");

  err.status = 500;
  next(err);
};

module.exports = errorCont;
