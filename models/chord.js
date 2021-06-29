const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Chord extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Provider, { foreignKey: "setId" });
    }
  }
  Chord.init(
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      setId: {
        type: DataTypes.INTEGER,
        references: { model: "Provider", key: "id" },
      },
      name: DataTypes.STRING(10),
      strings: DataTypes.STRING(20),
      memo: { type: DataTypes.TEXT, allowNull: true },
      createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    },
    {
      sequelize,
      timestamps: false,
      modelName: "Chord",
      tableName: 'chords'
    }
  );
  return Chord;
};
