module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("riffs", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(11).UNSIGNED,
      },
      tab1: {
        type: Sequelize.STRING(255),
      },
      tab2: {
        type: Sequelize.STRING(255),
      },
      tab3: {
        type: Sequelize.STRING(255),
      },
      tab4: {
        type: Sequelize.STRING(255),
      },
      riffOption: {
        type: Sequelize.STRING(255),
      },
      providerId: {
        type: Sequelize.Sequelize.INTEGER(11).UNSIGNED,
        allowNull: false,
        references: {
          model: "providers",
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "cascade",
      },
      songId: {
        type: Sequelize.Sequelize.INTEGER(11).UNSIGNED,
        allowNull: false,
        references: {
          model: "songs",
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "cascade",
      },
      version: {
        type: Sequelize.STRING,
      },
      memo: {
        type: Sequelize.STRING(255),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("riffs");
  },
};
