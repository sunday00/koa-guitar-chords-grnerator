const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Song extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Provider, { foreignKey: "providerId" });
    }
  };
  Song.init({
    title: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    description:  { type: DataTypes.TEXT, allowNull: true },
    providerId: {
      type: DataTypes.INTEGER,
      references: { model: "Provider", key: "id" },
    },
    createdAt: DataTypes.TIME
  }, {
    sequelize,
    modelName: 'Song',
  });
  return Song;
};