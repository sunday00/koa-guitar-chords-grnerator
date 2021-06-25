const { Model } = require("sequelize");

const crypto = require("crypto");

module.exports = (sequelize, DataTypes) => {
  class account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Provider, { foreignKey: "accountId" });
    }
  }
  account.init(
    {
      userId: DataTypes.STRING(20),
      password: DataTypes.STRING,
      email: DataTypes.STRING(50),
      ip: DataTypes.STRING(20),
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: true,
      },
    },
    {
      sequelize,
      timestamps: false,
      modelName: "Account",
    }
  );

  account.hash = (pass) => {
    return crypto
      .createHmac("sha256", process.env.JWT_KEY + process.env.JWT_SLT)
      .update(pass)
      .digest("hex");
  };

  return account;
};
