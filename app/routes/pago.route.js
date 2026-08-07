module.exports = app => {
  const pago = require("../controllers/pago.controller.js");
  const router = require("express").Router();

  router.post("/crear-sesion", pago.crearSesion);

  app.use("/api/pago", router);
};
