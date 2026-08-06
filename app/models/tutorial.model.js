// Utilizamos module.exports para exportar el modelo para que pueda ser usado en otras clases
module.exports = (sequelize, Sequelize) => {
  // sequelize.define() define el nombre de la entidad en la BD, en este caso "tutorial"
  // Sequelize.<TIPO> define el tipo de dato de cada atributo
  const Tutorial = sequelize.define("tutorial", {
    titulo: {
      type: Sequelize.STRING
    },
    descripcion: {
      type: Sequelize.STRING
    },
    publicado: {
      type: Sequelize.BOOLEAN
    }
  });
  return Tutorial;
};
