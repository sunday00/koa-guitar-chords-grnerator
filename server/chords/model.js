module.exports = (Sequelize, sequelize) => {
  const chord = sequelize.define("chords", {
    id: {
      type: Sequelize.INTEGER(11).UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    setId: {
      type: Sequelize.INTEGER(11).UNSIGNED,
      allowNull: false,
      // references: "providers",
      // referencesKey: "id",
      references: {
        model: "providers",
        key: "id",
      },
    },
    name: {
      type: Sequelize.STRING(10),
      allowNull: false,
    },
    strings: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    memo: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    created_at: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.fn("now"),
      allowNull: false,
    },
  });

  chord.sync();

  return chord;
};
