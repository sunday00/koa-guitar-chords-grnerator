module.exports = (Sequelize, sequelize) => {
  const providers = sequelize.define("providers", {
    id: {
      type: Sequelize.INTEGER(11).UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    created_at: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.fn("now"),
      allowNull: false,
    },
  });

  providers.sync();

  return providers;
};
