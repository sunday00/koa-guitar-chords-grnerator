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
    }
  }
  Provider.init(
    {
      id: { type: DataTypes.INTEGER, primaryKey: true },
      name: DataTypes.STRING(100),
      description: { type: DataTypes.TEXT, allowNull: true },
      createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    },
    {
      sequelize,
      timestamps: false,
      modelName: "Provider",
    }
  );
  return Provider;
};
