module.exports = app => {
  const tutorials = require("../controllers/tutorial.controller.js");
  var router = require("express").Router();

  router.post("/create/", tutorials.create);
  router.get("/", tutorials.findAll);
  router.get("/published", tutorials.findAllPublished);
  router.get("/:id", tutorials.findOne);
  router.put("/update/:id", tutorials.update);
  router.delete("/delete/:id", tutorials.delete);
  router.delete("/delete/", tutorials.deleteAll);

  app.use("/api/tutorials", router);
};
