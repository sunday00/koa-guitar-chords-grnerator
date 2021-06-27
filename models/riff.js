const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Riff extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Provider, { foreignKey: "providerId" });
      this.belongsTo(models.Song, { foreignKey: "songId" });
    }
  };
  Riff.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    tab1: DataTypes.STRING(255),
    tab2: DataTypes.STRING(255),
    tab3: DataTypes.STRING(255),
    tab4: DataTypes.STRING(255),
    riffOption: DataTypes.STRING(255),
    providerId: {
      type: DataTypes.INTEGER,
      references: { model: "Provider", key: "id" },
    },
    songId: {
      type: DataTypes.INTEGER,
      references: { model: "Song", key: "id" },
    },
    version: DataTypes.STRING(10),
    memo: DataTypes.STRING(255)
  }, {
    sequelize,
    modelName: 'Riff',
  });
  return Riff;
};