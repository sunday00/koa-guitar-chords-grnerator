const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Song extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Provider, { foreignKey: "providerId" });
      this.hasMany(models.Riff, { foreignKey: "songId" });
    }
  }
  Song.init(
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      title: DataTypes.TEXT,
      description: { type: DataTypes.TEXT, allowNull: true },
      providerId: {
        type: DataTypes.INTEGER,
        references: { model: "Provider", key: "id" },
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
      modelName: "Song",
      tableName: "songs",
    }
  );
  return Song;
};
