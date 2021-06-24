require("dotenv").config();

const Sequelize = require("sequelize");
const provider = require("../providers/model");
const chord = require("../chords/model");

const sequelize = new Sequelize(
  process.env.DB_BASE,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    define: {
      timestamps: false,
    },
  }
);

const chords = chord(Sequelize, sequelize);
const providers = provider(Sequelize, sequelize);

providers.hasMany(chords);

module.exports = {
  Sequelize,
  sequelize,
  chords,
  providers,
};
