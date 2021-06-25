module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Providers", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(11).UNSIGNED,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(100),
      },
      description: {
        allowNull: true,
        type: Sequelize.TEXT,
      },
      accountId: {
        type: Sequelize.Sequelize.INTEGER(11).UNSIGNED,
        allowNull: false,
        references: {
          model: "accounts",
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "cascade",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        default: Sequelize.fn("now"),
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Providers");
  },
};
