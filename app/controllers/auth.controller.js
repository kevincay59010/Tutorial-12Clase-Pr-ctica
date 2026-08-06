const db = require("../models");
const config = require("../config/auth.config.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Usuario = db.usuarios;

// Registro de un nuevo usuario
exports.signup = (req, res) => {
  if (!req.body.username || !req.body.email || !req.body.password) {
    return res.status(400).send({ message: "username, email y password son requeridos." });
  }

  const hashedPassword = bcrypt.hashSync(req.body.password, 8);

  Usuario.create({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword
  })
    .then(usuario => {
      res.status(201).send({ message: "Usuario registrado exitosamente!", id: usuario.id });
    })
    .catch(err => {
      if (err.name === "SequelizeUniqueConstraintError") {
        return res.status(400).send({ message: "Username o email ya en uso." });
      }
      res.status(500).send({ message: err.message || "Ocurrió un error al registrar el usuario." });
    });
};

// Inicio de sesión: valida que el usuario exista en la BD y que la contraseña coincida
exports.signin = (req, res) => {
  if (!req.body.username || !req.body.password) {
    return res.status(400).send({ message: "username y password son requeridos." });
  }

  Usuario.findOne({
    where: { username: req.body.username }
  })
    .then(usuario => {
      if (!usuario) {
        return res.status(401).send({ message: "Credenciales inválidas." });
      }

      const passwordEsValida = bcrypt.compareSync(req.body.password, usuario.password);
      if (!passwordEsValida) {
        return res.status(401).send({ message: "Credenciales inválidas." });
      }

      const token = jwt.sign({ id: usuario.id }, config.secret, {
        expiresIn: config.expiresIn
      });

      res.status(200).send({
        id: usuario.id,
        username: usuario.username,
        email: usuario.email,
        accessToken: token,
        expiresIn: config.expiresIn
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message || "Ocurrió un error al iniciar sesión." });
    });
};
