const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Provider extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Chord, { foreignKey: "setId" });
      this.belongsTo(models.Account, { foreignKey: "accountId" });
    }
  }
  Provider.init(
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: DataTypes.STRING(100),
      description: { type: DataTypes.TEXT, allowNull: true },
      accountId: {
        type: DataTypes.INTEGER,
        references: { model: "Account", key: "id" },
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: true,
      },
    },
    {
      sequelize,
      timestamps: false,
      modelName: "Provider",
    }
  );
  return Provider;
};
