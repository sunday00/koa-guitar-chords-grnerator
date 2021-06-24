module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Chords", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.Sequelize.INTEGER(11).UNSIGNED,
      },
      setId: {
        type: Sequelize.Sequelize.INTEGER(11).UNSIGNED,
        allowNull: false,
        references: {
          model: "providers",
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "cascade",
      },
      name: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      strings: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      memo: {
        allowNull: true,
        type: Sequelize.TEXT,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        default: Sequelize.fn("now"),
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Chords");
  },
};
