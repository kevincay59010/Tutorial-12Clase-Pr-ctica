const db = require("../models");
const Tutorial = db.tutorials;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {
  if (!req.body.titulo) {
    res.status(400).send({
      message: "El contenido no puede estar vacío!"
    });
    return;
  }

  const tutorial = {
    titulo: req.body.titulo,
    descripcion: req.body.descripcion,
    publicado: req.body.publicado ? req.body.publicado : false
  };

  Tutorial.create(tutorial)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Ocurrió un error al crear el Tutorial."
      });
    });
};

// Retrieve all Tutorials from the database
exports.findAll = (req, res) => {
  const titulo = req.query.titulo;
  var condition = titulo ? { titulo: { [Op.iLike]: `%${titulo}%` } } : null;

  Tutorial.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Ocurrió un error al recuperar los tutorials."
      });
    });
};

// Find a single Tutorial by id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Tutorial.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error al recuperar Tutorial con id=" + id
      });
    });
};

// Update a Tutorial by id
exports.update = (req, res) => {
  const id = req.params.id;

  Tutorial.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Tutorial actualizado correctamente."
        });
      } else {
        res.send({
          message: `No se puede actualizar el Tutorial con id=${id}. Quizá no se encontró el tutorial o el body está vacío.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error al actualizar Tutorial con id=" + id
      });
    });
};

// Delete a Tutorial by id
exports.delete = (req, res) => {
  const id = req.params.id;

  Tutorial.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Tutorial eliminado correctamente!"
        });
      } else {
        res.send({
          message: `No se puede eliminar Tutorial con id=${id}. Quizá no se encontró.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "No se pudo eliminar Tutorial con id=" + id
      });
    });
};

// Delete all Tutorials
exports.deleteAll = (req, res) => {
  Tutorial.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Tutorials fueron eliminados correctamente!` });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Ocurrió un error al eliminar todos los tutorials."
      });
    });
};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {
  Tutorial.findAll({ where: { publicado: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Ocurrió un error al recuperar los tutorials publicados."
      });
    });
};
