module.exports = app => {
  const clientes = require("../controllers/cliente.controller.js");
  const { verifyToken } = require("../middlewares/authJwt.js");
  var router = require("express").Router();

  // Protegemos creación, actualización y borrado con verifyToken
  router.post("/create/", [verifyToken], clientes.create);
  router.get("/", clientes.findAll); // lectura pública, sin token, como ejemplo de ruta mixta
  router.get("/status", clientes.findAllStatus);
  router.get("/:id", clientes.findOne);
  router.put("/update/:id", [verifyToken], clientes.update);
  router.delete("/delete/:id", [verifyToken], clientes.delete);
  router.delete("/delete/", [verifyToken], clientes.deleteAll);

  app.use("/api/customer", router);
};